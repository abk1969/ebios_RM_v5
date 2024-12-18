import React from 'react';
import { TextArea } from '../../../TextArea';
import { Button } from '../../../Button';
import type { Workshop2Data, TargetedObjective } from '../types';

interface ObjectivesStepProps {
  data: Workshop2Data;
  onUpdate: (data: Workshop2Data) => void;
}

export function ObjectivesStep({ data, onUpdate }: ObjectivesStepProps) {
  const [currentObjective, setCurrentObjective] = React.useState<Partial<TargetedObjective>>({
    name: '',
    description: '',
    impact: 'medium',
    motivation: ''
  });

  const handleAddObjective = () => {
    if (currentObjective.name && currentObjective.description && currentObjective.motivation) {
      const newObjective: TargetedObjective = {
        ...currentObjective as TargetedObjective,
        id: crypto.randomUUID()
      };
      
      onUpdate({
        ...data,
        objectives: [...data.objectives, newObjective]
      });
      
      setCurrentObjective({
        name: '',
        description: '',
        impact: 'medium',
        motivation: ''
      });
    }
  };

  const handleRemoveObjective = (id: string) => {
    onUpdate({
      ...data,
      objectives: data.objectives.filter(o => o.id !== id)
    });
  };

  const impactLevels = [
    { value: 'low', label: 'Faible' },
    { value: 'medium', label: 'Moyen' },
    { value: 'high', label: 'Élevé' },
    { value: 'critical', label: 'Critique' }
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Objectifs visés
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Identifiez les objectifs potentiels des sources de risque.
        </p>
      </div>

      <div className="space-y-4">
        <TextArea
          label="Nom de l'objectif"
          value={currentObjective.name}
          onChange={(e) => setCurrentObjective({ ...currentObjective, name: e.target.value })}
          placeholder="Ex: Vol de données sensibles, Sabotage..."
        />

        <TextArea
          label="Description"
          value={currentObjective.description}
          onChange={(e) => setCurrentObjective({ ...currentObjective, description: e.target.value })}
          placeholder="Décrivez l'objectif visé..."
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Impact potentiel
          </label>
          <select
            value={currentObjective.impact}
            onChange={(e) => setCurrentObjective({ 
              ...currentObjective, 
              impact: e.target.value as TargetedObjective['impact']
            })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {impactLevels.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        <TextArea
          label="Motivation"
          value={currentObjective.motivation}
          onChange={(e) => setCurrentObjective({ ...currentObjective, motivation: e.target.value })}
          placeholder="Expliquez pourquoi cet objectif serait visé..."
        />

        <Button
          type="button"
          onClick={handleAddObjective}
          disabled={!currentObjective.name || !currentObjective.description || !currentObjective.motivation}
          className="w-full"
        >
          Ajouter l'objectif
        </Button>
      </div>

      {data.objectives.length > 0 && (
        <div className="mt-8">
          <h4 className="font-medium text-gray-900 mb-4">Objectifs identifiés</h4>
          <div className="space-y-4">
            {data.objectives.map((objective) => (
              <div
                key={objective.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium text-gray-900">{objective.name}</h5>
                      <span className={`
                        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${objective.impact === 'critical' ? 'bg-red-100 text-red-800' :
                          objective.impact === 'high' ? 'bg-orange-100 text-orange-800' :
                          objective.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'}
                      `}>
                        {impactLevels.find(l => l.value === objective.impact)?.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{objective.description}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Motivation :</span> {objective.motivation}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleRemoveObjective(objective.id)}
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