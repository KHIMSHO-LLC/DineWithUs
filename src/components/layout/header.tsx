"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  Search,
  Menu,
  Globe,
  User,
  Calendar,
  Heart,
  Settings,
  HelpCircle,
  LogOut,
  ChefHat,
} from "lucide-react";
import { SearchParams } from "@/types";

interface HeaderProps {
  onSearch?: (params: SearchParams) => void;
}

export function Header({ onSearch }: HeaderProps = {}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="hidden sm:block font-bold text-xl text-primary">
                DineWithUs
              </span>
            </a>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Language/Globe */}
            {/* <Button variant="ghost" size="sm" className="hidden md:flex p-3 rounded-full">
              <Globe className="w-4 h-4" />
            </Button> */}

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 border border-border rounded-full px-2 py-1 hover:shadow-card transition-shadow"
                >
                  <Menu className="w-4 h-4" />
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={session?.user?.image || ""}
                      alt={session?.user?.name || "User avatar"}
                    />
                    <AvatarFallback>
                      {session?.user?.name ? (
                        session.user.name.charAt(0).toUpperCase()
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
                {session ? (
                  <>
                    <DropdownMenuItem className="font-semibold">
                      {session.user?.name || session.user?.email}
                    </DropdownMenuItem>
                    {session.user?.role === "host" ? (
                      <>
                        <DropdownMenuItem onClick={() => router.push("/host/dashboard")}>
                          <ChefHat className="w-4 h-4 mr-2" />
                          Host Dashboard
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/host/dashboard?tab=dinners")}>
                          <Calendar className="w-4 h-4 mr-2" />
                          My Dinners
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/host/dashboard?tab=bookings")}>
                          <Calendar className="w-4 h-4 mr-2" />
                          Bookings
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/host/dashboard?tab=reviews")}>
                          <Heart className="w-4 h-4 mr-2" />
                          Reviews
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem onClick={() => router.push("/profile")}>
                          <User className="w-4 h-4 mr-2" />
                          My Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/profile?tab=bookings")}>
                          <Calendar className="w-4 h-4 mr-2" />
                          My bookings
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/profile?tab=reviews")}>
                          <Heart className="w-4 h-4 mr-2" />
                          My reviews
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/help-center")}>
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Help Center
                    </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(session.user?.role === "host" ? "/host/dashboard?tab=settings" : "/profile?tab=settings")}>
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem
                      className="font-semibold"
                      onClick={() => router.push("/auth/signup")}
                    >
                      Sign up
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/auth/signin")}
                    >
                      Log in
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/help-center")}>
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Help Center
                    </DropdownMenuItem>
                  </>
                )}
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
                  {session ? (
                    <>
                      <div className="flex items-center space-x-3 pb-4 border-b">
                        <Avatar className="w-10 h-10">
                          <AvatarImage
                            src={session.user?.image || ""}
                            alt={session.user?.name || "User avatar"}
                          />
                          <AvatarFallback>
                            {session.user?.name ? (
                              session.user.name.charAt(0).toUpperCase()
                            ) : (
                              <User className="w-5 h-5" />
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">
                            {session.user?.name || session.user?.email}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {session.user?.role === "host" ? "Host" : "Guest"}
                          </p>
                        </div>
                      </div>
                      {session.user?.role === "host" ? (
                        <>
                          <Button
                            className="justify-start"
                            variant="ghost"
                            onClick={() => router.push("/host/dashboard")}
                          >
                            <ChefHat className="w-4 h-4 mr-2" />
                            Host Dashboard
                          </Button>
                          <Button
                            className="justify-start"
                            variant="ghost"
                            onClick={() => router.push("/host/dashboard?tab=dinners")}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            My Dinners
                          </Button>
                          <Button 
                            className="justify-start" 
                            variant="ghost"
                            onClick={() => router.push("/host/dashboard?tab=bookings")}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Bookings
                          </Button>
                          <Button 
                            className="justify-start" 
                            variant="ghost"
                            onClick={() => router.push("/host/dashboard?tab=reviews")}
                          >
                            <Heart className="w-4 h-4 mr-2" />
                            Reviews
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            className="justify-start"
                            variant="ghost"
                            onClick={() => router.push("/profile")}
                          >
                            My Profile
                          </Button>
                          <Button 
                            className="justify-start" 
                            variant="ghost"
                            onClick={() => router.push("/profile?tab=bookings")}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            My bookings
                          </Button>
                          <Button 
                            className="justify-start" 
                            variant="ghost"
                            onClick={() => router.push("/profile?tab=reviews")}
                          >
                            <Heart className="w-4 h-4 mr-2" />
                            My reviews
                          </Button>
                        </>
                      )}
                      <div className="border-t pt-4 space-y-2">
                        <Button 
                          className="justify-start" 
                          variant="ghost"
                          onClick={() => router.push("/help-center")}
                        >
                          <HelpCircle className="w-4 h-4 mr-2" />
                          Help Center
                        </Button>
                        <Button
                          className="justify-start"
                          variant="ghost"
                          onClick={() => router.push(session.user?.role === "host" ? "/host/dashboard?tab=settings" : "/profile?tab=settings")}
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Account Settings
                        </Button>
                        <Button
                          className="justify-start"
                          variant="ghost"
                          onClick={() => signOut({ callbackUrl: "/" })}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign out
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Button
                        className="justify-start"
                        variant="ghost"
                        onClick={() => router.push("/auth/signup")}
                      >
                        Sign up
                      </Button>
                      <Button
                        className="justify-start"
                        variant="ghost"
                        onClick={() => router.push("/auth/signin")}
                      >
                        Log in
                      </Button>
                      <div className="border-t pt-4 space-y-2">
                        <Button 
                          className="justify-start" 
                          variant="ghost"
                          onClick={() => router.push("/help-center")}
                        >
                          <HelpCircle className="w-4 h-4 mr-2" />
                          Help Center
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
