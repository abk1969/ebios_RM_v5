import React from 'react';
import type { Risk, Scenario } from '../../../types';
import { RiskRadarChart } from '../charts/RiskRadarChart';

interface RiskTrendsProps {
  risks: Risk[];
  scenarios: Scenario[];
  className?: string;
}

export function RiskTrends({ risks, scenarios, className = '' }: RiskTrendsProps) {
  return (
    <section className={className}>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Analyse des tendances
        </h2>
        <p className="mt-2 text-gray-600">
          Visualisation comparative des niveaux de risque par scénario
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-xl shadow-lg h-[500px]">
          <RiskRadarChart scenarios={scenarios} risks={risks} />
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-medium mb-4">Indicateurs clés</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-gray-600">Scénarios à haut risque</dt>
                <dd className="text-2xl font-bold">
                  {risks.filter(r => r.level > 12).length}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600">Impact moyen</dt>
                <dd className="text-2xl font-bold">
                  {(risks.reduce((acc, r) => acc + r.impact, 0) / risks.length).toFixed(1)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600">Probabilité moyenne</dt>
                <dd className="text-2xl font-bold">
                  {(risks.reduce((acc, r) => acc + r.probability, 0) / risks.length).toFixed(1)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-medium mb-4">Légende</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                Probabilité
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-500" />
                Impact
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                Niveau de risque
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}