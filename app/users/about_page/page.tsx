"use client";

import Header from "../../users/web_component/page";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  CalendarIcon,
  BedIcon,
  PhoneIcon,
  ClipboardListIcon,
  AmbulanceIcon,
  UserIcon,
  HeartPulseIcon,
  ActivityIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  ClockIcon,
  DollarSignIcon,
  StarIcon,
  ShieldIcon,
  TrendingUpIcon,
  ZapIcon,
  AwardIcon,
  ThumbsUpIcon,
  SmileIcon,
  SearchIcon,
  MapPinIcon,
  BellIcon,
  LockIcon,
  BarChartIcon,
  GlobeIcon,
  CreditCardIcon,
  MailIcon,
  PhoneCallIcon,
  MessageCircleIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  InfoIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { start } from "repl";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  pricing: string;
  usageStats: Record<string, string>; // or use an appropriate type
}

interface ServiceCardProps {
  icon: React.ReactNode; // or any specific type depending on what `icon` is
  title: string;
  description: string;
  onLearnMore?: () => void;
  rating?: number; // Adjust the type based on your rating logic
  compareMode?: boolean;
  onCompare?: () => void;
  isCompared?: boolean;
}

interface FeatureCardProps {
  icon: React.ReactNode; // 'React.ReactNode' is used for JSX elements or components
  title: string;
  description: string;
}

