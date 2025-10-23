'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Separator } from '../ui/separator'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Image from 'next/image'
import { 
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  MapPin,
  CreditCard,
  Shield,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

import { Dinner, NavigationParams } from '@/types'

interface BookingProps {
  dinner: Dinner
  date?: Date
  guests: number
  onNavigate: (page: string, params?: NavigationParams) => void
}

export function Booking({ dinner, date, guests, onNavigate }: BookingProps) {
  const [step, setStep] = useState(1)
  const [guestDetails, setGuestDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  })
  const [paymentMethod, setPaymentMethod] = useState('')

  const subtotal = dinner.price * guests
  const serviceFee = Math.round(subtotal * 0.14)
  const total = subtotal + serviceFee

  const handleGuestDetailsSubmit = () => {
    if (guestDetails.firstName && guestDetails.lastName && guestDetails.email) {
      setStep(2)
    }
  }

  const handleBookingConfirm = () => {
    // Simulate booking confirmation
    onNavigate('booking-confirmed', { dinner, date, guests, total })
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Back Button */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('dinner-detail', { dinner })}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to dinner</span>
        </Button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Progress */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
            }`}>
              1
            </div>
            <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
            }`}>
              2
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Content */}
          <div className="space-y-6">
            {step === 1 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Guest Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First name *</Label>
                      <Input
                        id="firstName"
                        value={guestDetails.firstName}
                        onChange={(e) => setGuestDetails(prev => ({ ...prev, firstName: e.target.value }))}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last name *</Label>
                      <Input
                        id="lastName"
                        value={guestDetails.lastName}
                        onChange={(e) => setGuestDetails(prev => ({ ...prev, lastName: e.target.value }))}
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={guestDetails.email}
                      onChange={(e) => setGuestDetails(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={guestDetails.phone}
                      onChange={(e) => setGuestDetails(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="requests">Special requests or dietary restrictions</Label>
                    <Textarea
                      id="requests"
                      value={guestDetails.specialRequests}
                      onChange={(e) => setGuestDetails(prev => ({ ...prev, specialRequests: e.target.value }))}
                      placeholder="Let the host know about any allergies, dietary preferences, or special requests..."
                      rows={3}
                    />
                  </div>

                  <Button 
                    onClick={handleGuestDetailsSubmit}
                    className="w-full bg-primary-600 hover:bg-primary-700"
                    disabled={!guestDetails.firstName || !guestDetails.lastName || !guestDetails.email}
                  >
                    Continue to Payment
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Payment</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Payment method</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="card">Credit or Debit Card</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="apple">Apple Pay</SelectItem>
                        <SelectItem value="google">Google Pay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Shield className="w-4 h-4 text-success" />
                      <span>Your payment is secure and encrypted</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Free cancellation up to 24 hours before</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={handleBookingConfirm}
                      className="flex-1 bg-primary-600 hover:bg-primary-700"
                      disabled={!paymentMethod}
                    >
                      Confirm Booking
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                {/* Dinner Info */}
                <div className="flex space-x-4 mb-6">
                  <div className="relative w-20 h-16">
                    <Image
                      src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=160&fit=crop&crop=center"
                      alt={dinner.title}
                      fill
                      sizes="80px"
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm line-clamp-2">{dinner.title}</h3>
                    <div className="flex items-center space-x-1 mt-1">
                      <Avatar className="w-4 h-4">
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt={dinner.host.name} />
                        <AvatarFallback>{dinner.host.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{dinner.host.name}</span>
                    </div>
                  </div>
                </div>

                <Separator className="mb-6" />

                {/* Booking Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>
                      {date ? date.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      }) : 'Date not selected'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{dinner.time}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{guests} {guests === 1 ? 'guest' : 'guests'}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{dinner.location.neighborhood}, {dinner.location.city}</span>
                  </div>
                </div>

                <Separator className="mb-6" />

                {/* Price Breakdown */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>${dinner.price} x {guests} guests</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>${serviceFee}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total (USD)</span>
                    <span>${total}</span>
                  </div>
                </div>

                {/* Cancellation Policy */}
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-warning mt-0.5" />
                    <div className="text-xs">
                      <span className="font-medium">Free cancellation</span>
                      <p className="text-muted-foreground mt-1">
                        Cancel up to 24 hours before your dinner for a full refund.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}