"use client";
import { FeaturedProjects } from "@/components/projects/FeaturedProjects";
import HeroSection from "@/components/Hero3D/HeroSection";
import { Mascot } from "page-mascot";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <div className="right-0 bottom-0 hidden lg:fixed lg:block">
        <Mascot
          directions="/mascots/kamran-directions.webp"
          reactions="/mascots/kamran-reactions.webp"
        />
      </div>
    </>
  );
}
