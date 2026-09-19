import HeroSection from "@/components/sections/HeroSection";
import EducationSection from "@/components/sections/EducationSection";
import WorkExperienceSection from "@/components/sections/WorkExperienceSection";
import OrganizationSection from "@/components/sections/OrganizationSection";
import ConnectSection from "@/components/sections/ConnectSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <EducationSection />
      <WorkExperienceSection />
      <OrganizationSection />
      <ConnectSection />
      <div className="h-12 sm:h-16" />
    </>
  );
}
