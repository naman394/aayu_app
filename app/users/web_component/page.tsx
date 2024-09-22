"use client"; // Ensure this is at the top of your file

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { HeartPulseIcon, LogIn, UserPlus, Menu } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useClerk,
} from "@clerk/nextjs";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { user } = useClerk(); // Get the user object from Clerk

  // Function to handle redirection
  const handleRedirection = () => {
    router.push("/users/homePage");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <HeartPulseIcon className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-800">AAYU</span>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-6">
            <a href="./homePage" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
            <a href="./services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</a>
            <a href="./doctors_page" className="text-gray-600 hover:text-blue-600 transition-colors">Doctors</a>
            <a href="./about_page" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
          </nav>

          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button
                  className="flex items-center space-x-2"
                  onClick={() => handleRedirection()} // Redirect after sign-in
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/users/homePage" />
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
            <a href="./homePage" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
            <a href="./services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</a>
            <a href="./doctors_page" className="text-gray-600 hover:text-blue-600 transition-colors">Doctors</a>
            <a href="./about_page" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
          </nav>
          <div className="mt-4 flex flex-col space-y-4">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button
                  variant="outline"
                  className="flex items-center justify-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button
                  className="flex items-center justify-center space-x-2"
                  onClick={() => handleRedirection()} // Redirect after sign-in
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;