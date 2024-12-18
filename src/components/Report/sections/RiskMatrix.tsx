import React from 'react';
import type { Risk, Scenario } from '../../../types';
import { RiskHeatMap } from '../charts/RiskHeatMap';
import { RISK_LEVELS } from '../charts/config';

interface RiskMatrixProps {
  risks: Risk[];
  scenarios: Scenario[];
  className?: string;
}

export function RiskMatrix({ risks, scenarios, className = '' }: RiskMatrixProps) {
  const getScenariosByCell = (impact: number, probability: number) => {
    return risks
      .filter(r => r.impact === impact && r.probability === probability)
      .map(r => scenarios.find(s => s.id === r.scenarioId))
      .filter((s): s is Scenario => s !== undefined);
  };

  return (
    <section className={className}>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Matrice des risques
        </h2>
        <p className="mt-2 text-gray-600">
          Distribution des scénarios de risque selon leur probabilité et leur impact
        </p>
      </div>

      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-3 bg-white p-6 rounded-xl shadow-lg h-[500px]">
          <RiskHeatMap risks={risks} />
        </div>

        <div className="col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-medium mb-4">Légende des niveaux</h3>
            <div className="space-y-3">
              {Object.entries(RISK_LEVELS).map(([key, { label, max }]) => (
                <div key={key} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full bg-${key}-500`} />
                  <span className="text-sm">
                    {label} (≤ {max})
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-medium mb-4">Points critiques</h3>
            <div className="space-y-4">
              {[5, 4].map(impact => (
                <React.Fragment key={impact}>
                  {[4, 5].map(prob => {
                    const scenarios = getScenariosByCell(impact, prob);
                    if (scenarios.length === 0) return null;
                    return (
                      <div key={`${impact}-${prob}`} className="border-l-4 border-red-500 pl-4">
                        <p className="font-medium">
                          Impact {impact} / Probabilité {prob}
                        </p>
                        <ul className="mt-2 space-y-1 text-sm text-gray-600">
                          {scenarios.map(s => (
                            <li key={s.id}>{s.name}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}