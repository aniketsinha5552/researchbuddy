import Link from 'next/link';
// import { useRouter } from 'next/router';

export default function LandingPage() {
//   const router = useRouter()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">

      <main className="flex-1 container mx-auto px-6 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to Research Buddy ✨
        </h1>
        <p className="text-lg md:text-2x mb-6">
          Your AI-powered assistant for all your research needs. Converse with your documents and get relevant answers instantly.
        </p>
        <div>
          <Link href="/login">
            <span className="bg-blue-500 text-white px-6 py-3 rounded text-lg font-semibold">Get Started</span>
          </Link>
        </div>
      </main>
    </div>
  );
}