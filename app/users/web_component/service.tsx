"use client";
import React, { FC } from "react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CalendarIcon,
  BedIcon,
  PhoneIcon,
  ClipboardListIcon,
  AmbulanceIcon,
  UserIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  ClockIcon,
  StarIcon,
  SearchIcon,
  InfoIcon,
} from "lucide-react";

const services = [
  {
    icon: <CalendarIcon className="h-8 w-8 text-blue-500" />,
    title: "Appointment Booking",
    description:
      "Schedule appointments with top healthcare professionals quickly and easily.",
    features: [
      "Online booking",
      "Real-time availability",
      "Reminders",
      "Rescheduling options",
    ],
    benefits: ["Save time", "Reduce no-shows", "24/7 booking"],
    pricing: "Free for basic, $9.99/month for premium",
    rating: 4.8,
    category: "booking",
  },
  {
    icon: <BedIcon className="h-8 w-8 text-green-500" />,
    title: "Hospital Bed Reservation",
    description:
      "Reserve hospital beds in advance for planned procedures or emergencies.",
    features: [
      "Real-time bed availability",
      "Different room types",
      "Priority booking for emergencies",
      "Integrated with hospital systems",
    ],
    benefits: [
      "Ensure availability",
      "Streamline admissions",
      "Reduce wait times",
    ],
    pricing: "Pricing varies by hospital",
    rating: 4.7,
    category: "booking",
  },
  {
    icon: <PhoneIcon className="h-8 w-8 text-purple-500" />,
    title: "Telemedicine Consultations",
    description: "Consult with doctors remotely through secure video calls.",
    features: [
      "HD video calls",
      "Secure messaging",
      "Digital prescriptions",
      "Follow-up scheduling",
    ],
    benefits: ["Convenient care", "Reduce travel", "Quick follow-ups"],
    pricing: "$30 per consultation, covered by most insurance plans",
    rating: 4.9,
    category: "consultation",
  },
  {
    icon: <ClipboardListIcon className="h-8 w-8 text-red-500" />,
    title: "Medical Records Management",
    description:
      "Access and manage your complete medical history in one secure place.",
    features: [
      "Centralized health records",
      "Document upload",
      "Sharing with healthcare providers",
      "Prescription history",
    ],
    benefits: [
      "Comprehensive health view",
      "Improved care coordination",
      "Patient empowerment",
    ],
    pricing: "Free for basic, $4.99/month for premium storage",
    rating: 4.6,
    category: "records",
  },
  {
    icon: <AmbulanceIcon className="h-8 w-8 text-yellow-500" />,
    title: "Emergency Services",
    description:
      "Quick access to emergency care and ambulance services when you need it most.",
    features: [
      "One-click emergency button",
      "Real-time ambulance tracking",
      "Direct hospital communication",
      "Priority ER admission",
    ],
    benefits: ["Rapid response", "Improved outcomes", "Peace of mind"],
    pricing: "Free service (standard ambulance fees apply)",
    rating: 4.9,
    category: "emergency",
  },
  {
    icon: <UserIcon className="h-8 w-8 text-indigo-500" />,
    title: "Specialist Referrals",
    description:
      "Get referred to specialists quickly and efficiently through our network.",
    features: [
      "Wide specialist network",
      "Quick appointment scheduling",
      "Medical history sharing",
      "Follow-up coordination",
    ],
    benefits: [
      "Faster specialist access",
      "Seamless care transition",
      "Reduced paperwork",
    ],
    pricing: "Free for patients (referral fees may apply to specialists)",
    rating: 4.7,
    category: "consultation",
  },
];
export default function Services_plate() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [rating, setRating] = useState<number>(0);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.features.some((feature) =>
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        service.benefits.some((benefit) =>
          benefit.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory =
        activeTab === "all" || service.category === activeTab;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeTab]);

  interface Service {
    icon: JSX.Element;
    title: string;
    description: string;
    features: string[];
    benefits: string[];
    pricing: string;
    rating: number;
    category: string;
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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
            Discover our comprehensive range of healthcare services designed to
            meet your needs.
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
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-12">
          <TabsList className="flex justify-center space-x-2 mb-8 flex-wrap">
            <TabsTrigger value="all" className="px-4 py-2 rounded-full">
              All Services
            </TabsTrigger>
            <TabsTrigger value="booking" className="px-4 py-2 rounded-full">
              Booking
            </TabsTrigger>
            <TabsTrigger
              value="consultation"
              className="px-4 py-2 rounded-full"
            >
              Consultation
            </TabsTrigger>
            <TabsTrigger value="emergency" className="px-4 py-2 rounded-full">
              Emergency
            </TabsTrigger>
            <TabsTrigger value="records" className="px-4 py-2 rounded-full">
              Records
            </TabsTrigger>
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
                  <ServiceCard
                    key={index}
                    service={service}
                    onSelect={() => setSelectedService(service)}
                  />
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
            className="text-center mt-12"
          >
            <p className="text-xl text-gray-600">
              No services found. Please try a different search term.
            </p>
          </motion.div>
        )}

        <Dialog
          open={!!selectedService}
          onOpenChange={() => setSelectedService(null)}
        >
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle className="flex items-center text-2xl">
                {selectedService?.icon}
                <span className="ml-2">{selectedService?.title}</span>
              </DialogTitle>
              <DialogDescription className="text-lg">
                {selectedService?.description}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <h4 className="text-lg font-medium mb-2">Key Features:</h4>
              <ul className="list-disc list-inside space-y-1">
                {selectedService?.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {feature}
                  </li>
                ))}
              </ul>
              <h4 className="text-lg font-medium mt-4 mb-2">Benefits:</h4>
              <ul className="list-disc list-inside space-y-1">
                {selectedService?.benefits.map((benefit, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {benefit}
                  </li>
                ))}
              </ul>
              <h4 className="text-lg font-medium mt-4 mb-2">Pricing:</h4>
              <p className="text-sm text-gray-600">
                {selectedService?.pricing}
              </p>
              <div className="mt-4 flex items-center">
                <span className="text-lg font-medium mr-2">Rating:</span>
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < (selectedService?.rating ?? 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      } fill-current`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {selectedService?.rating ?? 0}/5
                  </span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setSelectedService(null)}>Close</Button>
              <Button variant="default">Book Now</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
const ServiceCard: FC<{
  service: {
    icon: JSX.Element;
    title: string;
    description: string;
    features: string[];
    benefits: string[];
    pricing: string;
    rating: number;
    category: string;
  };
  onSelect: () => void;
}> = ({ service, onSelect }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full flex flex-col overflow-hidden border-2 border-transparent hover:border-blue-500 transition-colors duration-300">
        <CardHeader>
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 mx-auto">
            {service.icon}
          </div>
          <CardTitle className="text-center">{service.title}</CardTitle>
          <CardDescription className="text-center">
            {service.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-4">
            <CheckCircleIcon className="h-4 w-4 text-green-500" />
            <span>Available 24/7</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-4">
            <AlertCircleIcon className="h-4 w-4 text-yellow-500" />
            <span>Priority Support</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-4">
            <ClockIcon className="h-4 w-4 text-blue-500" />
            <span>Quick Setup</span>
          </div>
          <div className="flex items-center justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(service.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                } fill-current`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {service.rating}/5
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button onClick={onSelect} variant="default">
            Learn More
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <InfoIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click for more details about {service.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
