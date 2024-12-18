import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '../Button';

interface WorkshopLayoutProps<T> {
  icon: LucideIcon;
  title: string;
  description: string;
  steps: {
    title: string;
    component: React.ComponentType<any>;
    validate: (data: T) => boolean;
  }[];
  currentData: T;
  onDataUpdate: (data: T) => void;
  onComplete: () => void;
  onStepComplete: (step: number) => void;
}

export function WorkshopLayout<T>({
  icon: Icon,
  title,
  description,
  steps,
  currentData,
  onDataUpdate,
  onComplete,
  onStepComplete,
}: WorkshopLayoutProps<T>) {
  const [currentStep, setCurrentStep] = React.useState(0);

  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = () => {
    if (steps[currentStep].validate(currentData)) {
      onStepComplete(currentStep);
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        onComplete();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <CurrentStepComponent
          data={currentData}
          onUpdate={onDataUpdate}
        />
      </div>

      <div className="flex justify-between mt-8">
        {currentStep > 0 && (
          <Button type="button" variant="secondary" onClick={handleBack}>
            Retour
          </Button>
        )}
        <Button
          type="button"
          onClick={handleNext}
          disabled={!steps[currentStep].validate(currentData)}
        >
          {currentStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
        </Button>
      </div>
    </div>
  );
}