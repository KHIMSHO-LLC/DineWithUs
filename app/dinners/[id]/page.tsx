'use client'

import { useMemo } from 'react'
import { Header } from '@/components/header'
import { DinnerDetail } from '@/components/dinner-detail'
import { mockData } from '@/lib/mock-data'

export default function DinnerDetailPage({ params }: { params: { id: string } }) {
	const dinner = useMemo(() => mockData.dinners.find(d => String(d.id) === params.id), [params.id])
	return (
		<div className="min-h-screen bg-background">
			<Header onSearch={() => {}} />
			{dinner ? (
				<DinnerDetail dinner={dinner} onNavigate={() => {}} />
			) : (
				<div className="max-w-screen-xl mx-auto px-4 py-16">Not found</div>
			)}
		</div>
	)
}

