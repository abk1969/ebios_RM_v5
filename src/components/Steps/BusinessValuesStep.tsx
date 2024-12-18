import React, { useState, useEffect } from 'react';
import { BusinessValue, Stakeholder } from '../../types';
import TextInput from '../TextInput';
import Button from '../Button';
import TextArea from '../TextArea';

interface BusinessValuesStepProps {
  onNext: (businessValues: BusinessValue[]) => void;
  onBack: () => void;
  businessValues: BusinessValue[];
  stakeholders: Stakeholder[];
}

const BusinessValuesStep: React.FC<BusinessValuesStepProps> = ({
  onNext,
  onBack,
  businessValues,
  stakeholders,
}) => {
  const [localBusinessValues, setLocalBusinessValues] = useState<BusinessValue[]>(businessValues);
  const [currentBusinessValueName, setCurrentBusinessValueName] = useState('');
  const [currentBusinessValueDescription, setCurrentBusinessValueDescription] = useState('');
  const [selectedStakeholderId, setSelectedStakeholderId] = useState('');
  const [currentEssentialityCriteria, setCurrentEssentialityCriteria] = useState('');

  useEffect(() => {
    setLocalBusinessValues(businessValues);
  }, [businessValues]);

  const handleAddBusinessValue = () => {
    const newBusinessValue: BusinessValue = {
      id: Date.now().toString(),
      name: currentBusinessValueName,
      description: currentBusinessValueDescription,
      stakeholderId: selectedStakeholderId,
      essentialityCriteria: currentEssentialityCriteria.split(',').map(c => c.trim()),
    };
    setLocalBusinessValues(prev => [...prev, newBusinessValue]);
    setCurrentBusinessValueName('');
    setCurrentBusinessValueDescription('');
    setSelectedStakeholderId('');
    setCurrentEssentialityCriteria('');
  };

  const handleDeleteBusinessValue = (businessValueId: string) => {
    setLocalBusinessValues(prev =>
      prev.filter(bv => bv.id !== businessValueId),
    );
  };

  const handleNext = () => {
    onNext(localBusinessValues);
  };

  return (
    <div>
      <div className="mb-4">
        <TextInput
          label="Nom de la valeur métier"
          value={currentBusinessValueName}
          onChange={e => setCurrentBusinessValueName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <TextArea
          label="Description de la valeur métier"
          value={currentBusinessValueDescription}
          onChange={e => setCurrentBusinessValueDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Partie prenante associée
        </label>
        <select
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={selectedStakeholderId}
          onChange={e => setSelectedStakeholderId(e.target.value)}
        >
          <option value="">Sélectionnez une partie prenante</option>
          {stakeholders.map(stakeholder => (
            <option key={stakeholder.id} value={stakeholder.id}>
              {stakeholder.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <TextArea
          label="Critères d'essentialité (séparez par des virgules)"
          value={currentEssentialityCriteria}
          onChange={e => setCurrentEssentialityCriteria(e.target.value)}
        />
      </div>
      <Button
        onClick={handleAddBusinessValue}
        disabled={
          !currentBusinessValueName ||
          !currentBusinessValueDescription ||
          !selectedStakeholderId ||
          !currentEssentialityCriteria
        }
      >
        Ajouter la valeur métier
      </Button>

      {/* Afficher les valeurs métier ajoutées */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Valeurs métier ajoutées :</h3>
        {localBusinessValues.length > 0 ? (
          <ul>
            {localBusinessValues.map(bv => (
              <li key={bv.id} className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-medium">{bv.name}</span> -{' '}
                  {bv.description} (Partie prenante :{' '}
                  {stakeholders.find(s => s.id === bv.stakeholderId)?.name || 'Inconnue'})
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteBusinessValue(bv.id)}
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune valeur métier ajoutée pour le moment.</p>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <Button onClick={onBack} className="bg-gray-500">
          Retour
        </Button>
        <Button onClick={handleNext} disabled={localBusinessValues.length === 0}>
          Suivant
        </Button>
      </div>
    </div>
  );
};

export default BusinessValuesStep;