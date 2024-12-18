import React from 'react';
import { StepHeader } from '../StepHeader';
import { Button } from '../Button';
import { Asset, Threat, Scenario, Risk } from '../../types';

interface ResultsStepProps {
  onBack: () => void;
  risks: Risk[];
  scenarios: Scenario[];
  assets: Asset[];
  threats: Threat[];
}

export function ResultsStep({ onBack, risks, scenarios, assets, threats }: ResultsStepProps) {
  // Fonction pour retrouver le nom d'un actif à partir de son ID
  const getAssetName = (assetId: string) => {
    return assets.find((a) => a.id === assetId)?.name || 'Actif inconnu';
  };

  // Fonction pour retrouver le nom d'une menace à partir de son ID
  const getThreatName = (threatId: string) => {
    return threats.find((t) => t.id === threatId)?.name || 'Menace inconnue';
  };

  // Fonction pour calculer le niveau de risque (à adapter selon votre méthode de calcul)
  const calculateRiskLevel = (probability: number, impact: number) => {
    return probability * impact;
  };

  return (
    <div className="space-y-6">
      <StepHeader
        step={5}
        title="Synthèse et stratégie de traitement du risque"
        description="Visualisez les résultats de l'analyse et définissez la stratégie de traitement du risque."
      />

      {/* Affichage des scénarios et des risques associés */}
      {scenarios.map((scenario) => (
        <div key={scenario.id} className="bg-gray-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold text-gray-900">{scenario.name}</h3>
          <p className="text-gray-600">{scenario.description}</p>

          <div className="mt-4">
            <h4 className="font-medium">Actifs concernés :</h4>
            <ul className="list-disc list-inside">
              {scenario.assets.map((assetId) => (
                <li key={assetId}>{getAssetName(assetId)}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h4 className="font-medium">Menaces associées :</h4>
            <ul className="list-disc list-inside">
              {scenario.threats.map((threatId) => (
                <li key={threatId}>{getThreatName(threatId)}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h4 className="font-medium">Risques :</h4>
            {/* Filtrer les risques liés au scénario actuel */}
            {risks.filter((risk) => risk.scenarioId === scenario.id).length > 0 ? (
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 text-left">Probabilité</th>
                    <th className="py-2 px-4 text-left">Impact</th>
                    <th className="py-2 px-4 text-left">Niveau de risque</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {risks
                    .filter((risk) => risk.scenarioId === scenario.id)
                    .map((risk) => (
                      <tr key={risk.id}>
                        <td className="py-2 px-4">{risk.probability}</td>
                        <td className="py-2 px-4">{risk.impact}</td>
                        <td className="py-2 px-4">
                          {calculateRiskLevel(risk.probability, risk.impact)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <p>Aucun risque associé à ce scénario.</p>
            )}
          </div>
        </div>
      ))}

      {/* Section pour la stratégie de traitement du risque (à compléter) */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-gray-900">Stratégie de traitement du risque</h3>
        <p>Définissez ici les actions à mettre en place pour traiter les risques identifiés (réduction, transfert, acceptation, etc.).</p>
        {/* Ajoutez des composants (TextArea, Button, etc.) pour permettre à l'utilisateur de définir la stratégie de traitement du risque */}
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="secondary" onClick={onBack}>
          Retour
        </Button>
        {/*  
        <Button type="submit">
          Terminer
        </Button> 
        */}
      </div>
    </div>
  );
}