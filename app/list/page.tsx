// components/DoctorList.tsx
"use client"
import { useEffect, useState } from 'react';

interface Contact {
  phone: string;
  email: string;
  website: string;
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
  education: string;
  awards: string[];
  bio: string;
  location: string;
  contact: Contact;
}

const DoctorList = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/doctors');
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();

        // Transform the data to match the required format
        const transformedDoctors = data.map((doctor: any) => ({
          id: doctor.id,
          name: doctor.name,
          specialty: doctor.specialty,
          image: doctor.image,
          rating: doctor.rating,
          experience: doctor.experience,
          patients: doctor.patients,
          availability: doctor.availability.map((av: { day: string }) => av.day), // Get the day string
          education: doctor.education,
          awards: doctor.awards.map((award: { title: string }) => award.title), // Get the award title
          bio: doctor.bio,
          location: doctor.location,
          contact: {
            phone: doctor.contact.phone,
            email: doctor.contact.email,
            website: doctor.contact.website
          }
        }));

        setDoctors(transformedDoctors);
      } catch (err) {
        const errorMessage = (err as Error).message || 'An unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Doctors List</h1>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            <h2>{doctor.name}</h2>
            <p>Specialty: {doctor.specialty}</p>
            <p>Rating: {doctor.rating}</p>
            <p>Experience: {doctor.experience} years</p>
            <p>Location: {doctor.location}</p>
            <p>Contact: {doctor.contact.phone}, {doctor.contact.email}</p>
            <p>Bio: {doctor.bio}</p>

            <h3>Availability:</h3>
            <ul>
              {doctor.availability.map((day, index) => (
                <li key={index}>{day}</li> // Render each day string
              ))}
            </ul>

            <h3>Awards:</h3>
            <ul>
              {doctor.awards.map((award, index) => (
                <li key={index}>{award}</li> // Render each award title string
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
