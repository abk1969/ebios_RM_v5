import React from 'react';
import { TextArea } from '../../../TextArea';
import { Button } from '../../../Button';
import type { Workshop5Data } from '../types';

interface MonitoringPlanStepProps {
  data: Workshop5Data;
  onUpdate: (data: Workshop5Data) => void;
}

export function MonitoringPlanStep({ data, onUpdate }: MonitoringPlanStepProps) {
  const [currentPlan, setCurrentPlan] = React.useState<{
    name: string;
    frequency: Workshop5Data['monitoringPlan'][number]['frequency'];
    indicators: string;
    stakeholders: string;
  }>({
    name: '',
    frequency: 'quarterly',
    indicators: '',
    stakeholders: ''
  });

  const handleAddPlan = () => {
    if (currentPlan.name && currentPlan.indicators && currentPlan.stakeholders) {
      onUpdate({
        ...data,
        monitoringPlan: [...data.monitoringPlan, {
          id: crypto.randomUUID(),
          name: currentPlan.name,
          frequency: currentPlan.frequency,
          indicators: currentPlan.indicators.split('\n').filter(i => i.trim()),
          stakeholders: currentPlan.stakeholders.split('\n').filter(s => s.trim())
        }]
      });
      
      setCurrentPlan({
        name: '',
        frequency: 'quarterly',
        indicators: '',
        stakeholders: ''
      });
    }
  };

  const handleRemovePlan = (id: string) => {
    onUpdate({
      ...data,
      monitoringPlan: data.monitoringPlan.filter(p => p.id !== id)
    });
  };

  const frequencies = [
    { value: 'monthly', label: 'Mensuelle' },
    { value: 'quarterly', label: 'Trimestrielle' },
    { value: 'biannual', label: 'Semestrielle' },
    { value: 'annual', label: 'Annuelle' }
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Plan de suivi
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Définissez le plan de suivi des risques et des mesures.
        </p>
      </div>

      <div className="space-y-4">
        <TextArea
          label="Nom du plan"
          value={currentPlan.name}
          onChange={(e) => setCurrentPlan({ ...currentPlan, name: e.target.value })}
          placeholder="Ex: Suivi des incidents de sécurité..."
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fréquence de suivi
          </label>
          <select
            value={currentPlan.frequency}
            onChange={(e) => setCurrentPlan({ 
              ...currentPlan, 
              frequency: e.target.value as typeof currentP lan.frequency
            })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {frequencies.map(freq => (
              <option key={freq.value} value={freq.value}>
                {freq.label}
              </option>
            ))}
          </select>
        </div>

        <TextArea
          label="Indicateurs (un par ligne)"
          value={currentPlan.indicators}
          onChange={(e) => setCurrentPlan({ ...currentPlan, indicators: e.target.value })}
          placeholder="Ex: Nombre d'incidents\nTaux de conformité..."
        />

        <TextArea
          label="Parties prenantes (une par ligne)"
          value={currentPlan.stakeholders}
          onChange={(e) => setCurrentPlan({ ...currentPlan, stakeholders: e.target.value })}
          placeholder="Ex: RSSI\nResponsable sécurité..."
        />

        <Button
          type="button"
          onClick={handleAddPlan}
          disabled={!currentPlan.name || !currentPlan.indicators || !currentPlan.stakeholders}
          className="w-full"
        >
          Ajouter le plan
        </Button>
      </div>

      {data.monitoringPlan.length > 0 && (
        <div className="mt-8">
          <h4 className="font-medium text-gray-900 mb-4">Plans de suivi définis</h4>
          <div className="space-y-4">
            {data.monitoringPlan.map((plan) => (
              <div
                key={plan.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium text-gray-900">{plan.name}</h5>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {frequencies.find(f => f.value === plan.frequency)?.label}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <h6 className="text-sm font-medium text-gray-700 mb-2">Indicateurs</h6>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {plan.indicators.map((indicator, index) => (
                            <li key={index}>{indicator}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h6 className="text-sm font-medium text-gray-700 mb-2">Parties prenantes</h6>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {plan.stakeholders.map((stakeholder, index) => (
                            <li key={index}>{stakeholder}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleRemovePlan(plan.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}