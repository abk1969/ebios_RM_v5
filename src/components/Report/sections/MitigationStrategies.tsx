import React from 'react';
import type { Risk, Scenario } from '../../../types';
import { Shield, AlertTriangle, ArrowRight } from 'lucide-react';

interface MitigationStrategiesProps {
  risks: Risk[];
  scenarios: Scenario[];
}

export function MitigationStrategies({ risks, scenarios }: MitigationStrategiesProps) {
  const criticalRisks = risks.filter(r => r.level > 18);
  const highRisks = risks.filter(r => r.level > 12 && r.level <= 18);

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Stratégies de traitement
        </h2>
        <p className="mt-2 text-gray-600">
          Recommandations et mesures de traitement des risques prioritaires
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-red-50 p-6 rounded-xl border border-red-100">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <h3 className="text-lg font-medium text-red-900">
                Risques critiques ({criticalRisks.length})
              </h3>
            </div>
            <ul className="space-y-4">
              {criticalRisks.map(risk => {
                const scenario = scenarios.find(s => s.id === risk.scenarioId);
                return (
                  <li key={risk.id} className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-900">{scenario?.name}</p>
                      <p className="text-sm text-red-700 mt-1">
                        Traitement immédiat requis - Niveau {risk.level}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
              <h3 className="text-lg font-medium text-orange-900">
                Risques élevés ({highRisks.length})
              </h3>
            </div>
            <ul className="space-y-4">
              {highRisks.map(risk => {
                const scenario = scenarios.find(s => s.id === risk.scenarioId);
                return (
                  <li key={risk.id} className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-orange-900">{scenario?.name}</p>
                      <p className="text-sm text-orange-700 mt-1">
                        Plan d'action à court terme - Niveau {risk.level}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-blue-500" />
            <h3 className="text-lg font-medium">Recommandations générales</h3>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Mesures organisationnelles
              </h4>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Renforcer la gouvernance de la sécurité</li>
                <li>Mettre à jour les procédures de gestion des incidents</li>
                <li>Former et sensibiliser les utilisateurs</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Mesures techniques
              </h4>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Renforcer les contrôles d'accès</li>
                <li>Améliorer la surveillance et la détection</li>
                <li>Mettre en place des sauvegardes régulières</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Suivi et amélioration
              </h4>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Réviser l'analyse des risques tous les 6 mois</li>
                <li>Mettre à jour le plan de traitement des risques</li>
                <li>Effectuer des tests de sécurité réguliers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}