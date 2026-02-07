import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Timeline from "@/components/Timeline";
import ContactCard from "@/components/ContactCard";

export default function LandingPage() {
  return (
    <main className="bg-obsidian min-h-screen">
      <Hero />
      <Services />
      <Timeline />
      <ContactCard />
    </main>
  );
}