import React from 'react';
import { Shield, AlertTriangle, Target, AlertOctagon } from 'lucide-react';
import type { Risk, Asset, Threat, Scenario } from '../../../types';
import { getRiskLevelsDistribution } from '../utils/riskAnalysis';

interface ExecutiveSummaryProps {
  risks: Risk[];
  assets: Asset[];
  threats: Threat[];
  scenarios: Scenario[];
}

export function ExecutiveSummary({
  risks,
  assets,
  threats,
  scenarios,
}: ExecutiveSummaryProps) {
  const distribution = getRiskLevelsDistribution(risks);
  const criticalRisks = risks.filter(r => r.level > 18);

  return (
    <section className="mb-12 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Résumé exécutif</h2>
      
      <div className="grid grid-cols-4 gap-6">
        <MetricCard
          icon={Shield}
          label="Actifs critiques"
          value={assets.length}
          trend={null}
          color="blue"
        />
        <MetricCard
          icon={AlertTriangle}
          label="Menaces identifiées"
          value={threats.length}
          trend={null}
          color="amber"
        />
        <MetricCard
          icon={Target}
          label="Scénarios analysés"
          value={scenarios.length}
          trend={null}
          color="indigo"
        />
        <MetricCard
          icon={AlertOctagon}
          label="Risques critiques"
          value={criticalRisks.length}
          trend={{
            value: distribution.critical,
            label: 'du total'
          }}
          color="red"
        />
      </div>

      <div className="mt-8 p-6 bg-amber-50 rounded-lg border border-amber-200">
        <h3 className="text-lg font-medium text-amber-900 mb-2">
          Points d'attention
        </h3>
        <ul className="list-disc list-inside space-y-2 text-amber-800">
          {criticalRisks.map(risk => {
            const scenario = scenarios.find(s => s.id === risk.scenarioId);
            return (
              <li key={risk.id}>
                {scenario?.name} (Niveau: {risk.level})
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

interface MetricCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  trend: { value: number; label: string } | null;
  color: 'blue' | 'amber' | 'indigo' | 'red';
}

function MetricCard({ icon: Icon, label, value, trend, color }: MetricCardProps) {
  const colors = {
    blue: 'bg-blue-50 text-blue-700',
    amber: 'bg-amber-50 text-amber-700',
    indigo: 'bg-indigo-50 text-indigo-700',
    red: 'bg-red-50 text-red-700',
  };

  return (
    <div className={`${colors[color]} rounded-xl p-6`}>
      <div className="flex items-center gap-4">
        <Icon className="w-8 h-8" />
        <div>
          <p className="text-sm font-medium mb-1">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
          {trend && (
            <p className="text-sm mt-1">
              {trend.value}% {trend.label}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}