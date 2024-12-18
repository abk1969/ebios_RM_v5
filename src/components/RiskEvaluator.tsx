import React, { useState, useEffect } from 'react';
import { Button } from './Button'; // Assuming you have a Button component
import type { Risk } from '../types';

interface RiskEvaluatorProps {
  scenarioName: string;
  scenarioId: string;
  initialRisk?: Risk;
  onSave: (risk: Risk) => void;
  onCancel: () => void;
}

export function RiskEvaluator({
  scenarioName,
  scenarioId,
  initialRisk,
  onSave,
  onCancel,
}: RiskEvaluatorProps) {
  const [probability, setProbability] = useState<number>(
    initialRisk?.probability || 1
  );
  const [impact, setImpact] = useState<number>(initialRisk?.impact || 1);
  const [comment, setComment] = useState<string>(initialRisk?.comment || ''); // Add a comment state

  // Labels for probability and impact levels
  const probabilityLabels = [
    'Très faible',
    'Faible',
    'Modérée',
    'Élevée',
    'Très élevée',
  ];
  const impactLabels = [
    'Négligeable',
    'Faible',
    'Modéré',
    'Important',
    'Critique',
  ];

  // Function to calculate the risk level with customizable scale
  const calculateLevel = (prob: number, imp: number, scale: number = 5) => {
    // Ensure the inputs are within the 1-5 range
    const normalizedProb = Math.max(1, Math.min(prob, scale));
    const normalizedImp = Math.max(1, Math.min(imp, scale));

    // Perform the calculation (e.g., multiplication)
    return normalizedProb * normalizedImp;
  };

  // Get the risk level
  const riskLevel = calculateLevel(probability, impact);

  // Function to determine the risk level label
  const getRiskLevelLabel = (level: number) => {
    if (level <= 5) return 'Faible';
    if (level <= 10) return 'Modéré';
    if (level <= 15) return 'Élevé';
    return 'Critique';
  };

  const handleSave = () => {
    const risk: Risk = {
      id: initialRisk?.id || crypto.randomUUID(),
      scenarioId,
      probability,
      impact,
      level: riskLevel,
      comment: comment, // Save the comment along with other risk data
    };
    onSave(risk);
  };

  // Reset the form when the scenario changes
  useEffect(() => {
    setProbability(initialRisk?.probability || 1);
    setImpact(initialRisk?.impact || 1);
    setComment(initialRisk?.comment || '');
  }, [scenarioId, initialRisk]);

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      <h4 className="font-medium text-gray-900 mb-4">{scenarioName}</h4>

      <div className="space-y-4">
        {/* Probability Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Probabilité
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={probability}
            onChange={(e) => setProbability(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600">
            {probabilityLabels.map((label, index) => (
              <span key={index} className="w-1/5 text-center">
                {label}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Valeur actuelle : {probability} -{' '}
            {probabilityLabels[probability - 1]}
          </p>
        </div>

        {/* Impact Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Impact
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={impact}
            onChange={(e) => setImpact(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600">
            {impactLabels.map((label, index) => (
              <span key={index} className="w-1/5 text-center">
                {label}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Valeur actuelle : {impact} - {impactLabels[impact - 1]}
          </p>
        </div>

        {/* Comment Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Commentaire (facultatif)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ajouter un commentaire sur l'évaluation du risque..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Risk Level Display */}
        <div className="pt-2">
          <p className="text-sm font-medium text-gray-700">
            Niveau de risque :{' '}
            <span
              className={`text-${getRiskLevelLabel(
                riskLevel
              ).toLowerCase()}-600`}
            >
              {riskLevel} ({getRiskLevelLabel(riskLevel)})
            </span>
          </p>
        </div>

        {/* Save and Cancel Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="button" onClick={handleSave}>
            Enregistrer l'évaluation
          </Button>
        </div>
      </div>
    </div>
  );
}
