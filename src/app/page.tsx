// src/app/page.tsx (Updated Version)
import Link from 'next/link'; // Import the Link component

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-green-50/50 p-4">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-sm text-center p-8">
        <div className="mb-8">
          <span className="text-6xl" role="img" aria-label="salad emoji">🥗</span>
          <h1 className="text-4xl font-bold text-gray-800 mt-4">Green Fork Kitchen</h1>
          <p className="text-lg text-gray-500 mt-2">Fresh. Fast. Flavorful.</p>
        </div>
        <div>
          {/* This button is now a Link that navigates to the /build/size page */}
          <Link
            href="/build/size"
            className="block w-full bg-orange-500 text-white font-bold text-xl py-4 px-6 rounded-full hover:bg-orange-600 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Building Your Bowl
          </Link>
        </div>
      </div>
      <footer className="mt-8 text-sm text-gray-400">
        <p>&copy; 2025 Green Fork Kitchen</p>
      </footer>
    </main>
  );
}