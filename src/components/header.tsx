'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Search, Menu, Globe, User, Calendar, Heart, Settings, HelpCircle, LogOut } from 'lucide-react'

interface HeaderProps {
  onSearch?: (params: { location: string; date?: Date; guests: number }) => void
}

export function Header({ onSearch }: HeaderProps = {}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-card border-b border-border' : 'bg-transparent'
    }`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="hidden sm:block font-bold text-xl text-primary">DineWithUs</span>
            </a>
          </div>


          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Become a Host */}
            <Button variant="ghost" className="hidden md:flex text-sm font-semibold hover:bg-secondary rounded-full px-4 py-2">
              Become a Host
            </Button>

            {/* Language/Globe */}
            {/* <Button variant="ghost" size="sm" className="hidden md:flex p-3 rounded-full">
              <Globe className="w-4 h-4" />
            </Button> */}

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 border border-border rounded-full px-2 py-1 hover:shadow-card transition-shadow">
                  <Menu className="w-4 h-4" />
                  <Avatar className="w-8 h-8">
                    {/* <AvatarImage src="/avatars/default.jpg" /> */}
                    <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
                <DropdownMenuItem className="font-semibold">
                  Sign up
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Log in
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Calendar className="w-4 h-4 mr-2" />
                  My bookings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Heart className="w-4 h-4 mr-2" />
                  Wishlists
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Become a Host
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Help Center
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Account
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <Button className="justify-start" variant="ghost">
                    Sign up
                  </Button>
                  <Button className="justify-start" variant="ghost">
                    Log in
                  </Button>
                  <div className="border-t pt-4 space-y-2">
                    <Button className="justify-start" variant="ghost">
                      <Calendar className="w-4 h-4 mr-2" />
                      My bookings
                    </Button>
                    <Button className="justify-start" variant="ghost">
                      <Heart className="w-4 h-4 mr-2" />
                      Wishlists
                    </Button>
                    <Button className="justify-start" variant="ghost">
                      Become a Host
                    </Button>
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <Button className="justify-start" variant="ghost">
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Help Center
                    </Button>
                    <Button className="justify-start" variant="ghost">
                      <Globe className="w-4 h-4 mr-2" />
                      Language
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-4">
          <div className="flex items-center bg-white border border-border rounded-full shadow-card">
            <div className="flex-1 px-4">
              <Input 
                placeholder="Where to?" 
                className="border-0 focus:ring-0 text-sm"
              />
            </div>
            <Button 
              size="sm" 
              className="rounded-full m-2 w-8 h-8 p-0 bg-primary hover:bg-primary-dark"
              onClick={() => onSearch && onSearch({ location: 'Anywhere', guests: 2 })}
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}