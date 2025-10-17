// src/components/IngredientCard.tsx
"use client";

type IngredientCardProps = {
  name: string;
  isSelected: boolean;
  onSelect: (name: string) => void;
};

export default function IngredientCard({ name, isSelected, onSelect }: IngredientCardProps) {
  return (
    <button
      onClick={() => onSelect(name)}
      className={`bg-white p-4 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all text-left border-4 w-full ${
        isSelected ? 'border-green-500' : 'border-transparent'
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            isSelected ? 'bg-green-500 border-green-500' : 'border-gray-300'
          }`}
        >
          {isSelected && <span className="text-white">✓</span>}
        </div>
      </div>
    </button>
  );
}