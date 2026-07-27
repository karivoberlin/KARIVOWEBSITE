import AmbientBackground from "@/components/AmbientBackground";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero/Hero";
import Ablauf from "@/components/Ablauf/Ablauf";
import Pakete from "@/components/Pakete/Pakete";
import Care from "@/components/Care/Care";
import FAQ from "@/components/FAQ/FAQ";
import Kontakt from "@/components/Kontakt/Kontakt";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <Ablauf />
        <Pakete />
        <Care />
        <FAQ />
        <Kontakt />
      </main>
      <Footer />
    </>
  );
}
