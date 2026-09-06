import React from "react";
import HeroSection from "@/components/home/HeroSection";
import ProjectGallery from "@/components/home/ProjectGallery";
import PhilosophySection from "@/components/home/PhilosophySection";

const HERO_IMAGE = "https://media.base44.com/images/public/69c4541583a49fb1b62c695d/203331795_generated_2acd6229.png";

export default function Home() {
  return (
    <div>
      <HeroSection heroImage={HERO_IMAGE} />
      <ProjectGallery />
      <PhilosophySection />
    </div>
  );
}