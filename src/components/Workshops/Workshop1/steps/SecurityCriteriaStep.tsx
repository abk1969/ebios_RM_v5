import React from 'react';
import { TextArea } from '../../../TextArea';
import { Button } from '../../../Button';
import type { Workshop1Data, SecurityCriterion } from '../types';

interface SecurityCriteriaStepProps {
  data: Workshop1Data;
  onUpdate: (data: Workshop1Data) => void;
}

export function SecurityCriteriaStep({ data, onUpdate }: SecurityCriteriaStepProps) {
  const [currentCriterion, setCurrentCriterion] = React.useState<Partial<SecurityCriterion>>({
    name: '',
    description: '',
    type: 'confidentiality',
    scale: {
      low: '',
      medium: '',
      high: '',
      critical: ''
    }
  });

  const handleAddCriterion = () => {
    if (currentCriterion.name && currentCriterion.description) {
      const newCriterion: SecurityCriterion = {
        ...currentCriterion as SecurityCriterion,
        id: crypto.randomUUID()
      };
      
      onUpdate({
        ...data,
        securityCriteria: [...data.securityCriteria, newCriterion]
      });
      
      setCurrentCriterion({
        name: '',
        description: '',
        type: 'confidentiality',
        scale: {
          low: '',
          medium: '',
          high: '',
          critical: ''
        }
      });
    }
  };

  const handleRemoveCriterion = (id: string) => {
    onUpdate({
      ...data,
      securityCriteria: data.securityCriteria.filter(c => c.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Définition des critères de sécurité
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Définissez les critères de sécurité et leurs échelles d'évaluation.
        </p>
      </div>

      <div className="space-y-4">
        <TextArea
          label="Nom du critère"
          value={currentCriterion.name}
          onChange={(e) => setCurrentCriterion({ ...currentCriterion, name: e.target.value })}
          placeholder="Ex: Confidentialité des données clients..."
        />

        <TextArea
          label="Description"
          value={currentCriterion.description}
          onChange={(e) => setCurrentCriterion({ ...currentCriterion, description: e.target.value })}
          placeholder="Décrivez le critère de sécurité..."
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type de critère
          </label>
          <select
            value={currentCriterion.type}
            onChange={(e) => setCurrentCriterion({ 
              ...currentCriterion, 
              type: e.target.value as SecurityCriterion['type']
            })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="confidentiality">Confidentialité</option>
            <option value="integrity">Intégrité</option>
            <option value="availability">Disponibilité</option>
          </select>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Échelle d'évaluation</h4>
          {(['low', 'medium', 'high', 'critical'] as const).map((level) => (
            <TextArea
              key={level}
              label={level === 'critical' ? 'Critique' :
                     level === 'high' ? 'Élevé' :
                     level === 'medium' ? 'Moyen' : 'Faible'}
              value={currentCriterion.scale?.[level] || ''}
              onChange={(e) => setCurrentCriterion({
                ...currentCriterion,
                scale: {
                  ...currentCriterion.scale,
                  [level]: e.target.value
                }
              })}
              placeholder={`Description du niveau ${level}...`}
            />
          ))}
        </div>

        <Button
          type="button"
          onClick={handleAddCriterion}
          disabled={!currentCriterion.name || !currentCriterion.description}
          className="w-full"
        >
          Ajouter le critère
        </Button>
      </div>

      {data.securityCriteria.length > 0 && (
        <div className="mt-8">
          <h4 className="font-medium text-gray-900 mb-4">Critères définis</h4>
          <div className="space-y-4">
            {data.securityCriteria.map((criterion) => (
              <div
                key={criterion.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900">{criterion.name}</h5>
                    <p className="text-sm text-gray-600 mt-1">{criterion.description}</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                      {criterion.type === 'confidentiality' ? 'Confidentialité' :
                       criterion.type === 'integrity' ? 'Intégrité' : 'Disponibilité'}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleRemoveCriterion(criterion.id)}
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