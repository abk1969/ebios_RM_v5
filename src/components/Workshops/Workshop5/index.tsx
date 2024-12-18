import React from 'react';
import { BarChart2 } from 'lucide-react';
import { WorkshopLayout } from '../WorkshopLayout';
import { TreatmentOptionsStep } from './steps/TreatmentOptionsStep';
import { SecurityMeasuresStep } from './steps/SecurityMeasuresStep';
import { ResidualRisksStep } from './steps/ResidualRisksStep';
import { MonitoringPlanStep } from './steps/MonitoringPlanStep';
import type { Workshop5Data } from './types';

interface Workshop5Props {
  onComplete: () => void;
  onStepComplete: (step: number) => void;
  onBack: () => void;
}

export function Workshop5({ onComplete, onStepComplete, onBack }: Workshop5Props) {
  const [data, setData] = React.useState<Workshop5Data>({
    treatments: [],
    monitoringPlan: []
  });

  const steps = [
    {
      title: 'Options de traitement',
      component: TreatmentOptionsStep,
      validate: (data: Workshop5Data) => data.treatments.length > 0,
    },
    {
      title: 'Mesures de sécurité',
      component: SecurityMeasuresStep,
      validate: (data: Workshop5Data) => 
        data.treatments.every(t => t.measures.length > 0),
    },
    {
      title: 'Risques résiduels',
      component: ResidualRisksStep,
      validate: (data: Workshop5Data) => 
        data.treatments.every(t => t.residualRisk.justification),
    },
    {
      title: 'Plan de suivi',
      component: MonitoringPlanStep,
      validate: (data: Workshop5Data) => data.monitoringPlan.length > 0,
    }
  ];

  return (
    <WorkshopLayout
      icon={BarChart2}
      title="Traitement du risque"
      description="Définition et suivi de la stratégie de traitement des risques"
      steps={steps}
      currentData={data}
      onDataUpdate={setData}
      onComplete={onComplete}
      onStepComplete={onStepComplete}
      onBack={onBack}
    />
  );
}