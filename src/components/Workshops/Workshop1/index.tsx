import React from 'react';
import { Shield } from 'lucide-react';
import { WorkshopLayout } from '../WorkshopLayout';
import { BusinessValuesStep } from './steps/BusinessValuesStep';
import { SecurityCriteriaStep } from './steps/SecurityCriteriaStep';
import { SecurityNeedsStep } from './steps/SecurityNeedsStep';
import { ScopeStep } from './steps/ScopeStep';
import { AssetsStep } from './steps/AssetsStep';
import type { Workshop1Data } from './types';

interface Workshop1Props {
  onComplete: () => void;
  onStepComplete: (step: number) => void;
}

export function Workshop1({ onComplete, onStepComplete }: Workshop1Props) {
  const [data, setData] = React.useState<Workshop1Data>({
    businessValues: [],
    securityCriteria: [],
    securityNeeds: [],
    scope: {
      description: '',
      constraints: [],
      assumptions: [],
    },
    assets: [],
  });

  const steps = [
    {
      title: 'Valeurs métier',
      component: BusinessValuesStep,
      validate: (data: Workshop1Data) => data.businessValues.length > 0,
    },
    {
      title: 'Critères de sécurité',
      component: SecurityCriteriaStep,
      validate: (data: Workshop1Data) => data.securityCriteria.length > 0,
    },
    {
      title: 'Besoins de sécurité',
      component: SecurityNeedsStep,
      validate: (data: Workshop1Data) => data.securityNeeds.length > 0,
    },
    {
      title: 'Périmètre',
      component: ScopeStep,
      validate: (data: Workshop1Data) => 
        data.scope.description.length > 0 && 
        data.scope.assumptions.length > 0,
    },
    {
      title: 'Biens supports',
      component: AssetsStep,
      validate: (data: Workshop1Data) => data.assets.length > 0,
    },
  ];

  return (
    <WorkshopLayout
      icon={Shield}
      title="Socle de sécurité"
      description="Définition du contexte et des objectifs de sécurité"
      steps={steps}
      currentData={data}
      onDataUpdate={setData}
      onComplete={onComplete}
      onStepComplete={onStepComplete}
    />
  );
}