import React, { useState } from 'react';
import { TextArea } from '../TextArea';
import { Button } from '../Button';
import { Target, Users, Shield } from 'lucide-react';
import type { RiskSource } from '../../types/ebios';

interface Workshop2Props {
  onComplete: () => void;
  onStepComplete: (step: number) => void;
  onBack: () => void;
}

export function Workshop2({ onComplete, onStepComplete, onBack }: Workshop2Props) {
  const [riskSources, setRiskSources] = useState<RiskSource[]>([]);
  const [currentSource, setCurrentSource] = useState<Partial<RiskSource>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    {
      title: 'Sources de risque',
      icon: Users,
      validate: () => {
        const errors: Record<string, string> = {};
        if (riskSources.length === 0) {
          errors.sources = 'Au moins une source de risque doit être identifiée';
        }
        return errors;
      }
    },
    {
      title: 'Objectifs visés',
      icon: Target,
      validate: () => {
        const errors: Record<string, string> = {};
        // Validation des objectifs
        return errors;
      }
    },
    {
      title: 'Couples sources-objectifs',
      icon: Shield,
      validate: () => {
        const errors: Record<string, string> = {};
        // Validation des couples
        return errors;
      }
    }
  ];

  const handleAddSource = () => {
    if (currentSource.name && currentSource.description) {
      setRiskSources([
        ...riskSources,
        {
          ...currentSource,
          id: crypto.randomUUID(),
          category: currentSource.category || 'human'
        } as RiskSource
      ]);
      setCurrentSource({});
    }
  };

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
            label="Nom de la source de risque"
            value={currentSource.name || ''}
            onChange={(e) => setCurrentSource({
              ...currentSource,
              name: e.target.value
            })}
          />
          <TextArea
            label="Description"
            value={currentSource.description || ''}
            onChange={(e) => setCurrentSource({
              ...currentSource,
              description: e.target.value
            })}
          />
          <Button
            type="button"
            onClick={handleAddSource}
            disabled={!currentSource.name || !currentSource.description}
          >
            Ajouter la source
          </Button>

          {riskSources.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">
                Sources de risque identifiées
              </h4>
              <ul className="space-y-3">
                {riskSources.map((source) => (
                  <li
                    key={source.id}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <h5 className="font-medium">{source.name}</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      {source.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Ajoutez les autres étapes ici */}

      <div className="flex justify-between mt-8">
        {currentStep === 0 ? (
          <Button type="button" variant="secondary" onClick={onBack}>
            Retour à l'atelier précédent
          </Button>
        ) : (
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
          disabled={Object.keys(errors).length > 0}
        >
          {currentStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
        </Button>
      </div>
    </div>
  );
}