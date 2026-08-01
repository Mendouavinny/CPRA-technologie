"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_SITE_STATE,
  type ContactInfo,
  type CareerOpening,
  type Formation,
  type JobApplication,
  type Product,
  type SiteMessages,
  type SiteState,
} from "@/lib/site-defaults";
import { isValidAdminCode } from "@/lib/admin";
import { resizeImage } from "@/lib/image";

const STORAGE_KEY = "cpra_site_state_v1";
const ADMIN_FLAG_KEY = "cpra_admin_session";

/** Partie éditable (tout sauf les candidatures). */
type SiteContent = Omit<SiteState, "applications">;

type Mode = "loading" | "server" | "local";

type SiteStore = {
  state: SiteState;
  isAdmin: boolean;
  usingCloud: boolean; // vrai = base de données serveur (partagée)
  login: (code: string) => Promise<boolean>;
  logout: () => void;
  resetSite: () => void;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: number, patch: Partial<Product>) => void;
  removeProduct: (id: number) => void;
  addFormation: (formation: Omit<Formation, "id">) => void;
  removeFormation: (id: number) => void;
  addOpening: (opening: Omit<CareerOpening, "id">) => void;
  removeOpening: (id: number) => void;
  addApplication: (application: Omit<JobApplication, "id" | "date">) => void;
  removeApplication: (id: number | string) => void;
  updateContact: (patch: Partial<ContactInfo>) => void;
  updateMessages: (patch: Partial<SiteMessages>) => void;
  uploadImage: (file: File) => Promise<string>;
};

const SiteStoreContext = createContext<SiteStore | null>(null);

function nextId(items: { id: number | string }[]): number {
  return (
    items.reduce(
      (max, item) => Math.max(max, typeof item.id === "number" ? item.id : 0),
      0
    ) + 1
  );
}

function contentOf(state: SiteState): SiteContent {
  const { applications: _applications, ...content } = state;
  return content;
}

