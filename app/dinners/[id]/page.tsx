'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { PageLayout } from '@/components/layout/page-layout'
import { DinnerDetail } from '@/components/dinner/dinner-detail'
import { BookingGuard } from '@/components/auth/booking-guard'
import { mockData } from '@/lib/mock-data'
import { NavigationParams } from '@/types'

export default function DinnerDetailPage() {
	const params = useParams()
	const id = Array.isArray(params?.id) ? params?.id[0] : (params?.id as string)
	const dinner = useMemo(() => mockData.dinners.find(d => String(d.id) === id), [id])

	const handleNavigation = (page: string, params?: NavigationParams) => {
		// This will be handled by Next.js routing
		console.log('Navigation:', page, params)
	}

	if (!dinner) {
		return (
			<PageLayout>
				<div className="max-w-screen-xl mx-auto px-4 py-16 text-center">
					<h1 className="text-2xl font-semibold mb-4">Dinner Not Found</h1>
					<p className="text-muted-foreground">The dinner experience you're looking for doesn't exist.</p>
				</div>
			</PageLayout>
		)
	}

	return (
		<BookingGuard>
			<PageLayout>
				<DinnerDetail dinner={dinner} onNavigate={handleNavigation} />
			</PageLayout>
		</BookingGuard>
	)
}