function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [compareMode, setCompareMode] = useState(false);
  const [comparedServices, setComparedServices] = useState([]);
  const [progress, setProgress] = useState(13);
  const [activeTab, setActiveTab] = useState("all");
  const [showNotification, setShowNotification] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);

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
      testimonial: {
        text: "MedBooker has revolutionized how I manage my doctor appointments. It's so convenient!",
        author: "Sarah J., Patient",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 4.8,
      usageStats: { bookings: 15000, users: 10000 },
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
      testimonial: {
        text: "Being able to reserve a bed in advance gave me peace of mind before my surgery.",
        author: "Michael R., Patient",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 4.7,
      usageStats: { reservations: 5000, hospitals: 50 },
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
      testimonial: {
        text: "Telemedicine has been a game-changer for managing my chronic condition. I can get expert advice without leaving home.",
        author: "Emily L., Patient",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 4.9,
      usageStats: { consultations: 20000, doctors: 500 },
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
      testimonial: {
        text: "Having all my medical records in one place has made it so much easier to manage my family's healthcare.",
        author: "David K., Patient",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 4.6,
      usageStats: { recordsManaged: 100000, dataShared: "5TB" },
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
      testimonial: {
        text: "The emergency button on MedBooker saved my life when I had a heart attack. The ambulance arrived within minutes.",
        author: "Robert T., Patient",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 4.9,
      usageStats: { emergencyCalls: 1000, livesImpacted: 500 },
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
      testimonial: {
        text: "MedBooker made finding a top cardiologist and scheduling an appointment incredibly easy and fast.",
        author: "Linda M., Patient",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 4.7,
      usageStats: { referrals: 10000, specialists: 1000 },
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setIsScrolled(heroBottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prevIndex) =>
        prevIndex === services.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [services.length]);

  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <main>
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StepCard
                number={1}
                title="Sign Up"
                description="Create your free MedBooker account in minutes."
                icon={<UserIcon className="h-8 w-8 text-blue-500" />}
              />
              <StepCard
                number={2}
                title="Choose a Service"
                description="Select from our range of healthcare services."
                icon={<ClipboardListIcon className="h-8 w-8 text-green-500" />}
              />
              <StepCard
                number={3}
                title="Get Care"
                description="Receive top-quality healthcare on your terms."
                icon={<HeartPulseIcon className="h-8 w-8 text-red-500" />}
              />
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 px-4 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full max-w-3xl mx-auto"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  How do I book an appointment?
                </AccordionTrigger>
                <AccordionContent>
                  Booking an appointment is easy! Simply log in to your
                  AAYU account, select the &quot;Appointment Booking&quot;
                  service, choose your preferred doctor or specialist, and
                  select an available time slot. You&apos;ll receive a
                  confirmation email with all the details.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Is my medical information secure?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely. We take your privacy very seriously. All your
                  medical information is encrypted and stored securely. We
                  comply with HIPAA regulations and use industry-standard
                  security measures to protect your data.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  How does the emergency service work?
                </AccordionTrigger>
                <AccordionContent>
                  Our emergency service provides a one-click button in the app
                  to call for immediate help. It automatically shares your
                  location with emergency services and notifies the nearest
                  hospital. You can also pre-set emergency contacts to be
                  notified.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Can I use AAYU if I don&apos;t have insurance?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, AAYU is available to all users, regardless of
                  insurance status. However, the costs of medical services will
                  vary. We provide transparent pricing information for all
                  services, and many of our basic features are free to use.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section className="py-20 px-4 bg-blue-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Start Your Health Journey Today
            </h2>
            <p className="text-xl mb-8">
              Experience the future of healthcare with AAYU.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Get Started with AAYU
            </Button>
          </div>
        </section>

        <section id="features" className="py-20 px-4 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Choose AAYU?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<HeartPulseIcon className="h-8 w-8 text-red-500" />}
                title="Comprehensive Care"
                description="Access a wide range of healthcare services all in one platform."
              />
              <FeatureCard
                icon={<ActivityIcon className="h-8 w-8 text-green-500" />}
                title="Real-Time Updates"
                description="Get instant notifications and live updates on your healthcare journey."
              />
              <FeatureCard
                icon={<UserIcon className="h-8 w-8 text-blue-500" />}
                title="Patient-Centric"
                description="Our services are designed with your needs and convenience in mind."
              />
              <FeatureCard
                icon={<ShieldIcon className="h-8 w-8 text-purple-500" />}
                title="Secure & Private"
                description="Your health data is protected with state-of-the-art security measures."
              />
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              What Our Users Say
            </h2>
            <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                {services.map((service, index) => (
                  <CarouselItem key={index}>
                    <TestimonialCard
                      testimonial={service.testimonial}
                      rating={service.rating}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        <section className="py-20 px-4 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Our Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ImpactCard
                icon={<TrendingUpIcon className="h-8 w-8 text-green-500" />}
                title="Users Served"
                value="100,000+"
              />
              <ImpactCard
                icon={<ZapIcon className="h-8 w-8 text-yellow-500" />}
                title="Appointments Booked"
                value="500,000+"
              />
              <ImpactCard
                icon={<AwardIcon className="h-8 w-8 text-red-500" />}
                title="Healthcare Providers"
                value="10,000+"
              />
              <ImpactCard
                icon={<ThumbsUpIcon className="h-8 w-8 text-blue-500" />}
                title="User Satisfaction"
                value="98%"
              />
            </div>
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
      <Dialog
        open={!!selectedService}
        onOpenChange={() => setSelectedService(null)}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {selectedService?.icon}
              <span className="ml-2">{selectedService?.title}</span>
            </DialogTitle>
            <DialogDescription>
              {selectedService?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <h4 className="text-sm font-medium mb-2">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1">
              {selectedService?.features.map((feature, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {feature}
                </li>
              ))}
            </ul>
            <h4 className="text-sm font-medium mt-4 mb-2">Benefits:</h4>
            <ul className="list-disc list-inside space-y-1">
              {selectedService?.benefits.map((benefit, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {benefit}
                </li>
              ))}
            </ul>
            <h4 className="text-sm font-medium mt-4 mb-2">Pricing:</h4>
            <p className="text-sm text-gray-600">{selectedService?.pricing}</p>
            <h4 className="text-sm font-medium mt-4 mb-2">Usage Statistics:</h4>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(selectedService?.usageStats || {}).map(
                ([key, value], index) => (
                  <div key={index} className="bg-gray-100 p-2 rounded">
                    <p className="text-xs text-gray-500 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                    <p className="text-lg font-semibold">{value}</p>
                  </div>
                )
              )}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setSelectedService(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4 animate-fade-in-up">
          <BellIcon className="h-6 w-6 text-blue-500" />
          <div>
            <h3 className="font-semibold">New Feature Alert!</h3>
            <p className="text-sm text-gray-600">
              We&apos;ve just launched telemedicine consultations. Try it now!
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowNotification(false)}
          >
            Dismiss
          </Button>
        </div>
      )}
    </div>
  );
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  onLearnMore,
  rating,
  compareMode,
  onCompare,
  isCompared,
}) => {
  return (
    <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          {icon}
        </div>
        <CardTitle className="flex items-center justify-between">
          {title}
          <Badge variant="secondary" className="ml-2">
            New
          </Badge>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <CheckCircleIcon className="h-4 w-4 text-green-500" />
          <span>Available 24/7</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <AlertCircleIcon className="h-4 w-4 text-yellow-500" />
          <span>Priority Support</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <ClockIcon className="h-4 w-4 text-blue-500" />
          <span>Quick Setup</span>
        </div>
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`h-5 w-5 ${
                i < Math.floor(rating ?? 0)
                  ? "text-yellow-400"
                  : "text-gray-300"
              } fill-current`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">{rating ?? 0}/5</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button className="w-full" onClick={onLearnMore}>
          Learn More
        </Button>
        {compareMode && (
          <Button variant="outline" className="w-full" onClick={onCompare}>
            {isCompared ? "Remove from Comparison" : "Add to Comparison"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:bg-gray-50">
      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

const ImpactCard = ({ 
  icon, 
  title, 
  value 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: number | string; // Assuming value could be a number or string
}) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:bg-gray-50">
      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold text-blue-600">{value}</p>
    </div>
  );
}
const StepCard = ({
  number,
  title,
  description,
  icon
}: {
  number: number; // 'number' is expected to be a number
  title: string; // 'title' is a string
  description: string; // 'description' is a string
  icon: React.ReactNode; // 'icon' can be any JSX element
}) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:bg-gray-50">
      <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center mb-4 text-2xl font-bold">
        {number}
      </div>
      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}


const TestimonialCard = ({
  testimonial,
  rating
}: {
  testimonial: { 
    text: string; 
    author: string; 
    avatar?: string; // 'avatar' is optional, so '?' is added
  };
  rating: number; // 'rating' should be a number
}) => {
  return (
    <Card className="bg-white shadow-lg">
      <CardContent className="pt-6">
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`h-5 w-5 ${
                i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
              } fill-current`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
        </div>
        <p className="text-gray-600 mb-4">&quot;{testimonial.text}&quot;</p>
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
            <AvatarFallback>
              {testimonial.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <p className="font-semibold">{testimonial.author}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default ServicesPage;