export function SiteStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SiteState>(DEFAULT_SITE_STATE);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mode, setMode] = useState<Mode>("loading");

  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);
  const modeRef = useRef(mode);
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  /* ---------------------------------------------------------------- */
  /*  Chargement initial : on tente le serveur, sinon repli local     */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/content", { cache: "no-store" });
        if (!res.ok) throw new Error("api indisponible");
        const content = (await res.json()) as Partial<SiteContent>;
        if (cancelled) return;
        setState((current) => ({ ...current, ...content }));
        setMode("server");

        // État de connexion admin (cookie httpOnly côté serveur).
        try {
          const sessionRes = await fetch("/api/session", { cache: "no-store" });
          const session = (await sessionRes.json()) as { isAdmin: boolean };
          if (!cancelled) setIsAdmin(Boolean(session.isAdmin));
        } catch {
          /* ignore */
        }
        return;
      } catch {
        // --- Repli MODE LOCAL (localStorage) ---
        if (cancelled) return;
        try {
          const raw = window.localStorage.getItem(STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw) as Partial<SiteState>;
            setState((current) => ({ ...current, ...parsed }));
          }
          if (window.sessionStorage.getItem(ADMIN_FLAG_KEY) === "1") {
            setIsAdmin(true);
          }
        } catch {
          /* ignore */
        }
        setMode("local");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Chargement des candidatures quand l'admin est connecté (serveur) */
  /* ---------------------------------------------------------------- */
  const refreshApplications = useCallback(async () => {
    if (modeRef.current !== "server") return;
    try {
      const res = await fetch("/api/applications", { cache: "no-store" });
      if (!res.ok) return;
      const applications = (await res.json()) as JobApplication[];
      setState((current) => ({ ...current, applications }));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (mode === "server" && isAdmin) {
      void refreshApplications();
    }
  }, [mode, isAdmin, refreshApplications]);

  /* ---------------------------------------------------------------- */
  /*  Persistance locale (mode local uniquement)                      */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (mode !== "local") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, mode]);

  /* ---------------------------------------------------------------- */
  /*  Écriture du contenu (serveur) — le mode local passe par l'effet */
  /* ---------------------------------------------------------------- */
  const putContent = useCallback((content: SiteContent) => {
    if (modeRef.current !== "server") return;
    fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    }).catch((error) => {
      console.error("Erreur d'enregistrement :", error);
    });
  }, []);

  const commit = useCallback(
    (producer: (current: SiteState) => Partial<SiteContent>) => {
      const current = stateRef.current;
      const patch = producer(current);
      const nextContent = { ...contentOf(current), ...patch };
      setState((s) => ({ ...s, ...patch }));
      putContent(nextContent);
    },
    [putContent]
  );

  /* ---------------------------------------------------------------- */
  /*  Authentification                                                */
  /* ---------------------------------------------------------------- */
  const login = useCallback(async (code: string) => {
    if (modeRef.current === "server") {
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });
        const data = (await res.json()) as { ok: boolean };
        if (data.ok) {
          setIsAdmin(true);
          return true;
        }
        return false;
      } catch {
        return false;
      }
    }
    // Mode local
    if (isValidAdminCode(code)) {
      setIsAdmin(true);
      try {
        window.sessionStorage.setItem(ADMIN_FLAG_KEY, "1");
      } catch {
        /* ignore */
      }
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    if (modeRef.current === "server") {
      fetch("/api/logout", { method: "POST" }).catch(() => undefined);
      setIsAdmin(false);
      return;
    }
    setIsAdmin(false);
    try {
      window.sessionStorage.removeItem(ADMIN_FLAG_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const resetSite = useCallback(() => {
    const content = contentOf(DEFAULT_SITE_STATE);
    setState((s) => ({ ...s, ...content }));
    if (modeRef.current === "server") {
      fetch("/api/reset", { method: "POST" })
        .then(() => refreshApplications())
        .catch(() => undefined);
    }
  }, [refreshApplications]);

  /* ---------------------------------------------------------------- */
  /*  Produits                                                        */
  /* ---------------------------------------------------------------- */
  const addProduct = useCallback(
    (product: Omit<Product, "id">) => {
      commit((s) => ({
        products: [{ ...product, id: nextId(s.products) }, ...s.products],
      }));
    },
    [commit]
  );

  const updateProduct = useCallback(
    (id: number, patch: Partial<Product>) => {
      commit((s) => ({
        products: s.products.map((p) => (p.id === id ? { ...p, ...patch } : p)),
      }));
    },
    [commit]
  );

  const removeProduct = useCallback(
    (id: number) => {
      commit((s) => ({ products: s.products.filter((p) => p.id !== id) }));
    },
    [commit]
  );

  /* ---------------------------------------------------------------- */
  /*  Formations                                                      */
  /* ---------------------------------------------------------------- */
  const addFormation = useCallback(
    (formation: Omit<Formation, "id">) => {
      commit((s) => ({
        formations: [
          { ...formation, id: nextId(s.formations) },
          ...s.formations,
        ],
      }));
    },
    [commit]
  );

  const removeFormation = useCallback(
    (id: number) => {
      commit((s) => ({ formations: s.formations.filter((f) => f.id !== id) }));
    },
    [commit]
  );

  /* ---------------------------------------------------------------- */
  /*  Carrières                                                       */
  /* ---------------------------------------------------------------- */
  const addOpening = useCallback(
    (opening: Omit<CareerOpening, "id">) => {
      commit((s) => ({
        careerOpenings: [
          { ...opening, id: nextId(s.careerOpenings) },
          ...s.careerOpenings,
        ],
      }));
    },
    [commit]
  );

  const removeOpening = useCallback(
    (id: number) => {
      commit((s) => ({
        careerOpenings: s.careerOpenings.filter((o) => o.id !== id),
      }));
    },
    [commit]
  );

  const addApplication = useCallback(
    (application: Omit<JobApplication, "id" | "date">) => {
      if (modeRef.current === "server") {
        fetch("/api/applications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(application),
        })
          .then(() => refreshApplications())
          .catch((error) =>
            console.error("Erreur d'envoi de la candidature :", error)
          );
        return;
      }
      setState((s) => ({
        ...s,
        applications: [
          { ...application, id: nextId(s.applications), date: new Date().toISOString() },
          ...s.applications,
        ],
      }));
    },
    [refreshApplications]
  );

  const removeApplication = useCallback(
    (id: number | string) => {
      setState((s) => ({
        ...s,
        applications: s.applications.filter((a) => a.id !== id),
      }));
      if (modeRef.current === "server") {
        fetch(`/api/applications?id=${encodeURIComponent(String(id))}`, {
          method: "DELETE",
        }).catch((error) =>
          console.error("Erreur de suppression :", error)
        );
      }
    },
    []
  );

  /* ---------------------------------------------------------------- */
  /*  Contact & messages                                              */
  /* ---------------------------------------------------------------- */
  const updateContact = useCallback(
    (patch: Partial<ContactInfo>) => {
      commit((s) => ({ contact: { ...s.contact, ...patch } }));
    },
    [commit]
  );

  const updateMessages = useCallback(
    (patch: Partial<SiteMessages>) => {
      commit((s) => ({ messages: { ...s.messages, ...patch } }));
    },
    [commit]
  );

  // Importe une image : compression navigateur, puis envoi serveur (volume
  // persistant) en mode partagé, ou image intégrée (data URL) en mode local.
  const uploadImage = useCallback(async (file: File) => {
    const { dataUrl, blob } = await resizeImage(file);
    if (modeRef.current === "server") {
      try {
        const formData = new FormData();
        formData.append("file", blob, "image.jpg");
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
          const data = (await res.json()) as { url: string };
          return data.url;
        }
      } catch {
        /* repli sur la data URL ci-dessous */
      }
    }
    return dataUrl;
  }, []);

  const value = useMemo<SiteStore>(
    () => ({
      state,
      isAdmin,
      usingCloud: mode === "server",
      login,
      logout,
      resetSite,
      addProduct,
      updateProduct,
      removeProduct,
      addFormation,
      removeFormation,
      addOpening,
      removeOpening,
      addApplication,
      removeApplication,
      updateContact,
      updateMessages,
      uploadImage,
    }),
    [
      state,
      isAdmin,
      mode,
      login,
      logout,
      resetSite,
      addProduct,
      updateProduct,
      removeProduct,
      addFormation,
      removeFormation,
      addOpening,
      removeOpening,
      addApplication,
      removeApplication,
      updateContact,
      updateMessages,
      uploadImage,
    ]
  );

  return (
    <SiteStoreContext.Provider value={value}>
      {children}
    </SiteStoreContext.Provider>
  );
}

export function useSiteStore(): SiteStore {
  const context = useContext(SiteStoreContext);
  if (!context) {
    throw new Error("useSiteStore doit être utilisé dans un SiteStoreProvider");
  }
  return context;
}
