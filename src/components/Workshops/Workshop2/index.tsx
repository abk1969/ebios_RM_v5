import React from 'react';
import { Target } from 'lucide-react';
import { WorkshopLayout } from '../WorkshopLayout';
import { RiskSourcesStep } from './steps/RiskSourcesStep';
import { ObjectivesStep } from './steps/ObjectivesStep';
import { PairsStep } from './steps/PairsStep';
import type { Workshop2Data } from './types';

interface Workshop2Props {
  onComplete: () => void;
  onStepComplete: (step: number) => void;
  onBack: () => void;
}

export function Workshop2({ onComplete, onStepComplete, onBack }: Workshop2Props) {
  const [data, setData] = React.useState<Workshop2Data>({
    riskSources: [],
    objectives: [],
    pairs: []
  });

  const steps = [
    {
      title: 'Sources de risque',
      component: RiskSourcesStep,
      validate: (data: Workshop2Data) => data.riskSources.length > 0,
    },
    {
      title: 'Objectifs visés',
      component: ObjectivesStep,
      validate: (data: Workshop2Data) => data.objectives.length > 0,
    },
    {
      title: 'Couples sources-objectifs',
      component: PairsStep,
      validate: (data: Workshop2Data) => data.pairs.length > 0,
    }
  ];

  return (
    <WorkshopLayout
      icon={Target}
      title="Sources de risque"
      description="Identification et caractérisation des sources de risque et de leurs objectifs"
      steps={steps}
      currentData={data}
      onDataUpdate={setData}
      onComplete={onComplete}
      onStepComplete={onStepComplete}
      onBack={onBack}
    />
  );
}