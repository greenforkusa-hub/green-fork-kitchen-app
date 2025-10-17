// src/app/summary/page.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// This is the corrected version of the SummaryContent function.
function SummaryContent() {
  const searchParams = useSearchParams();
  
  // We define the structure of our bowl object for better type safety.
  const bowl: { [key: string]: string | string[] } = {};

  searchParams.forEach((value, key) => {
    // We check if a value has commas to determine if it's an array
    if (value.includes(',')) {
      bowl[key] = value.split(',');
    } else {
      bowl[key] = value;
    }
  });

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-green-50/50 p-4">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-sm text-left p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Your Bowl Summary</h1>
        </div>
        <div className="space-y-4">
          {Object.entries(bowl).map(([key, value]) => (
            <div key={key}>
              <h2 className="font-bold capitalize text-gray-600">{key}</h2>
              <p className="text-gray-900">{Array.isArray(value) ? value.join(', ') : value}</p>
            </div>
          ))}
        </div>
        <button className="w-full mt-8 bg-green-600 text-white font-bold text-lg py-4 rounded-full hover:bg-green-700 transition-colors">
          Submit Order
        </button>
      </div>
    </main>
  );
}

// This part wraps our component in Suspense, which is required for useSearchParams
export default function SummaryPage() {
    return (
        <Suspense fallback={<div>Loading your bowl...</div>}>
            <SummaryContent />
        </Suspense>
    )
}