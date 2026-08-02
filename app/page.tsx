import { Hero } from "@/components/hero";
import { NeedFinder } from "@/components/need-finder";
import { Universes } from "@/components/universes";
import { Services } from "@/components/services";
import { ProductCatalog } from "@/components/product-catalog";
import { Formation } from "@/components/formation";
import { AiServices } from "@/components/ai-services";
import { Sectors } from "@/components/sectors";
import { Careers } from "@/components/careers";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <NeedFinder />
      <Universes />
      <Services />
      <ProductCatalog />
      <Formation />
      <AiServices />
      <Sectors />
      <Careers />
      <About />
      <Contact />
    </>
  );
}
