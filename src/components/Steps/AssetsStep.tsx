import React from 'react';
import { StepHeader } from '../StepHeader';
import { TextArea } from '../TextArea';
import { Button } from '../Button';
import type { Asset } from '../../types';

interface AssetsStepProps {
  onNext: (assets: Asset[]) => void;
  onBack: () => void;
  assets: Asset[];
}

export function AssetsStep({ onNext, onBack, assets: initialAssets }: AssetsStepProps) {
  const [assets, setAssets] = React.useState<Asset[]>(initialAssets);
  const [currentAsset, setCurrentAsset] = React.useState<Asset>({ 
    id: '', 
    name: '', 
    description: '' 
  });
  const [error, setError] = React.useState<string>('');

  const validateAsset = (asset: Partial<Asset>) => {
    if (!asset.name?.trim()) {
      return "Le nom de l'actif est requis";
    }
    if (!asset.description?.trim()) {
      return "La description de l'actif est requise";
    }
    return '';
  };

  const handleAddAsset = () => {
    const validationError = validateAsset(currentAsset);
    if (validationError) {
      setError(validationError);
      return;
    }

    setAssets([
      ...assets,
      { ...currentAsset, id: currentAsset.id || crypto.randomUUID() },
    ]);
    setCurrentAsset({ id: '', name: '', description: '' });
    setError('');
  };

  const handleEditAsset = (id: string) => {
    const assetToEdit = assets.find((asset) => asset.id === id);
    if (assetToEdit) {
      setCurrentAsset(assetToEdit);
      handleDeleteAsset(id);
    }
  };

  const handleDeleteAsset = (id: string) => {
    setAssets(assets.filter((asset) => asset.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (assets.length === 0) {
      setError('Au moins un actif doit être ajouté');
      return;
    }
    onNext(assets);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <StepHeader
        step={2}
        title="Actifs essentiels"
        description="Identifiez les actifs essentiels."
      />

      <div className="space-y-4">
        <TextArea
          label="Nom de l'actif"
          id="assetName"
          value={currentAsset.name}
          onChange={(e) =>
            setCurrentAsset((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Nom de l'actif..."
          error={error}
        />

        <TextArea
          label="Description"
          id="assetDescription"
          value={currentAsset.description}
          onChange={(e) =>
            setCurrentAsset((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Description de l'actif..."
        />

        <Button
          type="button"
          onClick={handleAddAsset}
          disabled={!currentAsset.name.trim() || !currentAsset.description.trim()}
          className="w-full flex items-center justify-center"
        >
          Ajouter l'actif
        </Button>
      </div>

      {assets.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-medium mb-2">Actifs ajoutés :</h4>
          <ul className="space-y-2">
            {assets.map((asset) => (
              <li
                key={asset.id}
                className="flex items-center justify-between border-b py-2"
              >
                <div>
                  <h5 className="font-medium">{asset.name}</h5>
                  <p className="text-sm text-gray-600">{asset.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => handleEditAsset(asset.id)}
                  >
                    Modifier
                  </Button>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleDeleteAsset(asset.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-between">
        <Button type="button" variant="secondary" onClick={onBack}>
          Retour
        </Button>
        <Button type="submit" disabled={assets.length === 0}>
          Suivant
        </Button>
      </div>
    </form>
  );
}