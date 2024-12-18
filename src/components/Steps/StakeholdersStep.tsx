import React, { useState, useEffect } from 'react';
import { Stakeholder } from '../../types';
import TextInput from '../TextInput';
import Button from '../Button';
import TextArea from '../TextArea';

interface StakeholdersStepProps {
  onNext: (stakeholders: Stakeholder[]) => void;
  onBack: () => void;
  stakeholders: Stakeholder[];
}

const StakeholdersStep: React.FC<StakeholdersStepProps> = ({
  onNext,
  onBack,
  stakeholders,
}) => {
  const [localStakeholders, setLocalStakeholders] = useState<Stakeholder[]>(
    stakeholders,
  );
  const [currentStakeholderName, setCurrentStakeholderName] = useState('');
  const [currentStakeholderNeeds, setCurrentStakeholderNeeds] = useState('');

  useEffect(() => {
    setLocalStakeholders(stakeholders);
  }, [stakeholders]);

  const handleAddStakeholder = () => {
    const newStakeholder: Stakeholder = {
      id: Date.now().toString(), // Générer un ID unique
      name: currentStakeholderName,
      needs: currentStakeholderNeeds.split(',').map(need => need.trim()),
    };
    setLocalStakeholders(prev => [...prev, newStakeholder]);
    setCurrentStakeholderName('');
    setCurrentStakeholderNeeds('');
  };

  const handleDeleteStakeholder = (stakeholderId: string) => {
    setLocalStakeholders(prev =>
      prev.filter(stakeholder => stakeholder.id !== stakeholderId),
    );
  };

  const handleNext = () => {
    onNext(localStakeholders);
  };

  return (
    <div>
      <div className="mb-4">
        <TextInput
          label="Nom de la partie prenante"
          value={currentStakeholderName}
          onChange={e => setCurrentStakeholderName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <TextArea
          label="Besoins de la partie prenante (séparez par des virgules)"
          value={currentStakeholderNeeds}
          onChange={e => setCurrentStakeholderNeeds(e.target.value)}
        />
      </div>
      <Button
        onClick={handleAddStakeholder}
        disabled={!currentStakeholderName || !currentStakeholderNeeds}
      >
        Ajouter la partie prenante
      </Button>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Parties prenantes ajoutées :</h3>
        {localStakeholders.length > 0 ? (
          <ul>
            {localStakeholders.map(stakeholder => (
              <li key={stakeholder.id} className="flex items-center justify-between mb-2">
                <span>{stakeholder.name} - Besoins : {stakeholder.needs.join(', ')}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteStakeholder(stakeholder.id)}
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune partie prenante ajoutée pour le moment.</p>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <Button onClick={onBack} className="bg-gray-500">
          Retour
        </Button>
        <Button onClick={handleNext} disabled={localStakeholders.length === 0}>
          Suivant
        </Button>
      </div>
    </div>
  );
};

export default StakeholdersStep;