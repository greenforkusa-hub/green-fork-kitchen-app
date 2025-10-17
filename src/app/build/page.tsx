// src/app/build/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { menuData, steps } from '@/lib/data';
import IngredientCard from '@/components/IngredientCard';

export default function BuildPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [bowl, setBowl] = useState<any>({
    size: null,
    base: null,
    veggies: [],
    protein: null,
    boosts: [],
    sauce: null,
    toppings: [],
  });

  const currentStepKey = steps[currentStep].toLowerCase();
  const options = menuData[currentStepKey as keyof typeof menuData] || [];
  const isMultiSelect = ['veggies', 'boosts', 'toppings'].includes(currentStepKey);

  const handleSelect = (name: string) => {
    if (isMultiSelect) {
      const currentSelection = bowl[currentStepKey];
      const newSelection = currentSelection.includes(name)
        ? currentSelection.filter((item: string) => item !== name)
        : [...currentSelection, name];
      setBowl({ ...bowl, [currentStepKey]: newSelection });
    } else {
      setBowl({ ...bowl, [currentStepKey]: name });
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to summary page, passing the bowl data
      const query = new URLSearchParams(bowl).toString();
      router.push(`/summary?${query}`);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-green-50/50 p-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Step {currentStep + 1} of {steps.length}: Choose a {steps[currentStep]}
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((name) => (
            <IngredientCard
              key={name}
              name={name}
              isSelected={isMultiSelect ? bowl[currentStepKey].includes(name) : bowl[currentStepKey] === name}
              onSelect={handleSelect}
              isMultiSelect={isMultiSelect}
            />
          ))}
        </div>
        <div className="flex justify-between mt-8">
            <button onClick={prevStep} disabled={currentStep === 0} className="bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-full disabled:opacity-50">Back</button>
            <button onClick={nextStep} className="bg-orange-500 text-white font-bold py-3 px-6 rounded-full">
                {currentStep === steps.length - 1 ? 'Finish & See Summary' : 'Next Step'}
            </button>
        </div>
      </div>
    </main>
  );
}
