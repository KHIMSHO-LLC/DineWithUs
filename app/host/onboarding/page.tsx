'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { HostGuard } from '@/components/auth/host-guard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock,
  Users,
  DollarSign,
  Camera,
  Upload,
  ChefHat,
  Heart,
  Star,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Home,
  Shield
} from 'lucide-react'
import Image from 'next/image'

export default function HostOnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [hostData, setHostData] = useState({
    // Step 1: Personal Info
    fullName: '',
    email: '',
    phone: '',
    bio: '',
    profileImage: '',
    
    // Step 2: Location & Availability
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    timezone: 'America/New_York',
    
    // Step 3: Hosting Preferences
    maxCapacity: 8,
    priceRange: 'moderate',
    cuisineTypes: [] as string[],
    dietaryAccommodations: [] as string[],
    
    // Step 4: Verification
    idVerification: false,
    backgroundCheck: false,
    termsAccepted: false,
    
    // Step 5: Stripe Connect
    stripeConnected: false,
    bankAccount: '',
    taxId: ''
  })

  const cuisineTypes = [
    'Italian', 'French', 'Japanese', 'Chinese', 'Indian', 'Mexican', 
    'Mediterranean', 'American', 'Thai', 'Korean', 'Spanish', 'Greek',
    'Lebanese', 'Ethiopian', 'Vietnamese', 'Fusion', 'Other'
  ]

  const dietaryAccommodations = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 
    'Kosher', 'Halal', 'Low-Sodium', 'Diabetic-Friendly'
  ]

  const handleInputChange = (field: string, value: any) => {
    setHostData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCuisineToggle = (cuisine: string) => {
    setHostData(prev => ({
      ...prev,
      cuisineTypes: prev.cuisineTypes.includes(cuisine)
        ? prev.cuisineTypes.filter(c => c !== cuisine)
        : [...prev.cuisineTypes, cuisine]
    }))
  }

  const handleDietaryToggle = (dietary: string) => {
    setHostData(prev => ({
      ...prev,
      dietaryAccommodations: prev.dietaryAccommodations.includes(dietary)
        ? prev.dietaryAccommodations.filter(d => d !== dietary)
        : [...prev.dietaryAccommodations, dietary]
    }))
  }

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeOnboarding = () => {
    // TODO: Submit to backend
    console.log('Host onboarding completed:', hostData)
    router.push('/host/dashboard')
  }

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Personal Information
        </CardTitle>
        <CardDescription>Tell us about yourself as a host</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Image */}
        <div className="flex items-center gap-6">
          <Avatar className="w-20 h-20">
            <AvatarImage src={hostData.profileImage} alt={hostData.fullName} />
            <AvatarFallback>
              {hostData.fullName ? hostData.fullName.charAt(0) : <User className="w-8 h-8" />}
            </AvatarFallback>
          </Avatar>
          <div>
            <Button variant="outline" className="gap-2">
              <Camera className="w-4 h-4" />
              Upload Photo
            </Button>
            <p className="text-sm text-muted-foreground mt-2">Add a professional photo</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name *</label>
            <Input 
              value={hostData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <Input 
              type="email"
              value={hostData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone Number *</label>
            <Input 
              type="tel"
              value={hostData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Country</label>
            <Select value={hostData.country} onValueChange={(value) => handleInputChange('country', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="United States">United States</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                <SelectItem value="Australia">Australia</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Bio *</label>
          <Textarea 
            value={hostData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            placeholder="Tell us about your cooking experience, passion for food, and what makes your dinners special..."
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  )

  const renderStep2 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Location & Availability
        </CardTitle>
        <CardDescription>Where will you host your dinners?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Street Address *</label>
          <Input 
            value={hostData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="123 Main Street"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">City *</label>
            <Input 
              value={hostData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="New York"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">State/Province *</label>
            <Input 
              value={hostData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              placeholder="NY"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">ZIP/Postal Code *</label>
            <Input 
              value={hostData.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              placeholder="10001"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Timezone *</label>
            <Select value={hostData.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                <SelectItem value="Europe/London">London (GMT)</SelectItem>
                <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Maximum Capacity *</label>
            <Select value={hostData.maxCapacity.toString()} onValueChange={(value) => handleInputChange('maxCapacity', parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">4 guests</SelectItem>
                <SelectItem value="6">6 guests</SelectItem>
                <SelectItem value="8">8 guests</SelectItem>
                <SelectItem value="10">10 guests</SelectItem>
                <SelectItem value="12">12 guests</SelectItem>
                <SelectItem value="15">15 guests</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderStep3 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChefHat className="w-5 h-5" />
          Hosting Preferences
        </CardTitle>
        <CardDescription>What type of dining experiences will you offer?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-3">Cuisine Types *</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {cuisineTypes.map((cuisine) => (
              <Button
                key={cuisine}
                variant={hostData.cuisineTypes.includes(cuisine) ? "default" : "outline"}
                size="sm"
                onClick={() => handleCuisineToggle(cuisine)}
                className="justify-start"
              >
                {cuisine}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">Dietary Accommodations</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {dietaryAccommodations.map((dietary) => (
              <Button
                key={dietary}
                variant={hostData.dietaryAccommodations.includes(dietary) ? "default" : "outline"}
                size="sm"
                onClick={() => handleDietaryToggle(dietary)}
                className="justify-start"
              >
                {dietary}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Price Range *</label>
          <Select value={hostData.priceRange} onValueChange={(value) => handleInputChange('priceRange', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="budget">Budget ($20-40 per person)</SelectItem>
              <SelectItem value="moderate">Moderate ($40-80 per person)</SelectItem>
              <SelectItem value="premium">Premium ($80-150 per person)</SelectItem>
              <SelectItem value="luxury">Luxury ($150+ per person)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )

  const renderStep4 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Verification & Terms
        </CardTitle>
        <CardDescription>Complete verification to become a verified host</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-primary-600" />
              <div>
                <p className="font-medium">Identity Verification</p>
                <p className="text-sm text-muted-foreground">Upload a government-issued ID</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Upload ID
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary-600" />
              <div>
                <p className="font-medium">Background Check</p>
                <p className="text-sm text-muted-foreground">Complete background verification</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Start Check
            </Button>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-start gap-3">
            <input 
              type="checkbox" 
              checked={hostData.termsAccepted}
              onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
              className="mt-1"
            />
            <div>
              <p className="text-sm">
                I agree to the{' '}
                <a href="#" className="text-primary-600 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-primary-600 hover:underline">Host Agreement</a>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderStep5 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Payment Setup
        </CardTitle>
        <CardDescription>Connect your Stripe account to receive payments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="w-8 h-8 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Connect Stripe Account</h3>
          <p className="text-muted-foreground mb-6">
            Secure payment processing with automatic commission splits
          </p>
          <Button size="lg" className="gap-2">
            Connect Stripe Account
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Bank Account (Optional)</label>
            <Input 
              value={hostData.bankAccount}
              onChange={(e) => handleInputChange('bankAccount', e.target.value)}
              placeholder="Account number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tax ID (Optional)</label>
            <Input 
              value={hostData.taxId}
              onChange={(e) => handleInputChange('taxId', e.target.value)}
              placeholder="Tax identification number"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const getStepTitle = () => {
    const titles = [
      'Personal Information',
      'Location & Availability', 
      'Hosting Preferences',
      'Verification & Terms',
      'Payment Setup'
    ]
    return titles[currentStep - 1]
  }

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return hostData.fullName && hostData.email && hostData.phone && hostData.bio
      case 2:
        return hostData.address && hostData.city && hostData.state && hostData.zipCode
      case 3:
        return hostData.cuisineTypes.length > 0 && hostData.priceRange
      case 4:
        return hostData.termsAccepted
      case 5:
        return true // Stripe connection is optional for now
      default:
        return false
    }
  }

  return (
    <HostGuard>
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Become a Host</h1>
              <p className="text-muted-foreground mt-1">Share your passion for food and earn money</p>
            </div>
            <Button variant="outline" onClick={() => router.push('/')}>
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step}
                </div>
                {step < 5 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    step < currentStep ? 'bg-primary-600' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-center mt-4 text-lg font-medium">{getStepTitle()}</p>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          {currentStep < 5 ? (
            <Button 
              onClick={nextStep}
              disabled={!isStepComplete()}
              className="gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button 
              onClick={completeOnboarding}
              disabled={!isStepComplete()}
              className="gap-2"
            >
              Complete Onboarding
              <CheckCircle className="w-4 h-4" />
            </Button>
          )}
        </div>
        </div>
      </div>
    </HostGuard>
  )
}
