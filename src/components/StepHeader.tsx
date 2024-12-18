import React from 'react';

interface StepHeaderProps {
  step: number;
  title: string;
  description: string;
  totalSteps?: number;
}

export function StepHeader({
  step,
  title,
  description,
  totalSteps = 5,
}: StepHeaderProps) {
  return (
    <div className="mb-6">
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        ></div>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <span className="flex items-center justify-center w-8 h-8 text-sm font-semibold text-white bg-blue-600 rounded-full">
          {step}
        </span>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}