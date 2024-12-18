import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { WorkshopLayout } from '../WorkshopLayout';
import { DecompositionStep } from './steps/DecompositionStep';
import { ControlsStep } from './steps/ControlsStep';
import { EvaluationStep } from './steps/EvaluationStep';
import { SynthesisStep } from './steps/SynthesisStep';
import type { Workshop4Data } from './types';

interface Workshop4Props {
  onComplete: () => void;
  onStepComplete: (step: number) => void;
  onBack: () => void;
}

export function Workshop4({ onComplete, onStepComplete, onBack }: Workshop4Props) {
  const [data, setData] = React.useState<Workshop4Data>({
    scenarios: []
  });

  const steps = [
    {
      title: 'Décomposition des scénarios',
      component: DecompositionStep,
      validate: (data: Workshop4Data) => data.scenarios.length > 0,
    },
    {
      title: 'Mesures existantes',
      component: ControlsStep,
      validate: (data: Workshop4Data) => 
        data.scenarios.every(s => s.existingControls.length > 0),
    },
    {
      title: 'Évaluation technique',
      component: EvaluationStep,
      validate: (data: Workshop4Data) => 
        data.scenarios.every(s => s.probability > 0 && s.impact > 0 && s.justification),
    },
    {
      title: 'Synthèse et cartographie',
      component: SynthesisStep,
      validate: () => true, // La synthèse est toujours valide
    }
  ];

  return (
    <WorkshopLayout
      icon={AlertTriangle}
      title="Scénarios opérationnels"
      description="Construction et évaluation des scénarios opérationnels"
      steps={steps}
      currentData={data}
      onDataUpdate={setData}
      onComplete={onComplete}
      onStepComplete={onStepComplete}
      onBack={onBack}
    />
  );
}