import { LandingNav } from "@/features/landing/components/LandingNav"
import { HeroSection } from "@/features/landing/components/HeroSection"
import { FeaturesSection } from "@/features/landing/components/FeaturesSection"
import { HowItWorksSection } from "@/features/landing/components/HowItWorksSection"
import { TestimonialsSection } from "@/features/landing/components/TestimonialsSection"
import { CTASection } from "@/features/landing/components/CTASection"
import { LandingFooter } from "@/features/landing/components/LandingFooter"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080810] text-white">
      <LandingNav />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <LandingFooter />
    </div>
  )
}