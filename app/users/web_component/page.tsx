"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HeartPulseIcon,
  LogIn,
  UserPlus,
  Menu,
  User,
} from "lucide-react";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignOutButton,
} from "@clerk/nextjs";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <HeartPulseIcon className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-800">AAYU</span>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-6">
            <a
              href="./homePage"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Home
            </a>
            <a
              href="./services"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Services
            </a>
            <a
              href="./doctors_page"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Doctors
            </a>
            <a
              href="./about_page"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              About
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignUpButton mode="modal" afterSignUpUrl="./users/homePage">
                <Button variant="outline" className="flex items-center space-x-2">
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Button>
              </SignUpButton>
              <SignInButton mode="modal" >
                <Button className="flex items-center space-x-2">
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn afterSignInUrl="./users/homePage">
              <UserButton afterSignOutUrl="./users/homePage" />
            </SignedIn>
          </div>
        </div>

        <Button
          variant="ghost"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4">
          <nav className="flex flex-col space-y-4">
            <a
              href="./homePage"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Home
            </a>
            <a
              href="./services"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Services
            </a>
            <a
              href="./doctors_page"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Doctors
            </a>
            <a
              href="./about_page"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              About
            </a>
          </nav>
          <div className="mt-4 flex flex-col space-y-4">
            <SignedOut>
              <SignUpButton mode="modal" afterSignUpUrl="@/users/homePage">
                <Button
                  variant="outline"
                  className="flex items-center justify-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Button>
              </SignUpButton>
              <SignInButton mode="modal" afterSignInUrl="@/users/homePage">
                <Button className="flex items-center justify-center space-x-2">
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Button>
              </SignInButton>
            </SignedOut>

            {/* <SignedIn>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-full">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Appointments</DropdownMenuItem>
                  <DropdownMenuItem>Medical Records</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>
                    <SignOutButton afterSignOutUrl="@/users/homePage" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SignedIn> */}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
