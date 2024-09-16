"use client";
import Link from "next/link";


import Header from "../../users/web_component/page";
import doctorsData from "../../data/doctors.json";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  CalendarIcon,
  BedIcon,
  PhoneIcon,
  
} from "lucide-react";

function HomePage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("signup");
  type Doctor = {
    id: number;
    name: string;
    specialty: string;
    avatarUrl: string;
    reviews: number;
    rating: number;
  };
  const [visibleDoctors, setVisibleDoctors] = useState<number>(3); // Show 3 doctors initially

  // Handle the booking appointment logic
  const handleBookAppointment = () => {
    const appointmentDate = new Date();
    appointmentDate.setDate(appointmentDate.getDate() + 2); // Set date to 2 days from now
    alert(
      `Appointment has been booked for ${appointmentDate.toLocaleString()}`
    );
  };

  // Handle showing all doctors
  const handleViewAll = () => {
    setVisibleDoctors(doctorsData.length); // Show all doctors
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Your Health, Our Priority
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Book appointments, reserve hospital beds, and access your medical
            history - all in one place. Experience healthcare made simple.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
            >
              <Link href="/users/services" passHref>
                Get Started
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="/users/about_page" passHref>
                Learn More
              </Link>
            </Button>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Quick Access
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <CalendarIcon className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Book Appointment
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Schedule a visit with top healthcare professionals.
                  </p>
                  <Button variant="outline" className="w-full">
                    <Link href="/users/services" passHref>
                      Book Now
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <BedIcon className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Reserve Hospital Bed
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Secure a hospital bed for planned procedures or emergencies.
                  </p>
                  <Button variant="outline" className="w-full">
                    <Link href="/users/services" passHref>
                      Check Availability
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <PhoneIcon className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Telemedicine</h3>
                  <p className="text-gray-600 mb-4">
                    Consult with doctors remotely from the comfort of your home.
                  </p>
                  <Button variant="outline" className="w-full">
                    <Link href="/users/services" passHref>
                      Start Consultation
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Find Doctors
          </h2>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
            <Input
              placeholder="Search by name, specialty, or location"
              className="flex-grow"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctorsData.slice(0, visibleDoctors).map((doctor) => (
              <Card key={doctor.id}>
                <CardContent className="p-6 flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={doctor.avatarUrl}
                      alt={`Doctor ${doctor.name}`}
                    />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {doctor.name}
                    </h3>
                    <p className="text-gray-600 mb-2">{doctor.specialty}</p>
                    <div className="flex items-center text-yellow-400 mb-2">
                      {[...Array(doctor.rating)].map((_, index) => (
                        <svg
                          key={index}
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                      <span className="text-gray-600 ml-2">
                        ({doctor.reviews} reviews)
                      </span>
                    </div>
                    <Button
                      onClick={handleBookAppointment}
                      variant="outline"
                      className="w-full"
                    >
                      Book Appointment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {visibleDoctors < doctorsData.length && (
            <div className="text-center mt-8">
              <Button onClick={handleViewAll} variant="outline">
                View All Doctors
              </Button>
            </div>
          )}
        </section>
    
        <section className="mb-16">
          <div className="bg-blue-600 text-white rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">
                Ready to take control of your health?
              </h2>
              <p className="text-xl">
                Join thousands of users who trust MedBooker for their healthcare
                needs.
              </p>
            </div>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Sign Up Now
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">
                AAYU is revolutionizing healthcare access with our
                innovative booking platform.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="./homePage"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="./services"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="./doctors"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Doctors
                  </a>
                </li>
                <li>
                  <a
                    href="./about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400">
                NEW DELHI
                <br />
                INDIA
              </p>
              <p className="text-gray-400 mt-2">contact@AAYU.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400">
              &copy; 2024 AAYU. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
