import React from 'react';
import { RiskHeatMap } from '../../../Report/charts/RiskHeatMap';
import type { Workshop4Data } from '../types';

interface SynthesisStepProps {
  data: Workshop4Data;
  onUpdate: (data: Workshop4Data) => void;
}

export function SynthesisStep({ data }: SynthesisStepProps) {
  const getRiskLevel = (probability: number, impact: number) => {
    const level = probability * impact;
    if (level >= 12) return 'Critique';
    if (level >= 8) return 'Élevé';
    if (level >= 4) return 'Moyen';
    return 'Faible';
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Synthèse et cartographie
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Vue d'ensemble des risques opérationnels.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg h-[500px]">
          <h4 className="text-lg font-medium mb-4">Cartographie des risques</h4>
          <RiskHeatMap risks={data.scenarios.map(s => ({
            id: s.id,
            probability: s.probability,
            impact: s.impact,
            level: s.probability * s.impact
          }))} />
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-lg font-medium mb-4">Répartition des risques</h4>
            <div className="space-y-4">
              {['Critique', 'Élevé', 'Moyen', 'Faible'].map((level) => {
                const scenarios = data.scenarios.filter(s => 
                  getRiskLevel(s.probability, s.impact) === level
                );
                
                if (scenarios.length === 0) return null;

                return (
                  <div key={level} className="space-y-2">
                    <h5 className={`font-medium ${
                      level === 'Critique' ? 'text-red-700' :
                      level === 'Élevé' ? 'text-orange-700' :
                      level === 'Moyen' ? 'text-yellow-700' :
                      'text-green-700'
                    }`}>
                      Niveau {level} ({scenarios.length})
                    </h5>
                    <ul className="space-y-1">
                      {scenarios.map(scenario => (
                        <li key={scenario.id} className="text-sm text-gray-600">
                          {scenario.name} (P{scenario.probability} × I{scenario.impact})
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-lg font-medium mb-4">Statistiques</h4>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-gray-600">Scénarios évalués</dt>
                <dd className="text-2xl font-bold">{data.scenarios.length}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600">Niveau moyen</dt>
                <dd className="text-2xl font-bold">
                  {(data.scenarios.reduce((acc, s) => acc + (s.probability * s.impact), 0) / data.scenarios.length).toFixed(1)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600">Probabilité moyenne</dt>
                <dd className="text-2xl font-bold">
                  {(data.scenarios.reduce((acc, s) => acc + s.probability, 0) / data.scenarios.length).toFixed(1)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600">Impact moyen</dt>
                <dd className="text-2xl font-bold">
                  {(data.scenarios.reduce((acc, s) => acc + s.impact, 0) / data.scenarios.length).toFixed(1)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}