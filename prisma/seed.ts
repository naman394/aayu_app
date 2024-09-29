const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
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

async function main() {
  for (const doctorData of doctors) {
    // Create the contact
    const contact = await prisma.contact.create({
      data: {
        phone: doctorData.contact.phone,
        email: doctorData.contact.email,
        website: doctorData.contact.website,
      },
    });

    // Create the doctor
    const doctor = await prisma.doctor.create({
      data: {
        name: doctorData.name,
        specialty: doctorData.specialty,
        image: doctorData.image,
        rating: doctorData.rating,
        experience: doctorData.experience,
        patients: doctorData.patients,
        education: doctorData.education,
        bio: doctorData.bio,
        location: doctorData.location,
        contactId: contact.id, // Link the contact
      },
    });

    // Create availability for the doctor
    for (const day of doctorData.availability) {
      await prisma.availability.create({
        data: {
          day,
          doctorId: doctor.id, // Link the created doctor
        },
      });
    }

    // Create awards for the doctor
    for (const title of doctorData.awards) {
      await prisma.award.create({
        data: {
          title,
          doctorId: doctor.id, // Link the created doctor
        },
      });
    }

    console.log(`Created doctor: ${doctor.name}`);
  }
}

main()
  .then(() => {
    console.log('Data successfully seeded!');
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
