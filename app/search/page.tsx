'use client'

import { useSearchParams } from 'next/navigation'
import { PageLayout } from '@/components/layout/page-layout'
import { SearchResults } from '@/components/search/search-results'
import { BookingGuard } from '@/components/auth/booking-guard'

export default function SearchPage() {
	const searchParams = useSearchParams()
	
	// Parse search parameters from URL
	const location = searchParams.get('location') || ''
	const dateParam = searchParams.get('date')
	const guestsParam = searchParams.get('guests')
	
	const date = dateParam ? new Date(dateParam) : undefined
	const guests = guestsParam ? parseInt(guestsParam, 10) : 2
	
	const searchParamsObj = {
		location,
		date,
		guests
	}

	return (
		<BookingGuard>
			<PageLayout>
				<SearchResults searchParams={searchParamsObj} />
			</PageLayout>
		</BookingGuard>
	)
}

