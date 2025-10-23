import { MainLayout } from '@/components/layout/main-layout'
import { HeroSection } from '@/components/home/hero-section'
import { SocialProofSection } from '@/components/home/social-proof-section'
import { FeaturedDinnersSection } from '@/components/home/featured-dinners-section'
import { HowItWorksSection } from '@/components/home/how-it-works-section'
import { HostCTASection } from '@/components/home/host-cta-section'
import { mockData } from '@/lib/mock-data'

export default function HomePage() {
	const { dinners } = mockData

	return (
		<MainLayout>
			<HeroSection />
			<SocialProofSection />
			<FeaturedDinnersSection dinners={dinners} />
			<HowItWorksSection />
			<HostCTASection />
		</MainLayout>
	)
}

