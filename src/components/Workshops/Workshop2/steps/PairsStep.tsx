import React from 'react';
import { TextArea } from '../../../TextArea';
import { Button } from '../../../Button';
import type { Workshop2Data, SourceObjectivePair } from '../types';

interface PairsStepProps {
  data: Workshop2Data;
  onUpdate: (data: Workshop2Data) => void;
}

export function PairsStep({ data, onUpdate }: PairsStepProps) {
  const [currentPair, setCurrentPair] = React.useState<Partial<SourceObjectivePair>>({
    sourceId: '',
    objectiveId: '',
    likelihood: 1,
    justification: ''
  });

  const handleAddPair = () => {
    if (currentPair.sourceId && currentPair.objectiveId && currentPair.justification) {
      const newPair: SourceObjectivePair = {
        ...currentPair as SourceObjectivePair,
        id: crypto.randomUUID()
      };
      
      onUpdate({
        ...data,
        pairs: [...data.pairs, newPair]
      });
      
      setCurrentPair({
        sourceId: '',
        objectiveId: '',
        likelihood: 1,
        justification: ''
      });
    }
  };

  const handleRemovePair = (id: string) => {
    onUpdate({
      ...data,
      pairs: data.pairs.filter(p => p.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Couples sources-objectifs
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Associez les sources de risque à leurs objectifs potentiels.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Source de risque
          </label>
          <select
            value={currentPair.sourceId}
            onChange={(e) => setCurrentPair({ 
              ...currentPair, 
              sourceId: e.target.value
            })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Sélectionnez une source</option>
            {data.riskSources.map(source => (
              <option key={source.id} value={source.id}>{source.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Objectif visé
          </label>
          <select
            value={currentPair.objectiveId}
            onChange={(e) => setCurrentPair({ 
              ...currentPair, 
              objectiveId: e.target.value
            })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Sélectionnez un objectif</option>
            {data.objectives.map(objective => (
              <option key={objective.id} value={objective.id}>{objective.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vraisemblance
          </label>
          <input
            type="range"
            min="1"
            max="4"
            value={currentPair.likelihood || 1}
            onChange={(e) => setCurrentPair({
              ...currentPair,
              likelihood: Number(e.target.value)
            })}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Minime</span>
            <span>Significative</span>
            <span>Forte</span>
            <span>Maximale</span>
          </div>
        </div>

        <TextArea
          label="Justification"
          value={currentPair.justification}
          onChange={(e) => setCurrentPair({ ...currentPair, justification: e.target.value })}
          placeholder="Justifiez la vraisemblance de ce couple source-objectif..."
        />

        <Button
          type="button"
          onClick={handleAddPair}
          disabled={!currentPair.sourceId || !currentPair.objectiveId || !currentPair.justification}
          className="w-full"
        >
          Ajouter le couple
        </Button>
      </div>

      {data.pairs.length > 0 && (
        <div className="mt-8">
          <h4 className="font-medium text-gray-900 mb-4">Couples identifiés</h4>
          <div className="space-y-4">
            {data.pairs.map((pair) => {
              const source = data.riskSources.find(s => s.id === pair.sourceId);
              const objective = data.objectives.find(o => o.id === pair.objectiveId);

              return (
                <div
                  key={pair.id}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-medium text-gray-900">
                          {source?.name}
                        </h5>
                        <span className="text-gray-500">→</span>
                        <span className="text-sm text-gray-600">
                          {objective?.name}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className={`
                          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${pair.likelihood >= 4 ? 'bg-red-100 text-red-800' :
                            pair.likelihood >= 3 ? 'bg-orange-100 text-orange-800' :
                            pair.likelihood >= 2 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'}
                        `}>
                          Vraisemblance : {pair.likelihood}/4
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{pair.justification}</p>
                    </div>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => handleRemovePair(pair.id)}
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