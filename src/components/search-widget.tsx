'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Search, MapPin, Calendar as CalendarIcon, Users, Plus, Minus } from 'lucide-react'
// import { format } from 'date-fns'

interface SearchWidgetProps {
  variant?: 'hero' | 'compact'
  className?: string
  onSearch?: (params: { location: string; date?: Date; guests: number }) => void
}

export function SearchWidget({ variant = 'hero', className = '', onSearch }: SearchWidgetProps) {
  const [location, setLocation] = useState('')
  const [date, setDate] = useState<Date>()
  const [guests, setGuests] = useState(2)
  const [showGuestSelector, setShowGuestSelector] = useState(false)

  const incrementGuests = () => setGuests(prev => Math.min(prev + 1, 20))
  const decrementGuests = () => setGuests(prev => Math.max(prev - 1, 1))

  if (variant === 'compact') {
    return (
      <div className={`flex items-center bg-white rounded-full shadow-card border border-border ${className}`}>
        <Button variant="ghost" className="rounded-l-full px-6 py-3 border-r flex-1 justify-start">
          <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
          <span className="text-sm font-medium">Anywhere</span>
        </Button>
        
        <Button variant="ghost" className="px-6 py-3 border-r flex-1 justify-start">
          <CalendarIcon className="w-4 h-4 mr-2 text-muted-foreground" />
          <span className="text-sm font-medium">Any week</span>
        </Button>
        
        <Button variant="ghost" className="px-6 py-3 flex-1 justify-start text-muted-foreground">
          <Users className="w-4 h-4 mr-2" />
          <span className="text-sm">Add guests</span>
        </Button>
        
        <Button 
          size="sm" 
          className="rounded-full m-2 w-8 h-8 p-0 bg-primary hover:bg-primary-dark"
          onClick={() => {
            if (onSearch) {
              onSearch({ location: 'Anywhere', date, guests })
            }
          }}
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-2xl shadow-modal border border-border p-2 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {/* Location */}
        <div className="relative">
          <label className="block text-xs font-semibold text-gray-800 mb-1 ml-4">Where</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search destinations"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 py-3 border-0 focus:ring-2 focus:ring-primary rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-[rgba(0,0,0,1)]"
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-xs font-semibold text-gray-800 mb-1 ml-4">When</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="w-full justify-start py-3 px-4 h-auto bg-gray-50 hover:bg-gray-100 border-0 rounded-xl">
                <CalendarIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-[rgba(0,0,0,1)]">
                  {date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Add dates'}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div>
          <label className="block text-xs font-semibold text-gray-800 mb-1 ml-4">Guests</label>
          <Popover open={showGuestSelector} onOpenChange={setShowGuestSelector}>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="w-full justify-start py-3 px-4 h-auto bg-gray-50 hover:bg-gray-100 border-0 rounded-xl">
                <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-[rgba(0,0,0,1)]">
                  {guests} {guests === 1 ? 'guest' : 'guests'}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Guests</div>
                    <div className="text-sm text-muted-foreground">Ages 13 or above</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0 rounded-full"
                      onClick={decrementGuests}
                      disabled={guests <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center">{guests}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0 rounded-full"
                      onClick={incrementGuests}
                      disabled={guests >= 20}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button 
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-2"
            onClick={() => {
              if (onSearch) {
                onSearch({ location, date, guests })
              }
            }}
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SearchWidget