"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: number;
  name: string;
  category: string;
  specs: string;
  image: string;
  quantity: number;
};

export type Order = {
  id: string;
  name: string;
  items: CartItem[];
};

type CartStore = {
  orders: Order[];
  activeOrderId: string;
  activeOrder: Order;
  totalCount: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setOpen: (open: boolean) => void;
  // Commandes
  createOrder: (name?: string) => void;
  renameOrder: (id: string, name: string) => void;
  removeOrder: (id: string) => void;
  setActive: (id: string) => void;
  clearOrder: (id: string) => void;
  // Articles (dans une commande donnée)
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (orderId: string, itemId: number) => void;
  setQuantity: (orderId: string, itemId: number, quantity: number) => void;
  increment: (orderId: string, itemId: number) => void;
  decrement: (orderId: string, itemId: number) => void;
};

const CartContext = createContext<CartStore | null>(null);
const STORAGE_KEY = "cpra_cart_v2";

function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function createEmptyOrder(name: string): Order {
  return { id: newId(), name, items: [] };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => [
    createEmptyOrder("Commande 1"),
  ]);
  const [activeOrderId, setActiveOrderId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Chargement depuis le localStorage.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          orders: Order[];
          activeOrderId: string;
        };
        if (parsed.orders?.length) {
          setOrders(parsed.orders);
          const stillExists = parsed.orders.some(
            (o) => o.id === parsed.activeOrderId
          );
          setActiveOrderId(
            stillExists ? parsed.activeOrderId : parsed.orders[0].id
          );
          setHydrated(true);
          return;
        }
      }
    } catch {
      /* ignore */
    }
    // Aucune donnée : on garde la commande par défaut et on l'active.
    setOrders((current) => {
      setActiveOrderId(current[0].id);
      return current;
    });
    setHydrated(true);
  }, []);

  // Persistance.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ orders, activeOrderId })
      );
    } catch {
      /* ignore */
    }
  }, [orders, activeOrderId, hydrated]);

  const createOrder = useCallback(
    (name?: string) => {
      const order = createEmptyOrder(name || `Commande ${orders.length + 1}`);
      setOrders((current) => [...current, order]);
      setActiveOrderId(order.id);
    },
    [orders.length]
  );

  const renameOrder = useCallback((id: string, name: string) => {
    setOrders((current) =>
      current.map((o) => (o.id === id ? { ...o, name } : o))
    );
  }, []);

  const removeOrder = useCallback((id: string) => {
    setOrders((current) => {
      const remaining = current.filter((o) => o.id !== id);
      if (remaining.length === 0) {
        const fresh = createEmptyOrder("Commande 1");
        setActiveOrderId(fresh.id);
        return [fresh];
      }
      setActiveOrderId((active) =>
        active === id ? remaining[0].id : active
      );
      return remaining;
    });
  }, []);

  const setActive = useCallback((id: string) => setActiveOrderId(id), []);

  const clearOrder = useCallback((id: string) => {
    setOrders((current) =>
      current.map((o) => (o.id === id ? { ...o, items: [] } : o))
    );
  }, []);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1) => {
      setOrders((current) => {
        const targetId = activeOrderId || current[0]?.id;
        return current.map((order) => {
          if (order.id !== targetId) return order;
          const existing = order.items.find((i) => i.id === item.id);
          const items = existing
            ? order.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              )
            : [...order.items, { ...item, quantity }];
          return { ...order, items };
        });
      });
      setIsOpen(true);
    },
    [activeOrderId]
  );

  const updateItems = useCallback(
    (orderId: string, updater: (items: CartItem[]) => CartItem[]) => {
      setOrders((current) =>
        current.map((o) =>
          o.id === orderId ? { ...o, items: updater(o.items) } : o
        )
      );
    },
    []
  );

  const removeItem = useCallback(
    (orderId: string, itemId: number) => {
      updateItems(orderId, (items) => items.filter((i) => i.id !== itemId));
    },
    [updateItems]
  );

  const setQuantity = useCallback(
    (orderId: string, itemId: number, quantity: number) => {
      updateItems(orderId, (items) =>
        items
          .map((i) => (i.id === itemId ? { ...i, quantity } : i))
          .filter((i) => i.quantity > 0)
      );
    },
    [updateItems]
  );

  const increment = useCallback(
    (orderId: string, itemId: number) => {
      updateItems(orderId, (items) =>
        items.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    },
    [updateItems]
  );

  const decrement = useCallback(
    (orderId: string, itemId: number) => {
      updateItems(orderId, (items) =>
        items
          .map((i) =>
            i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0)
      );
    },
    [updateItems]
  );

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const activeOrder =
    orders.find((o) => o.id === activeOrderId) ?? orders[0];
  const totalCount = orders.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0),
    0
  );

  const value = useMemo<CartStore>(
    () => ({
      orders,
      activeOrderId: activeOrder?.id ?? "",
      activeOrder,
      totalCount,
      isOpen,
      open,
      close,
      setOpen: setIsOpen,
      createOrder,
      renameOrder,
      removeOrder,
      setActive,
      clearOrder,
      addItem,
      removeItem,
      setQuantity,
      increment,
      decrement,
    }),
    [
      orders,
      activeOrder,
      totalCount,
      isOpen,
      open,
      close,
      createOrder,
      renameOrder,
      removeOrder,
      setActive,
      clearOrder,
      addItem,
      removeItem,
      setQuantity,
      increment,
      decrement,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartStore {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé dans un CartProvider");
  }
  return context;
}
