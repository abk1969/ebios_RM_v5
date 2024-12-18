import React from 'react';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  description: string;
}

export function StepProgress({
  currentStep,
  totalSteps,
  title,
  description,
}: StepProgressProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <span className="text-sm text-gray-500">
          Étape {currentStep} sur {totalSteps}
        </span>
      </div>
      
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
}