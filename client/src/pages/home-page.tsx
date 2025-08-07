import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import MissionSection from "@/components/MissionSection";
import ImpactStats from "@/components/ImpactStats";
import ProgramsSection from "@/components/ProgramsSection";
import DonationSection from "@/components/DonationSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <MissionSection />
      <ImpactStats />
      <ProgramsSection />
      <DonationSection />
      <TeamSection />
      <ContactSection />
    </Layout>
  );
}
