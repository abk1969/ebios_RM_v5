import React, { useState } from 'react';
import { TextArea } from '../TextArea';
import { Button } from '../Button';
import { GitBranch, Target, Shield } from 'lucide-react';
import type { StrategicScenario } from '../../types/ebios';

interface Workshop3Props {
  onComplete: () => void;
  onStepComplete: (step: number) => void;
  onBack: () => void;
}

export function Workshop3({ onComplete, onStepComplete, onBack }: Workshop3Props) {
  const [scenarios, setScenarios] = useState<StrategicScenario[]>([]);
  const [currentScenario, setCurrentScenario] = useState<Partial<StrategicScenario>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    {
      title: 'Modes opératoires',
      icon: GitBranch,
      validate: () => {
        const errors: Record<string, string> = {};
        if (scenarios.length === 0) {
          errors.scenarios = 'Au moins un scénario stratégique doit être défini';
        }
        return errors;
      }
    },
    {
      title: 'Évaluation de la gravité',
      icon: Target,
      validate: () => {
        const errors: Record<string, string> = {};
        if (!scenarios.every(s => s.severity > 0)) {
          errors.severity = 'La gravité doit être évaluée pour tous les scénarios';
        }
        return errors;
      }
    },
    {
      title: 'Évaluation de la vraisemblance',
      icon: Shield,
      validate: () => {
        const errors: Record<string, string> = {};
        if (!scenarios.every(s => s.likelihood > 0)) {
          errors.likelihood = 'La vraisemblance doit être évaluée pour tous les scénarios';
        }
        return errors;
      }
    }
  ];

  const handleAddScenario = () => {
    if (currentScenario.name && currentScenario.description) {
      setScenarios([
        ...scenarios,
        {
          ...currentScenario,
          id: crypto.randomUUID(),
          likelihood: currentScenario.likelihood || 1,
          severity: currentScenario.severity || 1,
          operationalScenarios: [],
        } as StrategicScenario
      ]);
      setCurrentScenario({});
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
            label="Nom du scénario"
            value={currentScenario.name || ''}
            onChange={(e) => setCurrentScenario({
              ...currentScenario,
              name: e.target.value
            })}
          />
          <TextArea
            label="Description"
            value={currentScenario.description || ''}
            onChange={(e) => setCurrentScenario({
              ...currentScenario,
              description: e.target.value
            })}
          />
          <Button
            type="button"
            onClick={handleAddScenario}
            disabled={!currentScenario.name || !currentScenario.description}
          >
            Ajouter le scénario
          </Button>

          {scenarios.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">
                Scénarios stratégiques identifiés
              </h4>
              <ul className="space-y-3">
                {scenarios.map((scenario) => (
                  <li
                    key={scenario.id}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <h5 className="font-medium">{scenario.name}</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      {scenario.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

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