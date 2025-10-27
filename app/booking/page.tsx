'use client'

import { useRouter } from 'next/navigation'
import { PageLayout } from '@/components/layout/page-layout'
import { Booking } from '@/components/booking/booking'
import { BookingGuard } from '@/components/auth/booking-guard'
import { mockData } from '@/lib/mock-data'
import { NavigationParams } from '@/types'

export default function BookingPage() {
	const router = useRouter()
	const dinner = mockData.dinners[0] // In a real app, this would come from URL params or state

	const handleNavigation = (page: string, params?: NavigationParams) => {
		// Handle navigation based on page type
		if (page === 'dinner-detail' && params?.dinner) {
			router.push(`/dinners/${params.dinner.id}`)
		} else if (page === 'booking-confirmed') {
			router.push('/profile?tab=bookings')
		} else if (page === 'chat') {
			// Handle chat navigation if needed
			console.log('Chat navigation:', params)
		}
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

