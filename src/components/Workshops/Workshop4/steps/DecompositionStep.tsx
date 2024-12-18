import React from 'react';
import { TextArea } from '../../../TextArea';
import { Button } from '../../../Button';
import type { Workshop4Data, OperationalScenario } from '../types';

interface DecompositionStepProps {
  data: Workshop4Data;
  onUpdate: (data: Workshop4Data) => void;
}

export function DecompositionStep({ data, onUpdate }: DecompositionStepProps) {
  const [currentScenario, setCurrentScenario] = React.useState<Partial<OperationalScenario>>({
    name: '',
    description: '',
    strategicScenarioId: '',
    mode: {
      type: 'technical',
      details: ''
    },
    existingControls: [],
    probability: 1,
    impact: 1,
    justification: ''
  });

  const handleAddScenario = () => {
    if (currentScenario.name && currentScenario.description && currentScenario.mode?.details) {
      const newScenario: OperationalScenario = {
        ...currentScenario as OperationalScenario,
        id: crypto.randomUUID()
      };
      
      onUpdate({
        ...data,
        scenarios: [...data.scenarios, newScenario]
      });
      
      setCurrentScenario({
        name: '',
        description: '',
        strategicScenarioId: currentScenario.strategicScenarioId,
        mode: {
          type: 'technical',
          details: ''
        },
        existingControls: [],
        probability: 1,
        impact: 1,
        justification: ''
      });
    }
  };

  const handleRemoveScenario = (id: string) => {
    onUpdate({
      ...data,
      scenarios: data.scenarios.filter(s => s.id !== id)
    });
  };

  const modeTypes = [
    { value: 'technical', label: 'Technique' },
    { value: 'physical', label: 'Physique' },
    { value: 'organizational', label: 'Organisationnel' }
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Décomposition des scénarios stratégiques
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Décomposez les scénarios stratégiques en scénarios opérationnels.
        </p>
      </div>

      <div className="space-y-4">
        <TextArea
          label="Nom du scénario"
          value={currentScenario.name}
          onChange={(e) => setCurrentScenario({ ...currentScenario, name: e.target.value })}
          placeholder="Ex: Exploitation d'une vulnérabilité..."
        />

        <TextArea
          label="Description"
          value={currentScenario.description}
          onChange={(e) => setCurrentScenario({ ...currentScenario, description: e.target.value })}
          placeholder="Décrivez le scénario opérationnel..."
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mode opératoire
          </label>
          <select
            value={currentScenario.mode?.type}
            onChange={(e) => setCurrentScenario({ 
              ...currentScenario, 
              mode: {
                ...currentScenario.mode!,
                type: e.target.value as OperationalScenario['mode']['type']
              }
            })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {modeTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <TextArea
          label="Détails du mode opératoire"
          value={currentScenario.mode?.details}
          onChange={(e) => setCurrentScenario({ 
            ...currentScenario,
            mode: {
              ...currentScenario.mode!,
              details: e.target.value
            }
          })}
          placeholder="Décrivez en détail le mode opératoire..."
        />

        <Button
          type="button"
          onClick={handleAddScenario}
          disabled={!currentScenario.name || !currentScenario.description || !currentScenario.mode?.details}
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
                        {modeTypes.find(t => t.value === scenario.mode.type)?.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{scenario.description}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Mode opératoire :</span> {scenario.mode.details}
                    </p>
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