'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, AlertCircle, User, Phone, Mail, Globe, Languages, Users } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { getRedirectUrl } from '@/lib/auth-utils'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    gender: '',
    country: '',
    languages: ['english'] as string[],
    userType: 'guest' as 'guest' | 'host',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validation
    if (!formData.name || !formData.phone || !formData.email || !formData.gender || !formData.country || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    if (!agreeToTerms) {
      setError('Please agree to the Terms & Conditions')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          gender: formData.gender,
          country: formData.country,
          languages: formData.languages,
          password: formData.password,
          role: formData.userType,
        }),
      })

      if (response.ok) {
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        })

        if (result?.ok) {
          // Get the session to determine redirect URL
          const { getSession } = await import('next-auth/react')
          const session = await getSession()
          const redirectUrl = getRedirectUrl(session)
          router.push(redirectUrl)
          router.refresh()
        } else {
          setError('Registration successful. Please sign in.')
          router.push('/auth/signin')
        }
      } else {
        const data = await response.json()
        setError(data.error || 'Registration failed')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')

    try {
      await signIn('google', { callbackUrl: '/' })
    } catch (error) {
      setError('Failed to sign up with Google')
      setLoading(false)
    }
  }


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Side - Image (Desktop only) */}
      <div className="hidden md:flex md:w-1/2 relative h-screen">
        <Image
          src="/assets/sign.jpeg"
          alt="European street dining scene"
          fill
          className="object-cover"
          priority
        />
        {/* Optional overlay for better text contrast if needed */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="flex-1 bg-muted h-screen overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4 md:p-8">
          <div className="w-full max-w-md bg-card rounded-2xl shadow-lg p-6 md:p-8">
            {/* Form Header */}
            <h2 className="text-2xl md:text-3xl font-bold leading-tight text-foreground mb-6 text-center">Join DineWithUs</h2>

            {/* Error Alert */}
            {error && (
              <div className="mb-4 bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex items-center gap-3">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <span className="text-destructive text-sm font-medium">{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Field */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    // Allow only numbers, spaces, +, -, (, )
                    const value = e.target.value.replace(/[^0-9\s\+\-\(\)]/g, '');
                    handleInputChange('phone', value);
                  }}
                  className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Gender Field */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>

              {/* Country Field */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  placeholder="Enter your country name"
                  list="countries"
                  required
                />
                <datalist id="countries">
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Spain">Spain</option>
                  <option value="Italy">Italy</option>
                  <option value="Japan">Japan</option>
                  <option value="South Korea">South Korea</option>
                  <option value="China">China</option>
                  <option value="India">India</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Norway">Norway</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Finland">Finland</option>
                  <option value="Poland">Poland</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Greece">Greece</option>
                  <option value="Russia">Russia</option>
                  <option value="Ukraine">Ukraine</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Chile">Chile</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Peru">Peru</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Egypt">Egypt</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Vietnam">Vietnam</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Singapore">Singapore</option>
                </datalist>
              </div>

              {/* Languages Field */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Languages</label>
                <input
                  type="text"
                  value={formData.languages.join(', ')}
                  onChange={(e) => {
                    const languages = e.target.value.split(',').map(lang => lang.trim()).filter(lang => lang);
                    setFormData(prev => ({ ...prev, languages }));
                  }}
                  className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  placeholder="Enter languages separated by commas (e.g., English, Spanish, French)"
                  list="languages"
                />
                <datalist id="languages">
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Italian">Italian</option>
                  <option value="Portuguese">Portuguese</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Korean">Korean</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Russian">Russian</option>
                  <option value="Dutch">Dutch</option>
                  <option value="Swedish">Swedish</option>
                  <option value="Norwegian">Norwegian</option>
                  <option value="Danish">Danish</option>
                  <option value="Finnish">Finnish</option>
                  <option value="Polish">Polish</option>
                  <option value="Turkish">Turkish</option>
                  <option value="Greek">Greek</option>
                  <option value="Hebrew">Hebrew</option>
                  <option value="Urdu">Urdu</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Telugu">Telugu</option>
                  <option value="Marathi">Marathi</option>
                  <option value="Gujarati">Gujarati</option>
                  <option value="Punjabi">Punjabi</option>
                  <option value="Vietnamese">Vietnamese</option>
                  <option value="Thai">Thai</option>
                  <option value="Indonesian">Indonesian</option>
                  <option value="Malay">Malay</option>
                  <option value="Tagalog">Tagalog</option>
                  <option value="Swahili">Swahili</option>
                  <option value="Amharic">Amharic</option>
                  <option value="Yoruba">Yoruba</option>
                  <option value="Igbo">Igbo</option>
                  <option value="Hausa">Hausa</option>
                </datalist>
                <p className="text-xs text-muted-foreground mt-1">Enter languages separated by commas. English is selected by default.</p>
              </div>

              {/* User Type Field */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">I am registering as</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center p-4 bg-muted rounded-xl cursor-pointer hover:bg-muted/80 transition">
                    <input
                      type="radio"
                      name="userType"
                      value="guest"
                      checked={formData.userType === 'guest'}
                      onChange={(e) => handleInputChange('userType', e.target.value)}
                      className="mr-3 text-primary-600"
                    />
                    <Users className="w-5 h-5 mr-2 text-primary-600" />
                    <span className="font-medium">Guest (Diner)</span>
                  </label>
                  <label className="flex items-center p-4 bg-muted rounded-xl cursor-pointer hover:bg-muted/80 transition">
                    <input
                      type="radio"
                      name="userType"
                      value="host"
                      checked={formData.userType === 'host'}
                      onChange={(e) => handleInputChange('userType', e.target.value)}
                      className="mr-3 text-primary-600"
                    />
                    <User className="w-5 h-5 mr-2 text-primary-600" />
                    <span className="font-medium">Host (Owner)</span>
                  </label>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition pr-12"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-md p-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full px-4 py-3 bg-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition pr-12"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-md p-1"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

              {/* Terms Agreement */}
              <div className="flex items-start gap-2 py-2">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary/50 mt-1"
                required
              />
              <label className="text-sm font-medium text-foreground">
                I agree to{' '}
                <Link href="/terms" className="text-primary-600 hover:text-primary-700 font-medium">
                  Terms & Conditions
                </Link>
              </label>
            </div>

              {/* Create Account Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-2.5 rounded-xl text-base font-semibold leading-normal hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-600"
              >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

            {/* Divider */}
            <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-muted text-muted-foreground">Or sign up with</span>
              </div>
            </div>

              {/* Social Login Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-4 px-6 py-3 bg-background border border-border rounded-xl hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-background"
                >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.375-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-foreground font-medium">Google</span>
              </button>
              </div>
            </div>

            {/* Sign In Link */}
            <p className="mt-6 text-center text-sm font-medium text-muted-foreground">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-primary-600 font-semibold hover:text-primary-700 transition">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}