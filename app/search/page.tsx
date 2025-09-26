'use client'

import { Header } from '@/components/header'
import { SearchResults } from '@/components/search-results'

export default function SearchPage() {
	return (
		<div className="min-h-screen bg-background">
			<Header onSearch={(params) => { /* no-op: handled in client */ }} />
			<SearchResults searchParams={{}} onNavigate={() => {}} />
		</div>
	)
}

