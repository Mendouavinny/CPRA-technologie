"use client";

import { type FormEvent, useState } from "react";
import { Lock, LogOut, Settings, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSiteStore } from "@/components/site-store";
import { AdminPanel } from "@/components/admin/admin-panel";

export function AdminBar() {
  const { isAdmin, login, logout } = useSiteStore();
  const [loginOpen, setLoginOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const ok = await login(code);
    setLoading(false);
    if (ok) {
      setCode("");
      setError(false);
      setLoginOpen(false);
      setPanelOpen(true);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 print:hidden">
        {isAdmin ? (
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
              <ShieldCheck className="h-3.5 w-3.5" />
              Mode admin
            </span>
            <Button
              size="sm"
              onClick={() => setPanelOpen(true)}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
            >
              <Settings className="h-4 w-4" />
              Panneau admin
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={logout}
              className="gap-2 bg-background shadow-lg border-border"
              aria-label="Se déconnecter"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setLoginOpen(true)}
            className="gap-2 bg-background/80 backdrop-blur-sm shadow-lg border-border text-muted-foreground hover:text-foreground"
          >
            <Lock className="h-4 w-4" />
            Espace admin
          </Button>
        )}
      </div>

      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Connexion administrateur
            </DialogTitle>
            <DialogDescription>
              Saisissez votre code administrateur pour gérer le contenu du site.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="admin-code">Code administrateur</Label>
              <Input
                id="admin-code"
                type="password"
                autoComplete="off"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError(false);
                }}
                placeholder="••••••••••••"
              />
              {error && (
                <p className="text-sm text-destructive">
                  Code administrateur incorrect.
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {isAdmin && <AdminPanel open={panelOpen} onOpenChange={setPanelOpen} />}
    </>
  );
}
