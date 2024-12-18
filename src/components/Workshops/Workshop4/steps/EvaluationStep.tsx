import React from 'react';
import { TextArea } from '../../../TextArea';
import { Button } from '../../../Button';
import type { Workshop4Data } from '../types';

interface EvaluationStepProps {
  data: Workshop4Data;
  onUpdate: (data: Workshop4Data) => void;
}

export function EvaluationStep({ data, onUpdate }: EvaluationStepProps) {
  const handleUpdateProbability = (id: string, probability: number) => {
    onUpdate({
      ...data,
      scenarios: data.scenarios.map(s => 
        s.id === id ? { ...s, probability } : s
      )
    });
  };

  const handleUpdateImpact = (id: string, impact: number) => {
    onUpdate({
      ...data,
      scenarios: data.scenarios.map(s => 
        s.id === id ? { ...s, impact } : s
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
          Évaluation technique
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Évaluez la probabilité et l'impact technique des scénarios.
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

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Probabilité technique
                </label>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={scenario.probability}
                  onChange={(e) => handleUpdateProbability(scenario.id, Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Minime</span>
                  <span>Significative</span>
                  <span>Forte</span>
                  <span>Maximale</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Impact technique
                </label>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={scenario.impact}
                  onChange={(e) => handleUpdateImpact(scenario.id, Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Négligeable</span>
                  <span>Limité</span>
                  <span>Important</span>
                  <span>Critique</span>
                </div>
              </div>
            </div>

            <TextArea
              label="Justification"
              value={scenario.justification}
              onChange={(e) => handleUpdateJustification(scenario.id, e.target.value)}
              placeholder="Justifiez l'évaluation technique..."
            />

            <div className="flex items-center gap-4">
              <span className={`
                inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${scenario.probability >= 4 ? 'bg-red-100 text-red-800' :
                  scenario.probability >= 3 ? 'bg-orange-100 text-orange-800' :
                  scenario.probability >= 2 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'}
              `}>
                Probabilité : {scenario.probability}/4
              </span>

              <span className={`
                inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${scenario.impact >= 4 ? 'bg-red-100 text-red-800' :
                  scenario.impact >= 3 ? 'bg-orange-100 text-orange-800' :
                  scenario.impact >= 2 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'}
              `}>
                Impact : {scenario.impact}/4
              </span>

              <span className={`
                inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${scenario.probability * scenario.impact >= 12 ? 'bg-red-100 text-red-800' :
                  scenario.probability * scenario.impact >= 8 ? 'bg-orange-100 text-orange-800' :
                  scenario.probability * scenario.impact >= 4 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'}
              `}>
                Niveau : {scenario.probability * scenario.impact}/16
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}