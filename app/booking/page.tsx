'use client'

import { Header } from '@/components/header'
import { Booking } from '@/components/booking'
import { mockData } from '@/lib/mock-data'

export default function BookingPage() {
	const dinner = mockData.dinners[0]
	return (
		<div className="min-h-screen bg-background">
			<Header onSearch={() => {}} />
			<Booking dinner={dinner} date={new Date()} guests={2} onNavigate={() => {}} />
		</div>
	)
}

