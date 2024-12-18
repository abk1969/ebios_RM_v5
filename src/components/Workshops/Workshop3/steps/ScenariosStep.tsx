import React from 'react';
import { TextArea } from '../../../TextArea';
import { Button } from '../../../Button';
import { MultiSelect } from '../../../MultiSelect';
import type { Workshop3Data, StrategicScenario } from '../types';

interface ScenariosStepProps {
  data: Workshop3Data;
  onUpdate: (data: Workshop3Data) => void;
}

export function ScenariosStep({ data, onUpdate }: ScenariosStepProps) {
  const [currentScenario, setCurrentScenario] = React.useState<Partial<StrategicScenario>>({
    name: '',
    description: '',
    sourceIds: [],
    targetedValues: [],
    mode: 'direct',
    controls: []
  });

  const handleAddScenario = () => {
    if (currentScenario.name && currentScenario.description) {
      const newScenario: StrategicScenario = {
        ...currentScenario as StrategicScenario,
        id: crypto.randomUUID(),
        severity: 0,
        likelihood: 0,
        justification: ''
      };
      
      onUpdate({
        ...data,
        scenarios: [...data.scenarios, newScenario]
      });
      
      setCurrentScenario({
        name: '',
        description: '',
        sourceIds: [],
        targetedValues: [],
        mode: 'direct',
        controls: []
      });
    }
  };

  const handleRemoveScenario = (id: string) => {
    onUpdate({
      ...data,
      scenarios: data.scenarios.filter(s => s.id !== id)
    });
  };

  const modes = [
    { value: 'direct', label: 'Direct' },
    { value: 'indirect', label: 'Indirect' },
    { value: 'combined', label: 'Combiné' }
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Construction des scénarios stratégiques
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Définissez les scénarios d'attaque stratégiques.
        </p>
      </div>

      <div className="space-y-4">
        <TextArea
          label="Nom du scénario"
          value={currentScenario.name}
          onChange={(e) => setCurrentScenario({ ...currentScenario, name: e.target.value })}
          placeholder="Ex: Attaque ciblée sur les données clients..."
        />

        <TextArea
          label="Description"
          value={currentScenario.description}
          onChange={(e) => setCurrentScenario({ ...currentScenario, description: e.target.value })}
          placeholder="Décrivez le scénario d'attaque..."
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mode opératoire
          </label>
          <select
            value={currentScenario.mode}
            onChange={(e) => setCurrentScenario({ 
              ...currentScenario, 
              mode: e.target.value as StrategicScenario['mode']
            })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {modes.map(mode => (
              <option key={mode.value} value={mode.value}>
                {mode.label}
              </option>
            ))}
          </select>
        </div>

        <Button
          type="button"
          onClick={handleAddScenario}
          disabled={!currentScenario.name || !currentScenario.description}
          className="w-full"
        >
          Ajouter le scénario
        </Button>
      </div>

      {data.scenarios.length > 0 && (
        <div className="mt-8">
          <h4 className="font-medium text-gray-900 mb-4">Scénarios identifiés</h4>
          <div className="space-y-4">
            {data.scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium text-gray-900">{scenario.name}</h5>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {modes.find(m => m.value === scenario.mode)?.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{scenario.description}</p>
                  </div>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleRemoveScenario(scenario.id)}
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