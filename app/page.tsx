// Example in a Next.js page
export async function getServerSideProps() {
  console.log('Clerk Frontend API:', process.env.NEXT_PUBLIC_CLERK_FRONTEND_API);
  return { props: {} };
}

export default function Page() {
  return <div>Check the server-side logs for the environment variable.</div>;
}
