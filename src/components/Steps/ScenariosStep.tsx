import React, { useState } from 'react';
import { StepHeader } from '../StepHeader';
import { TextArea } from '../TextArea';
import { Button } from '../Button';
import { MultiSelect } from '../MultiSelect';
import { PlusCircle, Trash2, Edit } from 'lucide-react';
import type { Scenario, Asset, Threat } from '../../types';

interface ScenariosStepProps {
  onNext: (scenarios: Scenario[]) => void;
  onBack: () => void;
  assets: Asset[];
  threats: Threat[];
  scenarios: Scenario[];
}

export function ScenariosStep({
  onNext,
  onBack,
  assets,
  threats,
  scenarios: initialScenarios,
}: ScenariosStepProps) {
  const [scenarios, setScenarios] = useState<Scenario[]>(initialScenarios);
  const [currentScenario, setCurrentScenario] = useState<Scenario>({
    id: '',
    name: '',
    description: '',
    threats: [],
    assets: [],
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const validateScenario = (scenario: Scenario) => {
    if (!scenario.name.trim()) {
      return 'Le nom du scénario est requis';
    }
    if (!scenario.description.trim()) {
      return 'La description du scénario est requise';
    }
    if (scenario.threats.length === 0) {
      return 'Au moins une menace doit être sélectionnée';
    }
    if (scenario.assets.length === 0) {
      return 'Au moins un actif doit être sélectionné';
    }
    return '';
  };

  const handleAddScenario = () => {
    const validationError = validateScenario(currentScenario);
    if (validationError) {
      setError(validationError);
      return;
    }

    setScenarios((prev) => [
      ...prev,
      { ...currentScenario, id: currentScenario.id || crypto.randomUUID() },
    ]);
    setCurrentScenario({
      id: '',
      name: '',
      description: '',
      threats: [],
      assets: [],
    });
    setEditMode(false);
    setError('');
  };

  const handleEditScenario = (id: string) => {
    const scenarioToEdit = scenarios.find((scenario) => scenario.id === id);
    if (scenarioToEdit) {
      setCurrentScenario(scenarioToEdit);
      setEditMode(true);
      setError('');
    }
  };

  const handleUpdateScenario = () => {
    const validationError = validateScenario(currentScenario);
    if (validationError) {
      setError(validationError);
      return;
    }

    setScenarios((prev) =>
      prev.map((scenario) =>
        scenario.id === currentScenario.id ? currentScenario : scenario
      )
    );
    setCurrentScenario({
      id: '',
      name: '',
      description: '',
      threats: [],
      assets: [],
    });
    setEditMode(false);
    setError('');
  };

  const handleRemoveScenario = (id: string) => {
    setScenarios((prev) => prev.filter((scenario) => scenario.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (scenarios.length === 0) {
      setError('Au moins un scénario doit être créé');
      return;
    }
    onNext(scenarios);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <StepHeader
        step={4}
        title="Scénarios de risque"
        description="Définissez les scénarios de risque en associant menaces et actifs"
      />

      <div className="space-y-4">
        <TextArea
          label="Nom du scénario"
          id="scenarioName"
          value={currentScenario.name}
          onChange={(e) =>
            setCurrentScenario((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Nom du scénario..."
          error={error}
        />

        <TextArea
          label="Description"
          id="scenarioDescription"
          value={currentScenario.description}
          onChange={(e) =>
            setCurrentScenario((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          placeholder="Description du scénario..."
        />

        <MultiSelect
          label="Menaces associées"
          id="threats"
          options={threats.map((threat) => ({
            id: threat.id,
            name: threat.name,
          }))}
          selectedIds={currentScenario.threats}
          onChange={(selectedIds) =>
            setCurrentScenario((prev) => ({ ...prev, threats: selectedIds }))
          }
          placeholder="Sélectionnez les menaces..."
        />

        <MultiSelect
          label="Actifs concernés"
          id="assets"
          options={assets.map((asset) => ({
            id: asset.id,
            name: asset.name,
          }))}
          selectedIds={currentScenario.assets}
          onChange={(selectedIds) =>
            setCurrentScenario((prev) => ({ ...prev, assets: selectedIds }))
          }
          placeholder="Sélectionnez les actifs..."
        />

        <Button
          type="button"
          onClick={editMode ? handleUpdateScenario : handleAddScenario}
          className="flex items-center gap-2"
          disabled={!currentScenario.name.trim() || !currentScenario.description.trim()}
        >
          <PlusCircle className="w-4 h-4" />
          {editMode ? 'Modifier le scénario' : 'Ajouter le scénario'}
        </Button>
      </div>

      {scenarios.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            Scénarios identifiés
          </h3>
          <div className="space-y-3">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className="p-4 bg-gray-50 rounded-lg space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {scenario.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {scenario.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditScenario(scenario.id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveScenario(scenario.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-700">Menaces :</p>
                  <ul className="list-disc list-inside text-gray-600 ml-2">
                    {scenario.threats.map((threatId) => (
                      <li key={threatId}>
                        {threats.find((t) => t.id === threatId)?.name ||
                          'Menace inconnue'}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-700">Actifs :</p>
                  <ul className="list-disc list-inside text-gray-600 ml-2">
                    {scenario.assets.map((assetId) => (
                      <li key={assetId}>
                        {assets.find((a) => a.id === assetId)?.name ||
                          'Actif inconnu'}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <Button type="button" variant="secondary" onClick={onBack}>
          Retour
        </Button>
        <Button type="submit" disabled={scenarios.length === 0}>
          Suivant
        </Button>
      </div>
    </form>
  );
}