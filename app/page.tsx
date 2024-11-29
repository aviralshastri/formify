"use client"
import React from "react";
import Layout from "@/components/custom/Layout";
import HomeSection from "@/components/custom/HomeSection";
import FeaturesSection from "@/components/custom/FeaturesSection";
import TeamSection from "@/components/custom/TeamSection";
import PricingSection from "@/components/custom/PricingSection";
import ContactSection from "@/components/custom/ContactSection";

export default function Home() {
  return (
    <Layout>
      <HomeSection />
      <FeaturesSection />
      <PricingSection />
      <TeamSection />
      <ContactSection />
    </Layout>
  );
}