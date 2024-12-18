import React from 'react';
import { StepHeader } from '../StepHeader';
import { TextArea } from '../TextArea';
import { Button } from '../Button';
import type { Threat } from '../../types';
import { PlusCircle, Trash2, Edit } from 'lucide-react';

interface ThreatsStepProps {
  onNext: (threats: Threat[]) => void;
  onBack: () => void;
  threats: Threat[];
}

export function ThreatsStep({
  onNext,
  onBack,
  threats: initialThreats,
}: ThreatsStepProps) {
  const [threats, setThreats] = React.useState<Threat[]>(initialThreats);
  const [currentThreat, setCurrentThreat] = React.useState<Threat>({
    id: '',
    name: '',
    description: '',
  });
  const [editMode, setEditMode] = React.useState<boolean>(false);

  const handleAddThreat = () => {
    if (currentThreat.name && currentThreat.description) {
      setThreats((prev) => [
        ...prev,
        { ...currentThreat, id: currentThreat.id || crypto.randomUUID() },
      ]);
      setCurrentThreat({ id: '', name: '', description: '' });
      setEditMode(false);
    }
  };

  const handleEditThreat = (id: string) => {
    const threatToEdit = threats.find((threat) => threat.id === id);
    if (threatToEdit) {
      setCurrentThreat(threatToEdit);
      setEditMode(true);
    }
  };

  const handleUpdateThreat = () => {
    if (currentThreat.id && currentThreat.name && currentThreat.description) {
      setThreats((prev) =>
        prev.map((threat) =>
          threat.id === currentThreat.id ? currentThreat : threat
        )
      );
      setCurrentThreat({ id: '', name: '', description: '' });
      setEditMode(false);
    }
  };

  const handleRemoveThreat = (id: string) => {
    setThreats((prev) => prev.filter((threat) => threat.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (threats.length > 0) {
      onNext(threats);
    }
  };

  const isCurrentThreatValid = currentThreat.name && currentThreat.description;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <StepHeader
        step={3}
        title="Menaces"
        description="Identifiez les menaces potentielles"
      />

      <div className="space-y-4">
        <TextArea
          label="Nom de la menace"
          id="threatName"
          value={currentThreat.name}
          onChange={(e) =>
            setCurrentThreat((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Nom de la menace..."
        />
        <TextArea
          label="Description"
          id="threatDescription"
          value={currentThreat.description}
          onChange={(e) =>
            setCurrentThreat((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          placeholder="Description de la menace..."
        />
        <Button
          type="button"
          onClick={editMode ? handleUpdateThreat : handleAddThreat}
          className="flex items-center gap-2"
          disabled={!isCurrentThreatValid}
        >
          <PlusCircle className="w-4 h-4" />
          {editMode ? 'Modifier la menace' : 'Ajouter la menace'}
        </Button>
      </div>

      {threats.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            Menaces identifiées
          </h3>
          <div className="space-y-3">
            {threats.map((threat) => (
              <div
                key={threat.id}
                className="p-4 bg-gray-50 rounded-lg space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{threat.name}</h4>
                    <p className="text-sm text-gray-600">
                      {threat.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditThreat(threat.id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveThreat(threat.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
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
        <Button type="submit" disabled={threats.length === 0}>
          Suivant
        </Button>
      </div>
    </form>
  );
}