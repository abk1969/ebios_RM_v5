import React from 'react';
import { TextArea } from '../../../TextArea';
import { Button } from '../../../Button';
import type { Workshop5Data, RiskTreatment } from '../types';

interface TreatmentOptionsStepProps {
  data: Workshop5Data;
  onUpdate: (data: Workshop5Data) => void;
}

export function TreatmentOptionsStep({ data, onUpdate }: TreatmentOptionsStepProps) {
  const [currentTreatment, setCurrentTreatment] = React.useState<Partial<RiskTreatment>>({
    scenarioId: '',
    type: 'reduction',
    description: '',
    measures: [],
    residualRisk: {
      probability: 1,
      impact: 1,
      justification: ''
    }
  });

  const handleAddTreatment = () => {
    if (currentTreatment.scenarioId && currentTreatment.description) {
      const newTreatment: RiskTreatment = {
        ...currentTreatment as RiskTreatment,
        id: crypto.randomUUID()
      };
      
      onUpdate({
        ...data,
        treatments: [...data.treatments, newTreatment]
      });
      
      setCurrentTreatment({
        scenarioId: '',
        type: 'reduction',
        description: '',
        measures: [],
        residualRisk: {
          probability: 1,
          impact: 1,
          justification: ''
        }
      });
    }
  };

  const handleRemoveTreatment = (id: string) => {
    onUpdate({
      ...data,
      treatments: data.treatments.filter(t => t.id !== id)
    });
  };

  const treatmentTypes = [
    { value: 'reduction', label: 'Réduction' },
    { value: 'sharing', label: 'Partage' },
    { value: 'avoidance', label: 'Évitement' },
    { value: 'acceptance', label: 'Acceptation' }
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Options de traitement
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Définissez la stratégie de traitement pour chaque risque.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type de traitement
          </label>
          <select
            value={currentTreatment.type}
            onChange={(e) => setCurrentTreatment({ 
              ...currentTreatment, 
              type: e.target.value as RiskTreatment['type']
            })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {treatmentTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <TextArea
          label="Description du traitement"
          value={currentTreatment.description}
          onChange={(e) => setCurrentTreatment({ ...currentTreatment, description: e.target.value })}
          placeholder="Décrivez la stratégie de traitement..."
        />

        <Button
          type="button"
          onClick={handleAddTreatment}
          disabled={!currentTreatment.description}
          className="w-full"
        >
          Ajouter le traitement
        </Button>
      </div>

      {data.treatments.length > 0 && (
        <div className="mt-8">
          <h4 className="font-medium text-gray-900 mb-4">Traitements définis</h4>
          <div className="space-y-4">
            {data.treatments.map((treatment) => (
              <div
                key={treatment.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`
                        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${treatment.type === 'reduction' ? 'bg-blue-100 text-blue-800' :
                          treatment.type === 'sharing' ? 'bg-purple-100 text-purple-800' :
                          treatment.type === 'avoidance' ? 'bg-red-100 text-red-800' :
                          'bg-green-100 text-green-800'}
                      `}>
                        {treatmentTypes.find(t => t.value === treatment.type)?.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{treatment.description}</p>
                  </div>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleRemoveTreatment(treatment.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}