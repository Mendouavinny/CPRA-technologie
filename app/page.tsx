import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { ProductCatalog } from "@/components/product-catalog";
import { Sectors } from "@/components/sectors";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <ProductCatalog />
      <Sectors />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
