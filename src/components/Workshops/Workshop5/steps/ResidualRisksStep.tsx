import React from 'react';
import { TextArea } from '../../../TextArea';
import { Button } from '../../../Button';
import type { Workshop5Data } from '../types';

interface ResidualRisksStepProps {
  data: Workshop5Data;
  onUpdate: (data: Workshop5Data) => void;
}

export function ResidualRisksStep({ data, onUpdate }: ResidualRisksStepProps) {
  const handleUpdateProbability = (id: string, probability: number) => {
    onUpdate({
      ...data,
      treatments: data.treatments.map(t => 
        t.id === id ? {
          ...t,
          residualRisk: {
            ...t.residualRisk,
            probability
          }
        } : t
      )
    });
  };

  const handleUpdateImpact = (id: string, impact: number) => {
    onUpdate({
      ...data,
      treatments: data.treatments.map(t => 
        t.id === id ? {
          ...t,
          residualRisk: {
            ...t.residualRisk,
            impact
          }
        } : t
      )
    });
  };

  const handleUpdateJustification = (id: string, justification: string) => {
    onUpdate({
      ...data,
      treatments: data.treatments.map(t => 
        t.id === id ? {
          ...t,
          residualRisk: {
            ...t.residualRisk,
            justification
          }
        } : t
      )
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Risques résiduels
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Évaluez les risques résiduels après application des mesures.
        </p>
      </div>

      <div className="space-y-8">
        {data.treatments.map((treatment) => (
          <div
            key={treatment.id}
            className="p-4 bg-gray-50 rounded-lg space-y-4"
          >
            <div>
              <h4 className="font-medium text-gray-900">{treatment.description}</h4>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Mesures :</span>
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {treatment.measures.map(measure => (
                    <li key={measure.id}>{measure.name}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Probabilité résiduelle
                </label>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={treatment.residualRisk.probability}
                  onChange={(e) => handleUpdateProbability(treatment.id, Number(e.target.value))}
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
                  Impact résiduel
                </label>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={treatment.residualRisk.impact}
                  onChange={(e) => handleUpdateImpact(treatment.id, Number(e.target.value))}
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
              value={treatment.residualRisk.justification}
              onChange={(e) => handleUpdateJustification(treatment.id, e.target.value)}
              placeholder="Justifiez l'évaluation du risque résiduel..."
            />

            <div className="flex items-center gap-4">
              <span className={`
                inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${treatment.residualRisk.probability >= 4 ? 'bg-red-100 text-red-800' :
                  treatment.residualRisk.probability >= 3 ? 'bg-orange-100 text-orange-800' :
                  treatment.residualRisk.probability >= 2 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'}
              `}>
                Probabilité : {treatment.residualRisk.probability}/4
              </span>

              <span className={`
                inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${treatment.residualRisk.impact >= 4 ? 'bg-red-100 text-red-800' :
                  treatment.residualRisk.impact >= 3 ? 'bg-orange-100 text-orange-800' :
                  treatment.residualRisk.impact >= 2 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'}
              `}>
                Impact : {treatment.residualRisk.impact}/4
              </span>

              <span className={`
                inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${treatment.residualRisk.probability * treatment.residualRisk.impact >= 12 ? 'bg-red-100 text-red-800' :
                  treatment.residualRisk.probability * treatment.residualRisk.impact >= 8 ? 'bg-orange-100 text-orange-800' :
                  treatment.residualRisk.probability * treatment.residualRisk.impact >= 4 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'}
              `}>
                Niveau : {treatment.residualRisk.probability * treatment.residualRisk.impact}/16
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}