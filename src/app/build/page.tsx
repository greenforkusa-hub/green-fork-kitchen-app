// src/app/build/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { menuData, steps } from '@/lib/data';
import IngredientCard from '@/components/IngredientCard';

// We define the "shape" of our bowl state here for TypeScript
interface BowlState {
  size: string | null;
  base: string | null;
  veggies: string[];
  protein: string | null;
  boosts: string[];
  sauce: string | null;
  toppings: string[];
}

export default function BuildPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [bowl, setBowl] = useState<BowlState>({ // We use our new BowlState type here
    size: null,
    base: null,
    veggies: [],
    protein: null,
    boosts: [],
    sauce: null,
    toppings: [],
});

  const currentStepKey = steps[currentStep].toLowerCase() as keyof BowlState;
  const options = menuData[currentStepKey as keyof typeof menuData] || [];

  const handleSelect = (name: string) => {
    setBowl(prevBowl => {
        const currentSelection = prevBowl[currentStepKey];
        if (Array.isArray(currentSelection)) {
            const newSelection = currentSelection.includes(name)
                ? currentSelection.filter((item: string) => item !== name)
                : [...currentSelection, name];
            return { ...prevBowl, [currentStepKey]: newSelection };
        } else {
            return { ...prevBowl, [currentStepKey]: name };
        }
    });
};

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const finalBowl: { [key: string]: any } = {};
      for (const key in bowl) {
        const value = bowl[key as keyof BowlState];
        if (Array.isArray(value) && value.length > 0) {
            finalBowl[key] = value.join(',');
        } else if (value && !Array.isArray(value)) {
            finalBowl[key] = value;
        }
      }
      const query = new URLSearchParams(finalBowl).toString();
      router.push(`/summary?${query}`);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isSelected = (name: string) => {
    const selection = bowl[currentStepKey];
    if (Array.isArray(selection)) {
        return selection.includes(name);
    }
    return selection === name;
  }

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
              isSelected={isSelected(name)}
              onSelect={handleSelect}
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
