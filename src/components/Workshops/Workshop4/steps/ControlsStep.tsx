import React from 'react';
import { TextArea } from '../../../TextArea';
import { Button } from '../../../Button';
import type { Workshop4Data, OperationalScenario } from '../types';

interface ControlsStepProps {
  data: Workshop4Data;
  onUpdate: (data: Workshop4Data) => void;
}

export function ControlsStep({ data, onUpdate }: ControlsStepProps) {
  const [currentControl, setCurrentControl] = React.useState<{
    scenarioId: string;
    name: string;
    type: OperationalScenario['existingControls'][number]['type'];
    effectiveness: number;
  }>({
    scenarioId: '',
    name: '',
    type: 'preventive',
    effectiveness: 1
  });

  const handleAddControl = () => {
    if (currentControl.scenarioId && currentControl.name) {
      onUpdate({
        ...data,
        scenarios: data.scenarios.map(s => 
          s.id === currentControl.scenarioId ? {
            ...s,
            existingControls: [...s.existingControls, {
              id: crypto.randomUUID(),
              name: currentControl.name,
              type: currentControl.type,
              effectiveness: currentControl.effectiveness
            }]
          } : s
        )
      });
      
      setCurrentControl({
        scenarioId: currentControl.scenarioId,
        name: '',
        type: 'preventive',
        effectiveness: 1
      });
    }
  };

  const handleRemoveControl = (scenarioId: string, controlId: string) => {
    onUpdate({
      ...data,
      scenarios: data.scenarios.map(s => 
        s.id === scenarioId ? {
          ...s,
          existingControls: s.existingControls.filter(c => c.id !== controlId)
        } : s
      )
    });
  };

  const controlTypes = [
    { value: 'preventive', label: 'Préventive' },
    { value: 'protective', label: 'Protective' },
    { value: 'recovery', label: 'Récupération' }
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Mesures de sécurité existantes
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Identifiez les mesures de sécurité déjà en place.
        </p>
      </div>

      <div className="space-y-8">
        {data.scenarios.map((scenario) => (
          <div
            key={scenario.id}
            className="p-4 bg-gray-50 rounded-lg space-y-4"
          >
            <div>
              <h4 className="font-medium text-gray-900">{scenario.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{scenario.description}</p>
            </div>

            <div className="space-y-4">
              <h5 className="font-medium text-gray-900">Mesures existantes</h5>
              
              {currentControl.scenarioId === scenario.id && (
                <div className="space-y-4 p-4 bg-white rounded-lg">
                  <TextArea
                    label="Nom de la mesure"
                    value={currentControl.name}
                    onChange={(e) => setCurrentControl({
                      ...currentControl,
                      name: e.target.value
                    })}
                    placeholder="Ex: Pare-feu, Contrôle d'accès..."
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type de mesure
                    </label>
                    <select
                      value={currentControl.type}
                      onChange={(e) => setCurrentControl({
                        ...currentControl,
                        type: e.target.value as typeof currentControl.type
                      })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      {controlTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Efficacité
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="4"
                      value={currentControl.effectiveness}
                      onChange={(e) => setCurrentControl({
                        ...currentControl,
                        effectiveness: Number(e.target.value)
                      })}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Faible</span>
                      <span>Moyenne</span>
                      <span>Forte</span>
                      <span>Très forte</span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setCurrentControl({
                        scenarioId: '',
                        name: '',
                        type: 'preventive',
                        effectiveness: 1
                      })}
                    >
                      Annuler
                    </Button>
                    <Button
                      type="button"
                      onClick={handleAddControl}
                      disabled={!currentControl.name}
                    >
                      Ajouter la mesure
                    </Button>
                  </div>
                </div>
              )}

              {currentControl.scenarioId !== scenario.id && (
                <Button
                  type="button"
                  onClick={() => setCurrentControl({
                    ...currentControl,
                    scenarioId: scenario.id
                  })}
                >
                  Ajouter une mesure
                </Button>
              )}

              {scenario.existingControls.length > 0 && (
                <div className="space-y-2">
                  {scenario.existingControls.map((control) => (
                    <div
                      key={control.id}
                      className="flex items-center justify-between p-2 bg-white rounded-lg"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">
                            {control.name}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {controlTypes.find(t => t.value === control.type)?.label}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">
                          Efficacité : {control.effectiveness}/4
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => handleRemoveControl(scenario.id, control.id)}
                      >
                        Supprimer
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}