import React from 'react';
import type { Risk, Scenario, Asset, Threat } from '../../../types';
import { getTopRisks } from '../utils/riskAnalysis';
import { AlertTriangle } from 'lucide-react';

interface DetailedAnalysisProps {
  risks: Risk[];
  scenarios: Scenario[];
  assets: Asset[];
  threats: Threat[];
  className?: string;
}

export function DetailedAnalysis({
  risks,
  scenarios,
  assets,
  threats,
  className = '',
}: DetailedAnalysisProps) {
  const topRisks = getTopRisks(risks);

  return (
    <section className={className}>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Analyse détaillée
        </h2>
        <p className="mt-2 text-gray-600">
          Examen approfondi des scénarios de risque les plus critiques
        </p>
      </div>

      <div className="space-y-6">
        {topRisks.map(risk => {
          const scenario = scenarios.find(s => s.id === risk.scenarioId);
          if (!scenario) return null;

          const relatedAssets = assets.filter(a => scenario.assets.includes(a.id));
          const relatedThreats = threats.filter(t => scenario.threats.includes(t.id));

          return (
            <div key={risk.id} className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {scenario.name}
                  </h3>
                  <p className="mt-1 text-gray-600">{scenario.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle 
                    className={`w-6 h-6 ${
                      risk.level > 18 ? 'text-red-500' :
                      risk.level > 12 ? 'text-orange-500' :
                      'text-yellow-500'
                    }`}
                  />
                  <span className="text-2xl font-bold">{risk.level}</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Probabilité</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${(risk.probability / 5) * 100}%` }}
                      />
                    </div>
                    <span className="font-medium">{risk.probability}/5</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Impact</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500"
                        style={{ width: `${(risk.impact / 5) * 100}%` }}
                      />
                    </div>
                    <span className="font-medium">{risk.impact}/5</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Commentaire</h4>
                  <p className="text-sm text-gray-600">{risk.comment || 'Aucun commentaire'}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Actifs concernés</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {relatedAssets.map(asset => (
                      <li key={asset.id}>{asset.name}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Menaces associées</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {relatedThreats.map(threat => (
                      <li key={threat.id}>{threat.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}