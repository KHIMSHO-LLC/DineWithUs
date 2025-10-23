'use client'

import { PageLayout } from '@/components/layout/page-layout'
import { Booking } from '@/components/booking/booking'
import { BookingGuard } from '@/components/auth/booking-guard'
import { mockData } from '@/lib/mock-data'
import { NavigationParams } from '@/types'

export default function BookingPage() {
	const dinner = mockData.dinners[0] // In a real app, this would come from URL params or state

	const handleNavigation = (page: string, params?: NavigationParams) => {
		// This will be handled by Next.js routing
		console.log('Navigation:', page, params)
	}

	return (
		<BookingGuard>
			<PageLayout>
				<Booking 
					dinner={dinner} 
					date={new Date()} 
					guests={2} 
					onNavigate={handleNavigation}
				/>
			</PageLayout>
		</BookingGuard>
	)
}

