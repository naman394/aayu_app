'use client'

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
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [date, setDate] = useState<Date>()

  const filteredDoctors = doctors.filter(doctor => 
    (doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedSpecialty === 'All' || doctor.specialty === specialties.find(s => s.name === selectedSpecialty)?.fullName)
  )

  return (
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
  )
}

export default DoctorsPageComponent