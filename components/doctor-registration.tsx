'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { User, Mail, Phone, MapPin, GraduationCap, Award, Calendar, Clock, Upload, Stethoscope } from 'lucide-react'

const specialties = [
  "General Practice",
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Ophthalmology",
  "Dentistry",
  "Pediatrics",
  "Dermatology",
  "Psychiatry",
  "Oncology"
]

export function DoctorRegistrationComponent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    location: '',
    education: '',
    experience: '',
    awards: '',
    availability: '',
    bio: '',
    image: null
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prevData => ({ ...prevData, image: file }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Doctor registration data:', formData)
    toast({
      title: "Registration Submitted",
      description: "Your registration has been successfully submitted for review.",
    })
    // Here you would typically send the registration data to your backend
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <Card className="w-full overflow-hidden shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-bold mb-2">Doctor Registration</CardTitle>
                <CardDescription className="text-blue-100 text-lg">
                  Join our network of healthcare professionals
                </CardDescription>
              </div>
              <Stethoscope className="w-24 h-24 text-blue-100 opacity-50" />
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div className="space-y-4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Full Name
                    </Label>
                    <div className="relative">
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10 pr-4 py-2 w-full rounded-md border-2 border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                        required
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 pr-4 py-2 w-full rounded-md border-2 border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                        required
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone
                    </Label>
                    <div className="relative">
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10 pr-4 py-2 w-full rounded-md border-2 border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                        required
                      />
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialty" className="text-sm font-medium text-gray-700">
                      Specialty
                    </Label>
                    <Select name="specialty" onValueChange={(value) => handleSelectChange("specialty", value)} required>
                      <SelectTrigger className="w-full border-2 border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200">
                        <SelectValue placeholder="Select your specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty} value={specialty}>
                            {specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                      Location
                    </Label>
                    <div className="relative">
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="pl-10 pr-4 py-2 w-full rounded-md border-2 border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                        required
                      />
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                    </div>
                  </div>
                </motion.div>

                <motion.div className="space-y-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  <div className="space-y-2">
                    <Label htmlFor="education" className="text-sm font-medium text-gray-700">
                      Education
                    </Label>
                    <div className="relative">
                      <Input
                        id="education"
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        className="pl-10 pr-4 py-2 w-full rounded-md border-2 border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                        required
                      />
                      <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-sm font-medium text-gray-700">
                      Years of Experience
                    </Label>
                    <div className="relative">
                      <Input
                        id="experience"
                        name="experience"
                        type="number"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="pl-10 pr-4 py-2 w-full rounded-md border-2 border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                        required
                      />
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="awards" className="text-sm font-medium text-gray-700">
                      Awards and Recognitions
                    </Label>
                    <div className="relative">
                      <Input
                        id="awards"
                        name="awards"
                        value={formData.awards}
                        onChange={handleInputChange}
                        className="pl-10 pr-4 py-2 w-full rounded-md border-2 border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                      />
                      <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availability" className="text-sm font-medium text-gray-700">
                      Availability (e.g., Mon, Wed, Fri)
                    </Label>
                    <div className="relative">
                      <Input
                        id="availability"
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        className="pl-10 pr-4 py-2 w-full rounded-md border-2 border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                        required
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image" className="text-sm font-medium text-gray-700">
                      Profile Image
                    </Label>
                    <div className="relative">
                      <Input
                        id="image"
                        name="image"
                        type="file"
                        onChange={handleImageUpload}
                        className="pl-10 pr-4 py-2 w-full rounded-md border-2 border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                        accept="image/*"
                      />
                      <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
                    Professional Bio
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full rounded-md border-2 border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                    rows={4}
                    required
                  />
                </div>
              </motion.div>
            </form>
          </CardContent>
          <CardFooter className="bg-gray-50 px-8 py-4">
            <div className="w-full flex justify-end space-x-4">
              <Button type="button" variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors duration-200">
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                onClick={handleSubmit}
              >
                Submit Registration
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}