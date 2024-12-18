import React from 'react';
import { TextArea } from '../../../TextArea';
import { Button } from '../../../Button';
import { MultiSelect } from '../../../MultiSelect';
import type { Workshop1Data, Asset } from '../types';

interface AssetsStepProps {
  data: Workshop1Data;
  onUpdate: (data: Workshop1Data) => void;
}

export function AssetsStep({ data, onUpdate }: AssetsStepProps) {
  const [currentAsset, setCurrentAsset] = React.useState<Partial<Asset>>({
    name: '',
    description: '',
    type: 'hardware',
    businessValues: []
  });

  const handleAddAsset = () => {
    if (currentAsset.name && currentAsset.description) {
      const newAsset: Asset = {
        ...currentAsset as Asset,
        id: crypto.randomUUID()
      };
      
      onUpdate({
        ...data,
        assets: [...data.assets, newAsset]
      });
      
      setCurrentAsset({
        name: '',
        description: '',
        type: 'hardware',
        businessValues: []
      });
    }
  };

  const handleRemoveAsset = (id: string) => {
    onUpdate({
      ...data,
      assets: data.assets.filter(a => a.id !== id)
    });
  };

  const assetTypes = [
    { value: 'hardware', label: 'Matériel' },
    { value: 'software', label: 'Logiciel' },
    { value: 'network', label: 'Réseau' },
    { value: 'personnel', label: 'Personnel' },
    { value: 'site', label: 'Site' },
    { value: 'organization', label: 'Organisation' }
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Biens supports essentiels
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Identifiez les biens supports nécessaires aux valeurs métier.
        </p>
      </div>

      <div className="space-y-4">
        <TextArea
          label="Nom du bien support"
          value={currentAsset.name}
          onChange={(e) => setCurrentAsset({ ...currentAsset, name: e.target.value })}
          placeholder="Ex: Serveur de base de données, Poste de travail..."
        />

        <TextArea
          label="Description"
          value={currentAsset.description}
          onChange={(e) => setCurrentAsset({ ...currentAsset, description: e.target.value })}
          placeholder="Décrivez le bien support et son rôle..."
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type de bien support
          </label>
          <select
            value={currentAsset.type}
            onChange={(e) => setCurrentAsset({ 
              ...currentAsset, 
              type: e.target.value as Asset['type']
            })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {assetTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <MultiSelect
          label="Valeurs métier associées"
          id="businessValues"
          options={data.businessValues.map(value => ({
            id: value.id,
            name: value.name
          }))}
          selectedIds={currentAsset.businessValues || []}
          onChange={(selectedIds) => setCurrentAsset({
            ...currentAsset,
            businessValues: selectedIds
          })}
          placeholder="Sélectionnez les valeurs métier..."
        />

        <Button
          type="button"
          onClick={handleAddAsset}
          disabled={!currentAsset.name || !currentAsset.description}
          className="w-full"
        >
          Ajouter le bien support
        </Button>
      </div>

      {data.assets.length > 0 && (
        <div className="mt-8">
          <h4 className="font-medium text-gray-900 mb-4">Biens supports identifiés</h4>
          <div className="space-y-4">
            {data.assets.map((asset) => (
              <div
                key={asset.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium text-gray-900">{asset.name}</h5>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {assetTypes.find(t => t.value === asset.type)?.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{asset.description}</p>
                    {asset.businessValues.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">Valeurs métier :</p>
                        <div className="flex flex-wrap gap-1">
                          {asset.businessValues.map(valueId => {
                            const value = data.businessValues.find(v => v.id === valueId);
                            return value ? (
                              <span
                                key={valueId}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                {value.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleRemoveAsset(asset.id)}
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