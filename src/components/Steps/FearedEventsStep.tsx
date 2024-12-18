import React, { useState, useEffect } from 'react';
import { FearedEvent, BusinessValue, Threat } from '../../types';
import Button from '../Button';
import ScaleSelector from '../ScaleSelector';

interface FearedEventsStepProps {
  onNext: (fearedEvents: FearedEvent[]) => void;
  onBack: () => void;
  fearedEvents: FearedEvent[];
  businessValues: BusinessValue[];
  threats: Threat[];
}

const FearedEventsStep: React.FC<FearedEventsStepProps> = ({
  onNext,
  onBack,
  fearedEvents,
  businessValues,
  threats,
}) => {
  const [localFearedEvents, setLocalFearedEvents] = useState<FearedEvent[]>(
    fearedEvents,
  );
  const [selectedBusinessValueId, setSelectedBusinessValueId] = useState('');
  const [selectedThreatId, setSelectedThreatId] = useState('');
  const [currentImpactLevel, setCurrentImpactLevel] = useState(1); // Valeur par défaut

  useEffect(() => {
    setLocalFearedEvents(fearedEvents);
  }, [fearedEvents]);

  const handleAddFearedEvent = () => {
    const newFearedEvent: FearedEvent = {
      id: Date.now().toString(),
      businessValueId: selectedBusinessValueId,
      threatId: selectedThreatId,
      impactLevel: currentImpactLevel,
    };
    setLocalFearedEvents(prev => [...prev, newFearedEvent]);
    setSelectedBusinessValueId('');
    setSelectedThreatId('');
    setCurrentImpactLevel(1);
  };

  const handleDeleteFearedEvent = (fearedEventId: string) => {
    setLocalFearedEvents(prev =>
      prev.filter(fe => fe.id !== fearedEventId),
    );
  };

  const handleNext = () => {
    onNext(localFearedEvents);
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Valeur métier
        </label>
        <select
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={selectedBusinessValueId}
          onChange={e => setSelectedBusinessValueId(e.target.value)}
        >
          <option value="">Sélectionnez une valeur métier</option>
          {businessValues.map(bv => (
            <option key={bv.id} value={bv.id}>
              {bv.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Menace
        </label>
        <select
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={selectedThreatId}
          onChange={e => setSelectedThreatId(e.target.value)}
        >
          <option value="">Sélectionnez une menace</option>
          {threats.map(threat => (
            <option key={threat.id} value={threat.id}>
              {threat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Niveau d'impact
        </label>
        <ScaleSelector
          value={currentImpactLevel}
          onChange={setCurrentImpactLevel}
          scale={[1, 2, 3, 4]}
          labels={['Négligeable', 'Modéré', 'Important', 'Critique']}
        />
      </div>
      <Button
        onClick={handleAddFearedEvent}
        disabled={!selectedBusinessValueId || !selectedThreatId}
      >
        Ajouter l'événement redouté
      </Button>

      {/* Afficher les événements redoutés ajoutés */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">
          Événements redoutés ajoutés :
        </h3>
        {localFearedEvents.length > 0 ? (
          <ul>
            {localFearedEvents.map(fe => (
              <li key={fe.id} className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-medium">
                    {businessValues.find(bv => bv.id === fe.businessValueId)?.name}
                  </span>{' '}
                  -{' '}
                  <span className="font-medium">
                    {threats.find(t => t.id === fe.threatId)?.name}
                  </span>{' '}
                  - Impact :{' '}
                  {
                    ['Négligeable', 'Modéré', 'Important', 'Critique'][
                      fe.impactLevel - 1
                    ]
                  }
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteFearedEvent(fe.id)}
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun événement redouté ajouté pour le moment.</p>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <Button onClick={onBack} className="bg-gray-500">
          Retour
        </Button>
        <Button onClick={handleNext} disabled={localFearedEvents.length === 0}>
          Suivant
        </Button>
      </div>
    </div>
  );
};

export default FearedEventsStep;