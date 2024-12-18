import React from 'react';
import { TextArea } from '../../../TextArea';
import { Button } from '../../../Button';
import type { Workshop1Data, SecurityNeed } from '../types';

interface SecurityNeedsStepProps {
  data: Workshop1Data;
  onUpdate: (data: Workshop1Data) => void;
}

export function SecurityNeedsStep({ data, onUpdate }: SecurityNeedsStepProps) {
  const [currentNeed, setCurrentNeed] = React.useState<Partial<SecurityNeed>>({
    businessValueId: '',
    criterionId: '',
    level: 'medium',
    justification: ''
  });

  const handleAddNeed = () => {
    if (currentNeed.businessValueId && currentNeed.criterionId && currentNeed.justification) {
      const newNeed: SecurityNeed = {
        ...currentNeed as SecurityNeed,
        id: crypto.randomUUID()
      };
      
      onUpdate({
        ...data,
        securityNeeds: [...data.securityNeeds, newNeed]
      });
      
      setCurrentNeed({
        businessValueId: '',
        criterionId: '',
        level: 'medium',
        justification: ''
      });
    }
  };

  const handleRemoveNeed = (id: string) => {
    onUpdate({
      ...data,
      securityNeeds: data.securityNeeds.filter(n => n.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Évaluation des besoins de sécurité
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Évaluez les besoins de sécurité pour chaque valeur métier selon les critères définis.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Valeur métier
          </label>
          <select
            value={currentNeed.businessValueId}
            onChange={(e) => setCurrentNeed({ 
              ...currentNeed, 
              businessValueId: e.target.value
            })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Sélectionnez une valeur métier</option>
            {data.businessValues.map(value => (
              <option key={value.id} value={value.id}>{value.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Critère de sécurité
          </label>
          <select
            value={currentNeed.criterionId}
            onChange={(e) => setCurrentNeed({ 
              ...currentNeed, 
              criterionId: e.target.value
            })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Sélectionnez un critère</option>
            {data.securityCriteria.map(criterion => (
              <option key={criterion.id} value={criterion.id}>{criterion.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Niveau requis
          </label>
          <select
            value={currentNeed.level}
            onChange={(e) => setCurrentNeed({ 
              ...currentNeed, 
              level: e.target.value as SecurityNeed['level']
            })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="low">Faible</option>
            <option value="medium">Moyen</option>
            <option value="high">Élevé</option>
            <option value="critical">Critique</option>
          </select>
        </div>

        <TextArea
          label="Justification"
          value={currentNeed.justification}
          onChange={(e) => setCurrentNeed({ 
            ...currentNeed, 
            justification: e.target.value 
          })}
          placeholder="Justifiez le niveau de besoin de sécurité requis..."
        />

        <Button
          type="button"
          onClick={handleAddNeed}
          disabled={!currentNeed.businessValueId || !currentNeed.criterionId || !currentNeed.justification}
          className="w-full"
        >
          Ajouter le besoin
        </Button>
      </div>

      {data.securityNeeds.length > 0 && (
        <div className="mt-8">
          <h4 className="font-medium text-gray-900 mb-4">Besoins de sécurité définis</h4>
          <div className="space-y-4">
            {data.securityNeeds.map((need) => {
              const businessValue = data.businessValues.find(v => v.id === need.businessValueId);
              const criterion = data.securityCriteria.find(c => c.id === need.criterionId);

              return (
                <div
                  key={need.id}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-medium text-gray-900">
                          {businessValue?.name}
                        </h5>
                        <span className="text-gray-500">→</span>
                        <span className="text-sm text-gray-600">
                          {criterion?.name}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className={`
                          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${need.level === 'critical' ? 'bg-red-100 text-red-800' :
                            need.level === 'high' ? 'bg-orange-100 text-orange-800' :
                            need.level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'}
                        `}>
                          {need.level === 'critical' ? 'Critique' :
                           need.level === 'high' ? 'Élevé' :
                           need.level === 'medium' ? 'Moyen' : 'Faible'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{need.justification}</p>
                    </div>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => handleRemoveNeed(need.id)}
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}