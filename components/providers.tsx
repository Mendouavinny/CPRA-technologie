"use client";

import type { ReactNode } from "react";
import { SiteStoreProvider } from "@/components/site-store";
import { CartProvider } from "@/components/cart-store";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SiteStoreProvider>
      <CartProvider>{children}</CartProvider>
    </SiteStoreProvider>
  );
}
