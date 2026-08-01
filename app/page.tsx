import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { ProductCatalog } from "@/components/product-catalog";
import { Formation } from "@/components/formation";
import { AiServices } from "@/components/ai-services";
import { Sectors } from "@/components/sectors";
import { Careers } from "@/components/careers";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { SiteStoreProvider } from "@/components/site-store";
import { AdminBar } from "@/components/admin/admin-bar";

export default function Home() {
  return (
    <SiteStoreProvider>
      <main className="min-h-screen bg-background">
        <Header />
        <Hero />
        <Services />
        <ProductCatalog />
        <Formation />
        <AiServices />
        <Sectors />
        <Careers />
        <About />
        <Contact />
        <Footer />
        <AdminBar />
      </main>
    </SiteStoreProvider>
  );
}
