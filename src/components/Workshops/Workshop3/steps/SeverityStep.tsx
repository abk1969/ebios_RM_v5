import React from 'react';
import { TextArea } from '../../../TextArea';
import { Button } from '../../../Button';
import type { Workshop3Data } from '../types';

interface SeverityStepProps {
  data: Workshop3Data;
  onUpdate: (data: Workshop3Data) => void;
}

export function SeverityStep({ data, onUpdate }: SeverityStepProps) {
  const handleUpdateSeverity = (id: string, severity: number) => {
    onUpdate({
      ...data,
      scenarios: data.scenarios.map(s => 
        s.id === id ? { ...s, severity } : s
      )
    });
  };

  const handleUpdateJustification = (id: string, justification: string) => {
    onUpdate({
      ...data,
      scenarios: data.scenarios.map(s => 
        s.id === id ? { ...s, justification } : s
      )
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Évaluation de la gravité
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Évaluez la gravité des impacts pour chaque scénario stratégique.
        </p>
      </div>

      <div className="space-y-6">
        {data.scenarios.map((scenario) => (
          <div
            key={scenario.id}
            className="p-4 bg-gray-50 rounded-lg space-y-4"
          >
            <div>
              <h4 className="font-medium text-gray-900">{scenario.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{scenario.description}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Niveau de gravité
              </label>
              <input
                type="range"
                min="1"
                max="4"
                value={scenario.severity}
                onChange={(e) => handleUpdateSeverity(scenario.id, Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Négligeable</span>
                <span>Limitée</span>
                <span>Important</span>
                <span>Critique</span>
              </div>
            </div>

            <TextArea
              label="Justification"
              value={scenario.justification}
              onChange={(e) => handleUpdateJustification(scenario.id, e.target.value)}
              placeholder="Justifiez le niveau de gravité..."
            />

            <div className="mt-2">
              <span className={`
                inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${scenario.severity >= 4 ? 'bg-red-100 text-red-800' :
                  scenario.severity >= 3 ? 'bg-orange-100 text-orange-800' :
                  scenario.severity >= 2 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'}
              `}>
                Gravité : {scenario.severity}/4
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}