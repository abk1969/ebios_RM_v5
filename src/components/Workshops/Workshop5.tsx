import React, { useState } from 'react';
import { TextArea } from '../TextArea';
import { Button } from '../Button';
import { BarChart2, Shield, Clock, Activity } from 'lucide-react';
import type { RiskTreatment } from '../../types/ebios';

interface Workshop5Props {
  onComplete: () => void;
  onStepComplete: (step: number) => void;
  onBack: () => void;
}

export function Workshop5({ onComplete, onStepComplete, onBack }: Workshop5Props) {
  const [treatments, setTreatments] = useState<RiskTreatment[]>([]);
  const [currentTreatment, setCurrentTreatment] = useState<Partial<RiskTreatment>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    {
      title: 'Risques résiduels',
      icon: Activity,
      validate: () => {
        const errors: Record<string, string> = {};
        if (treatments.length === 0) {
          errors.treatments = 'Au moins une mesure de traitement doit être définie';
        }
        return errors;
      }
    },
    {
      title: 'Mesures de sécurité',
      icon: Shield,
      validate: () => {
        const errors: Record<string, string> = {};
        if (!treatments.every(t => t.measures.length > 0)) {
          errors.measures = 'Des mesures de sécurité doivent être définies pour chaque traitement';
        }
        return errors;
      }
    },
    {
      title: 'Plan de traitement',
      icon: BarChart2,
      validate: () => {
        const errors: Record<string, string> = {};
        if (!treatments.every(t => t.deadline && t.effectiveness > 0)) {
          errors.plan = 'Les délais et l\'efficacité doivent être définis pour tous les traitements';
        }
        return errors;
      }
    },
    {
      title: 'Suivi des risques',
      icon: Clock,
      validate: () => {
        const errors: Record<string, string> = {};
        if (!treatments.every(t => t.status)) {
          errors.status = 'Le statut doit être défini pour tous les traitements';
        }
        return errors;
      }
    }
  ];

  const treatmentTypes = [
    { value: 'reduction', label: 'Réduction' },
    { value: 'sharing', label: 'Partage' },
    { value: 'avoidance', label: 'Évitement' },
    { value: 'acceptance', label: 'Acceptation' }
  ];

  const handleAddTreatment = () => {
    if (currentTreatment.description && currentTreatment.type) {
      setTreatments([
        ...treatments,
        {
          ...currentTreatment,
          id: crypto.randomUUID(),
          measures: currentTreatment.measures || [],
          status: currentTreatment.status || 'planned',
          effectiveness: currentTreatment.effectiveness || 0,
          cost: currentTreatment.cost || 0,
          deadline: currentTreatment.deadline || new Date()
        } as RiskTreatment
      ]);
      setCurrentTreatment({});
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type de traitement
              </label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={currentTreatment.type || ''}
                onChange={(e) => setCurrentTreatment({
                  ...currentTreatment,
                  type: e.target.value as RiskTreatment['type']
                })}
              >
                <option value="">Sélectionnez un type</option>
                {treatmentTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coût estimé
              </label>
              <input
                type="number"
                min="0"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={currentTreatment.cost || ''}
                onChange={(e) => setCurrentTreatment({
                  ...currentTreatment,
                  cost: Number(e.target.value)
                })}
              />
            </div>
          </div>

          <TextArea
            label="Description du traitement"
            value={currentTreatment.description || ''}
            onChange={(e) => setCurrentTreatment({
              ...currentTreatment,
              description: e.target.value
            })}
            error={errors.description}
          />

          <Button
            type="button"
            onClick={handleAddTreatment}
            disabled={!currentTreatment.description || !currentTreatment.type}
          >
            Ajouter le traitement
          </Button>

          {treatments.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">
                Traitements définis
              </h4>
              <ul className="space-y-3">
                {treatments.map((treatment) => (
                  <li
                    key={treatment.id}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {treatmentTypes.find(t => t.value === treatment.type)?.label}
                          </span>
                          <span className="text-sm text-gray-500">
                            Coût: {treatment.cost}k€
                          </span>
                        </div>
                        <p className="mt-2 text-gray-700">{treatment.description}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {currentStep === 1 && (
        <div className="space-y-4">
          {/* Interface pour définir les mesures de sécurité */}
          <TextArea
            label="Mesures de sécurité"
            value={currentTreatment.measures?.join('\n') || ''}
            onChange={(e) => setCurrentTreatment({
              ...currentTreatment,
              measures: e.target.value.split('\n').filter(m => m.trim())
            })}
            placeholder="Entrez une mesure par ligne"
            error={errors.measures}
          />
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date limite
              </label>
              <input
                type="date"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={currentTreatment.deadline?.toISOString().split('T')[0] || ''}
                onChange={(e) => setCurrentTreatment({
                  ...currentTreatment,
                  deadline: new Date(e.target.value)
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Efficacité estimée
              </label>
              <input
                type="range"
                min="0"
                max="100"
                className="w-full"
                value={currentTreatment.effectiveness || 0}
                onChange={(e) => setCurrentTreatment({
                  ...currentTreatment,
                  effectiveness: Number(e.target.value)
                })}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0%</span>
                <span>{currentTreatment.effectiveness || 0}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
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