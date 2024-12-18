import React from 'react';
import type { Risk } from '../../../types';
import { RiskDistributionPie } from '../charts/RiskDistributionPie';
import { getRiskTrend } from '../utils/riskAnalysis';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface RiskOverviewProps {
  risks: Risk[];
  className?: string;
}

export function RiskOverview({ risks, className = '' }: RiskOverviewProps) {
  const trend = getRiskTrend(risks);
  const isPositiveTrend = trend.change > 0;

  return (
    <section className={className}>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Vue d'ensemble des risques
        </h2>
        <p className="mt-2 text-gray-600">
          Distribution et tendance globale des risques identifiés
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-xl shadow-lg h-[400px]">
          <h3 className="text-lg font-medium mb-4">Distribution des risques</h3>
          <RiskDistributionPie risks={risks} />
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-medium mb-4">Tendance globale</h3>
            <div className="flex items-center gap-4">
              {isPositiveTrend ? (
                <TrendingUp className="w-8 h-8 text-red-500" />
              ) : (
                <TrendingDown className="w-8 h-8 text-green-500" />
              )}
              <div>
                <p className="text-3xl font-bold">
                  {Math.abs(trend.change).toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600">
                  {isPositiveTrend ? 'Augmentation' : 'Diminution'} du niveau moyen
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-medium mb-4">Statistiques</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-gray-600">Niveau moyen</dt>
                <dd className="text-2xl font-bold">{trend.current.toFixed(1)}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600">Risques évalués</dt>
                <dd className="text-2xl font-bold">{risks.length}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}