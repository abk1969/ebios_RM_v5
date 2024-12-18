import React from 'react';
import { GitBranch } from 'lucide-react';
import { WorkshopLayout } from '../WorkshopLayout';
import { ScenariosStep } from './steps/ScenariosStep';
import { SeverityStep } from './steps/SeverityStep';
import { LikelihoodStep } from './steps/LikelihoodStep';
import type { Workshop3Data } from './types';

interface Workshop3Props {
  onComplete: () => void;
  onStepComplete: (step: number) => void;
  onBack: () => void;
}

export function Workshop3({ onComplete, onStepComplete, onBack }: Workshop3Props) {
  const [data, setData] = React.useState<Workshop3Data>({
    scenarios: []
  });

  const steps = [
    {
      title: 'Scénarios stratégiques',
      component: ScenariosStep,
      validate: (data: Workshop3Data) => data.scenarios.length > 0,
    },
    {
      title: 'Évaluation de la gravité',
      component: SeverityStep,
      validate: (data: Workshop3Data) => 
        data.scenarios.every(s => s.severity > 0 && s.justification),
    },
    {
      title: 'Évaluation de la vraisemblance',
      component: LikelihoodStep,
      validate: (data: Workshop3Data) => 
        data.scenarios.every(s => s.likelihood > 0 && s.controls.length > 0),
    }
  ];

  return (
    <WorkshopLayout
      icon={GitBranch}
      title="Scénarios stratégiques"
      description="Construction et évaluation des scénarios stratégiques"
      steps={steps}
      currentData={data}
      onDataUpdate={setData}
      onComplete={onComplete}
      onStepComplete={onStepComplete}
      onBack={onBack}
    />
  );
}