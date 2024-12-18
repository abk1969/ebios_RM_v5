import React, { useState } from 'react';
import { TextArea } from '../TextArea';
import { Button } from '../Button';
import { AlertTriangle, Users, BarChart2 } from 'lucide-react';
import type { OperationalScenario } from '../../types/ebios';

interface Workshop4Props {
  onComplete: () => void;
  onStepComplete: (step: number) => void;
  onBack: () => void;
}

export function Workshop4({ onComplete, onStepComplete, onBack }: Workshop4Props) {
  const [scenarios, setScenarios] = useState<OperationalScenario[]>([]);
  const [currentScenario, setCurrentScenario] = useState<Partial<OperationalScenario>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    {
      title: 'Parties prenantes',
      icon: Users,
      validate: () => {
        const errors: Record<string, string> = {};
        // Validation des parties prenantes
        return errors;
      }
    },
    {
      title: 'Évaluation des risques',
      icon: AlertTriangle,
      validate: () => {
        const errors: Record<string, string> = {};
        if (scenarios.length === 0) {
          errors.scenarios = 'Au moins un scénario opérationnel doit être défini';
        }
        if (!scenarios.every(s => s.probability > 0 && s.impact > 0)) {
          errors.evaluation = 'Tous les scénarios doivent être évalués';
        }
        return errors;
      }
    },
    {
      title: 'Cartographie',
      icon: BarChart2,
      validate: () => {
        const errors: Record<string, string> = {};
        if (!scenarios.every(s => s.technicalControls.length > 0)) {
          errors.controls = 'Des mesures techniques doivent être définies pour tous les scénarios';
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
          probability: currentScenario.probability || 1,
          impact: currentScenario.impact || 1,
          technicalControls: currentScenario.technicalControls || [],
        } as OperationalScenario
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

      {currentStep === 1 && (
        <div className="space-y-4">
          <TextArea
            label="Nom du scénario opérationnel"
            value={currentScenario.name || ''}
            onChange={(e) => setCurrentScenario({
              ...currentScenario,
              name: e.target.value
            })}
            error={errors.name}
          />
          <TextArea
            label="Description"
            value={currentScenario.description || ''}
            onChange={(e) => setCurrentScenario({
              ...currentScenario,
              description: e.target.value
            })}
            error={errors.description}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Probabilité
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={currentScenario.probability || 1}
                onChange={(e) => setCurrentScenario({
                  ...currentScenario,
                  probability: Number(e.target.value)
                })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Très faible</span>
                <span>Très élevée</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Impact
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={currentScenario.impact || 1}
                onChange={(e) => setCurrentScenario({
                  ...currentScenario,
                  impact: Number(e.target.value)
                })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Négligeable</span>
                <span>Critique</span>
              </div>
            </div>
          </div>

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
                Scénarios opérationnels identifiés
              </h4>
              <ul className="space-y-3">
                {scenarios.map((scenario) => (
                  <li
                    key={scenario.id}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">{scenario.name}</h5>
                        <p className="text-sm text-gray-600 mt-1">
                          {scenario.description}
                        </p>
                      </div>
                      <div className="text-sm">
                        <span className="text-blue-600">P{scenario.probability}</span>
                        {' × '}
                        <span className="text-red-600">I{scenario.impact}</span>
                        {' = '}
                        <span className="font-bold">
                          {scenario.probability * scenario.impact}
                        </span>
                      </div>
                    </div>
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