import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { BRAND_NAME } from "@/lib/contact";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Cart } from "@/components/cart";
import { AdminBar } from "@/components/admin/admin-bar";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${BRAND_NAME} — Tout ce dont vous avez besoin, au même endroit`,
  description:
    "CPRA TECHNOLOGY : la plateforme multiservices B2C & B2B au Cameroun. Produits, équipements, services, occasion et mise en relation avec fournisseurs et prestataires pour particuliers, entreprises, santé, hôtellerie, beauté, jeunes et créateurs.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="bg-background">
      <body className="font-sans antialiased bg-background text-foreground">
        <Providers>
          <Header />
          <main className="min-h-screen bg-background">{children}</main>
          <Footer />
          <Cart />
          <AdminBar />
        </Providers>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
