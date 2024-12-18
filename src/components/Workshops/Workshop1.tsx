import React, { useState } from 'react';
import { TextArea } from '../TextArea';
import { Button } from '../Button';
import { Shield, Building, Target, Server } from 'lucide-react';
import type { EbiosContext } from '../../types/ebios';

interface Workshop1Props {
  onComplete: () => void;
  onStepComplete: (step: number) => void;
}

export function Workshop1({ onComplete, onStepComplete }: Workshop1Props) {
  const [context, setContext] = useState<Partial<EbiosContext>>({
    organization: { name: '', sector: '', size: '' },
    scope: { description: '', constraints: [], assumptions: [] },
    stakeholders: []
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    {
      title: 'Objectifs stratégiques',
      icon: Target,
      fields: ['organization'],
      validate: () => {
        const errors: Record<string, string> = {};
        if (!context.organization?.name) {
          errors.name = "Le nom de l'organisation est requis";
        }
        if (!context.organization?.sector) {
          errors.sector = "Le secteur d'activité est requis";
        }
        return errors;
      }
    },
    {
      title: 'Périmètre',
      icon: Shield,
      fields: ['scope'],
      validate: () => {
        const errors: Record<string, string> = {};
        if (!context.scope?.description) {
          errors.scope = 'La description du périmètre est requise';
        }
        return errors;
      }
    },
    {
      title: 'Biens supports',
      icon: Server,
      fields: ['assets'],
      validate: () => {
        const errors: Record<string, string> = {};
        // Validation des biens supports
        return errors;
      }
    },
    {
      title: 'Parties prenantes',
      icon: Building,
      fields: ['stakeholders'],
      validate: () => {
        const errors: Record<string, string> = {};
        if (!context.stakeholders?.length) {
          errors.stakeholders = 'Au moins une partie prenante est requise';
        }
        return errors;
      }
    }
  ];

  const handleNext = () => {
    const stepErrors = steps[currentStep].validate();
    if (Object.keys(stepErrors).length === 0) {
      onStepComplete(currentStep);
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        onComplete();
      }
      setErrors({});
    } else {
      setErrors(stepErrors);
    }
  };

  const CurrentStepIcon = steps[currentStep].icon;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-blue-100 rounded-lg">
          <CurrentStepIcon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {steps[currentStep].title}
          </h3>
          <p className="text-sm text-gray-500">
            Étape {currentStep + 1} sur {steps.length}
          </p>
        </div>
      </div>

      {currentStep === 0 && (
        <div className="space-y-4">
          <TextArea
            label="Nom de l'organisation"
            value={context.organization?.name || ''}
            onChange={(e) => setContext({
              ...context,
              organization: { ...context.organization, name: e.target.value }
            })}
            error={errors.name}
          />
          <TextArea
            label="Secteur d'activité"
            value={context.organization?.sector || ''}
            onChange={(e) => setContext({
              ...context,
              organization: { ...context.organization, sector: e.target.value }
            })}
            error={errors.sector}
          />
        </div>
      )}

      {currentStep === 1 && (
        <TextArea
          label="Description du périmètre"
          value={context.scope?.description || ''}
          onChange={(e) => setContext({
            ...context,
            scope: { ...context.scope, description: e.target.value }
          })}
          error={errors.scope}
        />
      )}

      {/* Ajoutez les autres étapes ici */}

      <div className="flex justify-between mt-8">
        {currentStep > 0 && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Retour
          </Button>
        )}
        <Button
          type="button"
          onClick={handleNext}
          className="ml-auto"
        >
          {currentStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
        </Button>
      </div>
    </div>
  );
}