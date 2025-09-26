'use client'

import { useState, useEffect } from 'react'
import { Header } from './components/header'
import { SearchWidget } from './components/search-widget'
import { SearchResults } from './components/search-results'
import { DinnerDetail } from './components/dinner-detail'
import { Booking } from './components/booking'
import { DinnerCard } from './components/dinner-card'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import Image from 'next/image'
import { 
  Search, 
  Calendar, 
  Star, 
  Shield, 
  CreditCard, 
  Headphones,
  ChefHat,
  Users,
  MapPin,
  ArrowRight,
  Facebook,
  Instagram,
  Twitter,
  Globe
} from 'lucide-react'
import { mockData } from './lib/mock-data'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [pageParams, setPageParams] = useState<any>({})
  const { dinners } = mockData

  const handleNavigation = (page: string, params?: any) => {
    setCurrentPage(page)
    setPageParams(params || {})
  }

  const handleSearch = (searchParams: { location: string; date?: Date; guests: number }) => {
    handleNavigation('search-results', searchParams)
  }

  const featuredDinners = dinners.slice(0, 3)

  // Render different pages based on current page
  if (currentPage === 'search-results') {
    return (
      <div className="min-h-screen bg-background">
        <Header onSearch={handleSearch} />
        <SearchResults searchParams={pageParams} onNavigate={handleNavigation} />
      </div>
    )
  }

  if (currentPage === 'dinner-detail') {
    return (
      <div className="min-h-screen bg-background">
        <Header onSearch={handleSearch} />
        <DinnerDetail dinner={pageParams.dinner} onNavigate={handleNavigation} />
      </div>
    )
  }

  if (currentPage === 'booking') {
    return (
      <div className="min-h-screen bg-background">
        <Header onSearch={handleSearch} />
        <Booking 
          dinner={pageParams.dinner} 
          date={pageParams.date} 
          guests={pageParams.guests || 2} 
          onNavigate={handleNavigation} 
        />
      </div>
    )
  }

  // Home page
  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] lg:h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://plus.unsplash.com/premium_photo-1677666509899-7c8cbc69ddc5?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Elegant dinner table"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Find Your Next Authentic <br />Dining Experience
          </h1>
          <p className="text-lg lg:text-xl mb-8 text-white/90">
            Connect with local hosts for unforgettable meals in their homes
          </p>
          
          {/* Search Widget */}
          <div className="max-w-4xl mx-auto">
            <SearchWidget variant="hero" onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 lg:py-16 bg-background-secondary">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-8">
            Join 10,000+ diners discovering authentic home cooking
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold">Verified Hosts</h3>
              <p className="text-sm text-muted-foreground">All hosts are background checked and verified</p>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-success" />
              </div>
              <h3 className="font-semibold">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">Your payment is protected until your dining experience</p>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center">
                <Headphones className="w-8 h-8 text-warning" />
              </div>
              <h3 className="font-semibold">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">Get help whenever you need it, day or night</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dinners */}
      <section className="py-16 lg:py-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
                Trending dinner experiences near you
              </h2>
              <p className="text-muted-foreground text-lg">
                Discover unique dining experiences hosted by locals
              </p>
            </div>
            <Button 
              variant="outline" 
              className="hidden md:flex items-center space-x-2"
              onClick={() => handleNavigation('search-results', {})}
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDinners.map((dinner) => (
              <div 
                key={dinner.id}
                onClick={() => handleNavigation('dinner-detail', { dinner })}
              >
                <DinnerCard dinner={dinner} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Button 
              variant="outline" 
              className="items-center space-x-2"
              onClick={() => handleNavigation('search-results', {})}
            >
              <span>View All Experiences</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-20 bg-background-secondary">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
              How DineWithUs Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From discovery to dining, we've made it simple to connect with amazing hosts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-semibold text-xl">Search</h3>
              <p className="text-muted-foreground">Find dinner experiences by location, date, cuisine, and more</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-semibold text-xl">Book</h3>
              <p className="text-muted-foreground">Reserve your spot with instant booking or send a request to the host</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <ChefHat className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-semibold text-xl">Experience</h3>
              <p className="text-muted-foreground">Enjoy authentic home cooking and meet fellow food lovers</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Star className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-semibold text-xl">Review</h3>
              <p className="text-muted-foreground">Share your experience and help others discover great dining</p>
            </div>
          </div>
        </div>
      </section>

      {/* Host CTA */}
      <section className="py-16 lg:py-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
              <div className="p-8 lg:p-12">
                <h2 className="text-3xl lg:text-4xl font-semibold mb-6">
                  Earn up to $500/week hosting dinners
                </h2>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Share your passion for cooking with others</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Set your own schedule and menu</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Meet interesting people from around the world</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Get paid within 24 hours after each dinner</span>
                  </li>
                </ul>
                <Button size="lg" className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl">
                  Start Hosting Today
                </Button>
              </div>
              
              <div className="h-64 lg:h-96 relative">
                <Image
                  src="https://images.unsplash.com/photo-1569435998017-abb5d562dedf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwdG9nZXRoZXIlMjBraXRjaGVuJTIwZnJpZW5kc3xlbnwxfHx8fDE3NTg1NDgyNjR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Cooking together"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background-secondary py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* About */}
            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">How it works</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Newsroom</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Investors</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>

            {/* Hosts */}
            <div>
              <h3 className="font-semibold mb-4">Hosts</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Become a host</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Host resources</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Community forum</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Host insurance</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Safety information</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Cancellation options</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Report issue</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-semibold mb-4">Stay Updated</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest dining experiences and host tips
              </p>
              <div className="flex space-x-2">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <Button size="sm" className="bg-primary hover:bg-primary-dark">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-border pt-8">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">D</span>
                  </div>
                  <span className="font-bold text-xl text-primary">DineWithUs</span>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  © 2024 DineWithUs. All rights reserved.
                </p>
              </div>

              <div className="flex items-center space-x-6">
                {/* Language/Currency */}
                <Button variant="ghost" size="sm" className="text-sm">
                  <Globe className="w-4 h-4 mr-2" />
                  English (US)
                </Button>

                {/* Social Links */}
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="p-2">
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Instagram className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Twitter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}