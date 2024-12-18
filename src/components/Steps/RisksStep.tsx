import React, { useState } from 'react';
import { StepHeader } from '../StepHeader';
import { Button } from '../Button';
import { RiskEvaluator } from '../RiskEvaluator';
import { RiskReport } from '../Report/RiskReport';
import { generatePDF, shareReport } from '../../utils/reportUtils';
import type { Risk, Scenario, Asset, Threat } from '../../types';
import { Download, Share2 } from 'lucide-react';

interface RisksStepProps {
  onSubmit: (risks: Risk[]) => void;
  onBack: () => void;
  risks: Risk[];
  scenarios: Scenario[];
  assets: Asset[];
  threats: Threat[];
}

export function RisksStep({
  onSubmit,
  onBack,
  risks: initialRisks,
  scenarios,
  assets,
  threats,
}: RisksStepProps) {
  const [risks, setRisks] = useState<Risk[]>(initialRisks);
  const [currentScenarioId, setCurrentScenarioId] = useState<string | null>(null);
  const [showReport, setShowReport] = useState(false);

  const handleSaveRisk = (risk: Risk) => {
    const existingIndex = risks.findIndex((r) => r.id === risk.id);
    if (existingIndex >= 0) {
      setRisks((prev) =>
        prev.map((r) => (r.id === risk.id ? risk : r))
      );
    } else {
      setRisks((prev) => [...prev, risk]);
    }
    setCurrentScenarioId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(risks);
    setShowReport(true);
  };

  const handleExportPDF = async () => {
    try {
      await generatePDF();
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Une erreur est survenue lors de la génération du PDF.');
    }
  };

  const handleShare = () => {
    try {
      shareReport();
    } catch (error) {
      console.error('Failed to share report:', error);
      alert('Une erreur est survenue lors du partage du rapport.');
    }
  };

  if (showReport) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Rapport d'analyse</h2>
          <div className="space-x-4">
            <Button onClick={handleExportPDF} variant="secondary">
              <Download className="w-4 h-4 mr-2" />
              Exporter en PDF
            </Button>
            <Button onClick={handleShare} variant="secondary">
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </Button>
          </div>
        </div>
        <RiskReport
          risks={risks}
          scenarios={scenarios}
          assets={assets}
          threats={threats}
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <StepHeader
        step={5}
        title="Évaluation des risques"
        description="Évaluez les risques pour chaque scénario identifié"
      />

      <div className="space-y-4">
        {scenarios.map((scenario) => (
          <div key={scenario.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium">{scenario.name}</h3>
                <p className="text-sm text-gray-600">{scenario.description}</p>
              </div>
              {!currentScenarioId && (
                <Button
                  type="button"
                  onClick={() => setCurrentScenarioId(scenario.id)}
                  variant="secondary"
                >
                  {risks.find(r => r.scenarioId === scenario.id)
                    ? "Modifier l'évaluation"
                    : 'Évaluer le risque'}
                </Button>
              )}
            </div>

            {currentScenarioId === scenario.id && (
              <RiskEvaluator
                scenarioName={scenario.name}
                scenarioId={scenario.id}
                initialRisk={risks.find(r => r.scenarioId === scenario.id)}
                onSave={handleSaveRisk}
                onCancel={() => setCurrentScenarioId(null)}
              />
            )}

            {risks.find(r => r.scenarioId === scenario.id) && !currentScenarioId && (
              <div className="mt-2 text-sm">
                <p>
                  Probabilité:{' '}
                  <span className="font-medium">
                    {risks.find(r => r.scenarioId === scenario.id)?.probability}/5
                  </span>
                </p>
                <p>
                  Impact:{' '}
                  <span className="font-medium">
                    {risks.find(r => r.scenarioId === scenario.id)?.impact}/5
                  </span>
                </p>
                <p>
                  Niveau de risque:{' '}
                  <span className="font-medium">
                    {risks.find(r => r.scenarioId === scenario.id)?.level}
                  </span>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="secondary" onClick={onBack}>
          Retour
        </Button>
        <Button
          type="submit"
          disabled={risks.length < scenarios.length}
        >
          Terminer l'évaluation
        </Button>
      </div>
    </form>
  );
}