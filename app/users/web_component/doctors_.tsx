'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Star, Clock, MapPin, Phone, Mail, Globe, Users, Heart, Stethoscope, Brain, Bone, Eye, Smile, Baby } from 'lucide-react'

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
    image: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=2940&auto=format&fit=crop",
    rating: 4.9,
    experience: 15,
    patients: 10000,
    availability: ["Mon", "Wed", "Fri"],
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
    location: "San Francisco, CA",
    contact: {
      phone: "+1 (555) 987-6543",
      email: "dr.chen@medbooker.com",
      website: "www.drchen.com"
    }
  },
  // Add more doctors as necessary
]

interface Contact {
  phone: string;
  email: string;
  website?: string;
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  experience: number;
  patients: number;
  availability: string[];
  location: string;
  contact: Contact;
}

export default function DoctorsPageComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const filteredDoctors = doctors.filter(doctor => 
    (doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedSpecialty === 'All' || doctor.specialty === specialties.find(s => s.name === selectedSpecialty)?.fullName)
  );

  const handleBookAppointment = () => {
    alert(`Appointment has been booked with ${selectedDoctor?.name}`);
  };

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
                    <Button onClick={() => setSelectedDoctor(doctor)} variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <Dialog open={selectedDoctor !== null} onOpenChange={() => setSelectedDoctor(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedDoctor?.name}</DialogTitle>
              <DialogDescription>
                {selectedDoctor?.specialty} with {selectedDoctor?.experience} years of experience.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span className="ml-2">{selectedDoctor?.contact.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span className="ml-2">{selectedDoctor?.contact.email}</span>
                  </div>
                  {selectedDoctor?.contact.website && (
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 text-gray-400" />
                      <a
                        href={`https://${selectedDoctor?.contact.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-500 hover:underline"
                      >
                        {selectedDoctor?.contact.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Availability</h2>
                <p>{selectedDoctor?.availability.join(', ')}</p>
              </div>
            </div>
            <DialogFooter className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setSelectedDoctor(null)}>
                Close
              </Button>
              <Button onClick={handleBookAppointment}>
                Book Appointment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
