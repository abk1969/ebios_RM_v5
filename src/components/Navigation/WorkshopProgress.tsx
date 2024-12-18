import React from 'react';
import type { Workshop } from '../../types/ebios';

interface WorkshopProgressProps {
  workshop: Workshop | undefined;
  isStepComplete: (workshopId: number, stepIndex: number) => boolean;
  description: string;
}

export function WorkshopProgress({
  workshop,
  isStepComplete,
  description,
}: WorkshopProgressProps) {
  if (!workshop) return null;

  const completedSteps = workshop.steps.filter((_, index) => 
    isStepComplete(workshop.id, index)
  ).length;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{workshop.title}</h2>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className="text-sm text-gray-500">
          <span className="font-medium">{completedSteps}</span>
          <span> / </span>
          <span>{workshop.steps.length} étapes</span>
        </div>
      </div>

      <div className="space-y-4">
        {workshop.steps.map((step, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`
              w-6 h-6 rounded-full flex items-center justify-center
              ${isStepComplete(workshop.id, index)
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-500'}
            `}>
              {index + 1}
            </div>
            <span className={`
              text-sm
              ${isStepComplete(workshop.id, index)
                ? 'text-gray-900 font-medium'
                : 'text-gray-600'}
            `}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}