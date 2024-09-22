'use client'
import Header from '../../users/web_component/page'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Search, Star, Clock, MapPin, Phone, Mail, Globe, Award, ThumbsUp, Users, Heart, Stethoscope, Activity, Brain, Bone, Eye, Smile, Baby, ChevronLeft, ChevronRight } from 'lucide-react'





const specialties = [
  { name: 'All', icon: <Users className="h-4 w-4" /> },
  { name: 'GP', icon: <Stethoscope className="h-4 w-4" />, fullName: 'General Practice' },
  { name: 'Cardio', icon: <Heart className="h-4 w-4" />, fullName: 'Cardiology' },
  { name: 'Neuro', icon: <Brain className="h-4 w-4" />, fullName: 'Neurology' },
  { name: 'Ortho', icon: <Bone className="h-4 w-4" />, fullName: 'Orthopedics' },
  { name: 'Ophth', icon: <Eye className="h-4 w-4" />, fullName: 'Ophthalmology' },
  { name: 'Dental', icon: <Smile className="h-4 w-4" />, fullName: 'Dentistry' },
  { name: 'Pedia', icon: <Baby className="h-4 w-4" />, fullName: 'Pediatrics' },
]

const doctors = [
  {
    id: 1,
    name: "Dr. Emily Johnson",
    specialty: "Cardiology",
    image: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.9,
    experience: 15,
    patients: 10000,
    availability: ["Mon", "Wed", "Fri"],
    education: "Harvard Medical School",
    awards: ["Best Cardiologist 2022", "Research Excellence Award"],
    bio: "Dr. Emily Johnson is a renowned cardiologist with over 15 years of experience. She specializes in interventional cardiology and has performed over 5,000 successful procedures.",
    location: "New York, NY",
    contact: {
      phone: "+1 (555) 123-4567",
      email: "dr.johnson@medbooker.com",
      website: "www.drjohnson.com"
    }
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    image: "https://st2.depositphotos.com/1930953/5814/i/450/depositphotos_58148181-stock-photo-asian-doctor.jpg",
    rating: 4.8,
    experience: 12,
    patients: 8000,
    availability: ["Tue", "Thu", "Sat"],
    education: "Stanford University School of Medicine",
    awards: ["Neurological Breakthrough Award", "Patient's Choice Award"],
    bio: "Dr. Michael Chen is a leading neurologist specializing in stroke prevention and treatment. His research has been published in top medical journals worldwide.",
    location: "San Francisco, CA",
    contact: {
      phone: "+1 (555) 987-6543",
      email: "dr.chen@medbooker.com",
      website: "www.drchen.com"
    }
  },
  {
    id: 3,
    name: "Dr. Sarah Patel",
    specialty: "Pediatrics",
    image: "https://img.freepik.com/premium-photo/medical-concept-asian-beautiful-female-doctor-white-coat-with-glasses-waist-high-medical-student-female-hospital-worker-looks-into-camera-smiles-studio-blue-background_185696-615.jpg",
    rating: 4.9,
    experience: 10,
    patients: 12000,
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    education: "Johns Hopkins University School of Medicine",
    awards: ["Best Pediatrician 2023", "Community Service Award"],
    bio: "Dr. Sarah Patel is a compassionate pediatrician loved by both children and parents. She specializes in early childhood development and preventive care.",
    location: "Chicago, IL",
    contact: {
      phone: "+1 (555) 246-8135",
      email: "dr.patel@medbooker.com",
      website: "www.drpatel.com"
    }
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    image: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9jdG9yfGVufDB8fDB8fHww",
    rating: 4.7,
    experience: 18,
    patients: 15000,
    availability: ["Mon", "Wed", "Fri"],
    education: "Yale School of Medicine",
    awards: ["Orthopedic Surgeon of the Year", "Sports Medicine Excellence Award"],
    bio: "Dr. James Wilson is a top orthopedic surgeon specializing in sports medicine. He has treated numerous professional athletes and is known for his minimally invasive techniques.",
    location: "Los Angeles, CA",
    contact: {
      phone: "+1 (555) 369-2580",
      email: "dr.wilson@medbooker.com",
      website: "www.drwilson.com"
    }
  },
  {
    id: 5,
    name: "Dr. Olivia Martinez",
    specialty: "Dentistry",
    image: "https://www.shutterstock.com/image-photo/profile-photo-attractive-family-doc-600nw-1724693776.jpg",
    rating: 4.9,
    experience: 8,
    patients: 6000,
    availability: ["Tue", "Thu", "Sat"],
    education: "University of California, San Francisco School of Dentistry",
    awards: ["Best Cosmetic Dentist 2023", "Dental Innovation Award"],
    bio: "Dr. Olivia Martinez is a skilled dentist known for her gentle approach and expertise in cosmetic dentistry. She uses the latest technology to ensure painless and effective treatments.",
    location: "Miami, FL",
    contact: {
      phone: "+1 (555) 147-2589",
      email: "dr.martinez@medbooker.com",
      website: "www.drmartinez.com"
    }
  },
  {
    id: 6,
    name: "Dr. Krishank Mishra",
    specialty: "Dentistry",
    image: "https://media.istockphoto.com/id/179011088/photo/indian-doctor.jpg?s=612x612&w=0&k=20&c=EwRn1EWy79prCtdo8yHM6hvCVVcaKTznVBpVURPJxt4=",
    rating: 4.9,
    experience: 8,
    patients: 6000,
    availability: ["Tue", "Thu", "Sat"],
    education: "University of California, San Francisco School of Dentistry",
    awards: ["Best Cosmetic Dentist 2023", "Dental Innovation Award"],
    bio: "Dr. Olivia Martinez is a skilled dentist known for her gentle approach and expertise in cosmetic dentistry. She uses the latest technology to ensure painless and effective treatments.",
    location: "Miami, FL",
    contact: {
      phone: "+1 (555) 147-2589",
      email: "dr.martinez@medbooker.com",
      website: "www.drmartinez.com"
    }
  }
]


function DoctorsPageComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('All')


  const [date, setDate] = useState<Date>()

  const filteredDoctors = doctors.filter(doctor => 
    (doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedSpecialty === 'All' || doctor.specialty === specialties.find(s => s.name === selectedSpecialty)?.fullName)
  )
  const [selectedDoctor, setSelectedDoctor] = useState<{
    id: number;
    name: string;
    specialty: string;
    image: string;
    rating: number;
    experience: number;
    patients: number;
    availability: string[];
    education: string;
    awards: string[];
    bio: string;
    location: string;
    contact: {
      phone: string;
      email: string;
      website?: string; 
    };
  } | null>(null); // Add inline typing for the selectedDoctor state

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Find Your Perfect Doctor
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Discover top-rated healthcare professionals and book your appointment today.
          </p>
        </motion.div>

        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="w-full sm:w-1/2 relative">
            <Input
              type="text"
              placeholder="Search doctors or specialties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-full border-2 border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="w-full sm:w-auto">
            <Tabs value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <TabsList className="grid grid-cols-4 sm:flex sm:space-x-2">
                {specialties.map((specialty) => (
                  <TabsTrigger
                    key={specialty.name}
                    value={specialty.name}
                    className="px-3 py-1.5 text-xs sm:text-sm font-medium transition-all data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full"
                  >
                    <div className="flex items-center space-x-1">
                      {specialty.icon}
                      <span className="hidden sm:inline">{specialty.name}</span>
                      <span className="sm:hidden">{specialty.name.slice(0, 1)}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <AnimatePresence>
          <motion.div
            key={selectedSpecialty + searchTerm}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <h3 className="text-xl font-semibold text-white">{doctor.name}</h3>
                        <p className="text-sm text-gray-200">{doctor.specialty}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <Star className="h-5 w-5 text-yellow-400 mr-1" />
                      <span className="font-semibold">{doctor.rating}</span>
                      <span className="text-gray-500 text-sm ml-2">({doctor.patients}+ patients)</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-blue-500 mr-2" />
                      <span>{doctor.experience} years experience</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <MapPin className="h-5 w-5 text-red-500 mr-2" />
                      <span>{doctor.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {doctor.availability.map((day) => (
                        <Badge key={day} variant="secondary">{day}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 bg-gray-50 flex justify-between items-center">
                    <Button variant="outline" onClick={() => setSelectedDoctor(doctor)}>View Profile</Button>
                    <Button>Book Appointment</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredDoctors.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-xl text-gray-600">No doctors found. Please try a different search term or specialty.</p>
          </motion.div>
        )}

        <Dialog open={!!selectedDoctor} onOpenChange={() => setSelectedDoctor(null)}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center space-x-2">
                <span>{selectedDoctor?.name}</span>
                <Badge variant="secondary">{selectedDoctor?.specialty}</Badge>
              </DialogTitle>
              <DialogDescription>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>{selectedDoctor?.rating} Rating</span>
                  <span>•</span>
                  <span>{selectedDoctor?.experience} years experience</span>
                  <span>•</span>
                  <span>{selectedDoctor?.patients}+ patients</span>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <img
                  src={selectedDoctor?.image}
                  alt={selectedDoctor?.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="mt-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span>{selectedDoctor?.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span>{selectedDoctor?.contact.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span>{selectedDoctor?.contact.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-gray-400" />
                    <span>{selectedDoctor?.contact.website}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">About</h4>
                  <p className="text-sm text-gray-600">{selectedDoctor?.bio}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Education</h4>
                  <p className="text-sm text-gray-600">{selectedDoctor?.education}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Awards</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {selectedDoctor?.awards.map((award, index) => (
                      <li key={index}>{award}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Availability</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDoctor?.availability.map((day) => (
                      <Badge key={day} variant="outline">{day}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-between items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Button onClick={() => setSelectedDoctor(null)}>Book Appointment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
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
    </>
  )
  
}

export default DoctorsPageComponent
