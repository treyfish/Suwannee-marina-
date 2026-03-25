import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import ServicesOverview from '@/components/home/ServicesOverview'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import CTABanner from '@/components/home/CTABanner'
import WaveDivider from '@/components/ui/WaveDivider'

export const metadata: Metadata = {
  title: 'Suwannee Shores Marina | Full-Service Marina in Old Town, FL',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <WaveDivider fill="var(--color-marina-sand)" />
      <WhyChooseUs />
      <WaveDivider fill="var(--color-marina-navy)" flip />
      <TestimonialsSection />
      <WaveDivider fill="var(--color-marina-teal)" />
      <CTABanner />
    </>
  )
}
