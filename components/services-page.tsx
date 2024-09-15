'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Calendar, Bed, Phone, ClipboardList, Ambulance, User, HeartPulse, Activity, CheckCircle, AlertCircle, Clock, Star, Search, Info } from 'lucide-react'

const services = [
  {
    icon: <Calendar className="h-8 w-8 text-blue-500" />,
    title: "Appointment Booking",
    description: "Schedule appointments with top healthcare professionals quickly and easily.",
    features: ["Online booking", "Real-time availability", "Reminders", "Rescheduling options"],
    benefits: ["Save time", "Reduce no-shows", "24/7 booking"],
    pricing: "Free for basic, $9.99/month for premium",
    rating: 4.8,
    category: "booking"
  },
  {
    icon: <Bed className="h-8 w-8 text-green-500" />,
    title: "Hospital Bed Reservation",
    description: "Reserve hospital beds in advance for planned procedures or emergencies.",
    features: ["Real-time bed availability", "Different room types", "Priority booking for emergencies", "Integrated with hospital systems"],
    benefits: ["Ensure availability", "Streamline admissions", "Reduce wait times"],
    pricing: "Pricing varies by hospital",
    rating: 4.7,
    category: "booking"
  },
  {
    icon: <Phone className="h-8 w-8 text-purple-500" />,
    title: "Telemedicine Consultations",
    description: "Consult with doctors remotely through secure video calls.",
    features: ["HD video calls", "Secure messaging", "Digital prescriptions", "Follow-up scheduling"],
    benefits: ["Convenient care", "Reduce travel", "Quick follow-ups"],
    pricing: "$30 per consultation, covered by most insurance plans",
    rating: 4.9,
    category: "consultation"
  },
  {
    icon: <ClipboardList className="h-8 w-8 text-red-500" />,
    title: "Medical Records Management",
    description: "Access and manage your complete medical history in one secure place.",
    features: ["Centralized health records", "Document upload", "Sharing with healthcare providers", "Prescription history"],
    benefits: ["Comprehensive health view", "Improved care coordination", "Patient empowerment"],
    pricing: "Free for basic, $4.99/month for premium storage",
    rating: 4.6,
    category: "records"
  },
  {
    icon: <Ambulance className="h-8 w-8 text-yellow-500" />,
    title: "Emergency Services",
    description: "Quick access to emergency care and ambulance services when you need it most.",
    features: ["One-click emergency button", "Real-time ambulance tracking", "Direct hospital communication", "Priority ER admission"],
    benefits: ["Rapid response", "Improved outcomes", "Peace of mind"],
    pricing: "Free service (standard ambulance fees apply)",
    rating: 4.9,
    category: "emergency"
  },
  {
    icon: <User className="h-8 w-8 text-indigo-500" />,
    title: "Specialist Referrals",
    description: "Get referred to specialists quickly and efficiently through our network.",
    features: ["Wide specialist network", "Quick appointment scheduling", "Medical history sharing", "Follow-up coordination"],
    benefits: ["Faster specialist access", "Seamless care transition", "Reduced paperwork"],
    pricing: "Free for patients (referral fees may apply to specialists)",
    rating: 4.7,
    category: "consultation"
  }
]

export function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = (
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase())) ||
        service.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      const matchesCategory = activeTab === 'all' || service.category === activeTab
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, activeTab])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold text-center text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Our Services
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-center text-gray-500">
            Discover our comprehensive range of healthcare services designed to meet your needs.
          </p>
        </motion.div>

        <div className="mt-10 flex justify-center">
          <div className="relative w-full max-w-xl">
            <Input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 w-full rounded-full border-2 border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-12">
          <TabsList className="flex justify-center space-x-2 mb-8 flex-wrap">
            <TabsTrigger value="all" className="px-4 py-2 rounded-full">All Services</TabsTrigger>
            <TabsTrigger value="booking" className="px-4 py-2 rounded-full">Booking</TabsTrigger>
            <TabsTrigger value="consultation" className="px-4 py-2 rounded-full">Consultation</TabsTrigger>
            <TabsTrigger value="emergency" className="px-4 py-2 rounded-full">Emergency</TabsTrigger>
            <TabsTrigger value="records" className="px-4 py-2 rounded-full">Records</TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + searchTerm}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredServices.map((service, index) => (
                  <ServiceCard key={index} service={service} onSelect={() => setSelectedService(service)} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </Tabs>

        {filteredServices.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-12 text-gray-500"
          >
            No services found matching your search.
          </motion.div>
        )}

        <Dialog open={!!selectedService} onOpenChange={(isOpen) => !isOpen && setSelectedService(null)}>
          <DialogContent>
            {selectedService && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedService.title}</DialogTitle>
                  <DialogDescription>{selectedService.description}</DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <h4 className="text-lg font-semibold">Features</h4>
                  <ul className="list-disc pl-5 mt-2">
                    {selectedService.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <h4 className="text-lg font-semibold">Benefits</h4>
                  <ul className="list-disc pl-5 mt-2">
                    {selectedService.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <h4 className="text-lg font-semibold">Pricing</h4>
                  <p>{selectedService.pricing}</p>
                </div>
                <div className="mt-4 flex items-center">
                  <h4 className="text-lg font-semibold">Rating</h4>
                  <div className="ml-2 flex">
                    {Array.from({ length: Math.floor(selectedService.rating) }).map((_, index) => (
                      <Star key={index} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => setSelectedService(null)}>Close</Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

function ServiceCard({ services, onSelect }) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        {services.icon}
        <Badge>{services.rating}</Badge>
      </CardHeader>
      <CardContent>
        <CardTitle>{services.title}</CardTitle>
        <CardDescription>{services.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button onClick={onSelect}>Learn More</Button>
      </CardFooter>
    </Card>
  )
}
