// app/client-page.tsx
'use client'; // Ensure this is at the top

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ClientPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/users/homePage');
  }, [router]);

  return null; // Render nothing or a loading spinner
};

export default ClientPage;
