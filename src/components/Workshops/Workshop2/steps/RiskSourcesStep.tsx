import React from 'react';
import { TextArea } from '../../../TextArea';
import { Button } from '../../../Button';
import type { Workshop2Data, RiskSource } from '../types';

interface RiskSourcesStepProps {
  data: Workshop2Data;
  onUpdate: (data: Workshop2Data) => void;
}

export function RiskSourcesStep({ data, onUpdate }: RiskSourcesStepProps) {
  const [currentSource, setCurrentSource] = React.useState<Partial<RiskSource>>({
    name: '',
    description: '',
    category: 'organization',
    motivation: '',
    capabilities: {
      technical: 1,
      financial: 1,
      human: 1
    },
    opportunities: []
  });

  const handleAddSource = () => {
    if (currentSource.name && currentSource.description && currentSource.motivation) {
      const newSource: RiskSource = {
        ...currentSource as RiskSource,
        id: crypto.randomUUID()
      };
      
      onUpdate({
        ...data,
        riskSources: [...data.riskSources, newSource]
      });
      
      setCurrentSource({
        name: '',
        description: '',
        category: 'organization',
        motivation: '',
        capabilities: {
          technical: 1,
          financial: 1,
          human: 1
        },
        opportunities: []
      });
    }
  };

  const handleRemoveSource = (id: string) => {
    onUpdate({
      ...data,
      riskSources: data.riskSources.filter(s => s.id !== id)
    });
  };

  const sourceCategories = [
    { value: 'state', label: 'État / Nation' },
    { value: 'organization', label: 'Organisation' },
    { value: 'individual', label: 'Individu' },
    { value: 'environmental', label: 'Environnemental' }
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Sources de risque
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Identifiez et caractérisez les sources de risque pertinentes.
        </p>
      </div>

      <div className="space-y-4">
        <TextArea
          label="Nom de la source"
          value={currentSource.name}
          onChange={(e) => setCurrentSource({ ...currentSource, name: e.target.value })}
          placeholder="Ex: Cybercriminels organisés, Hacktivistes..."
        />

        <TextArea
          label="Description"
          value={currentSource.description}
          onChange={(e) => setCurrentSource({ ...currentSource, description: e.target.value })}
          placeholder="Décrivez la source de risque..."
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Catégorie
          </label>
          <select
            value={currentSource.category}
            onChange={(e) => setCurrentSource({ 
              ...currentSource, 
              category: e.target.value as RiskSource['category']
            })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {sourceCategories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <TextArea
          label="Motivation"
          value={currentSource.motivation}
          onChange={(e) => setCurrentSource({ ...currentSource, motivation: e.target.value })}
          placeholder="Décrivez les motivations de cette source..."
        />

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Capacités</h4>
          
          {['technical', 'financial', 'human'].map((capability) => (
            <div key={capability}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {capability === 'technical' ? 'Techniques' :
                 capability === 'financial' ? 'Financières' : 'Humaines'}
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={currentSource.capabilities?.[capability as keyof RiskSource['capabilities']] || 1}
                onChange={(e) => setCurrentSource({
                  ...currentSource,
                  capabilities: {
                    ...currentSource.capabilities,
                    [capability]: Number(e.target.value)
                  }
                })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Très faibles</span>
                <span>Très élevées</span>
              </div>
            </div>
          ))}
        </div>

        <Button
          type="button"
          onClick={handleAddSource}
          disabled={!currentSource.name || !currentSource.description || !currentSource.motivation}
          className="w-full"
        >
          Ajouter la source
        </Button>
      </div>

      {data.riskSources.length > 0 && (
        <div className="mt-8">
          <h4 className="font-medium text-gray-900 mb-4">Sources identifiées</h4>
          <div className="space-y-4">
            {data.riskSources.map((source) => (
              <div
                key={source.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium text-gray-900">{source.name}</h5>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {sourceCategories.find(c => c.value === source.category)?.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{source.description}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Motivation :</span> {source.motivation}
                    </p>
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-gray-500">Capacités :</p>
                      <div className="flex gap-4">
                        {Object.entries(source.capabilities).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-1">
                            <span className="text-xs text-gray-600">
                              {key === 'technical' ? 'Tech.' :
                               key === 'financial' ? 'Fin.' : 'Hum.'}
                            </span>
                            <span className="font-medium text-xs">{value}/5</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleRemoveSource(source.id)}
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