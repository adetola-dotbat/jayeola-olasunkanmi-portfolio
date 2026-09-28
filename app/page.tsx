import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Credentials } from "@/components/sections/credentials";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <About />
      <Skills />
      <Experience />
      <Credentials />
      <Contact />
    </>
  );
}
