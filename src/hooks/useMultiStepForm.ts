import { useState } from 'react';
import type { Asset, Threat, Scenario, Risk } from '../types';

interface EbiosFormData {
  context: string;
  assets: Asset[];
  threats: Threat[];
  scenarios: Scenario[];
  risks: Risk[];
}

interface Step {
  title: string;
  component: React.ComponentType<any>;
}

export function useMultiStepForm(steps: Step[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepsValidity, setStepsValidity] = useState<boolean[]>(
    Array(steps.length).fill(false)
  );
  const [data, setData] = useState<EbiosFormData>({
    context: '',
    assets: [],
    threats: [],
    scenarios: [],
    risks: [],
  });

  const CurrentStepComponent = steps[currentStepIndex].component;

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const validateStep = (stepIndex: number) => {
    const currentKey = Object.keys(data)[stepIndex] as keyof EbiosFormData;
    const currentData = data[currentKey];
    
    if (currentKey === 'context') {
      return typeof currentData === 'string' && currentData.trim().length >= 20;
    }
    
    if (Array.isArray(currentData)) {
      return currentData.length > 0;
    }
    
    return false;
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1 && validateStep(currentStepIndex)) {
      setStepsValidity(prev => {
        const next = [...prev];
        next[currentStepIndex] = true;
        return next;
      });
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const goToStep = (index: number) => {
    if (index >= 0 && index < steps.length && (index === 0 || stepsValidity[index - 1])) {
      setCurrentStepIndex(index);
    }
  };

  const updateData = (newData: Partial<EbiosFormData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  return {
    CurrentStepComponent,
    steps,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    data,
    updateData,
    nextStep,
    prevStep,
    validateStep,
    goToStep,
  };
}