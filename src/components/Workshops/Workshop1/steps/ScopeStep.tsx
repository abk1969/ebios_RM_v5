import React from 'react';
import { TextArea } from '../../../TextArea';
import { Button } from '../../../Button';
import type { Workshop1Data, Scope } from '../types';

interface ScopeStepProps {
  data: Workshop1Data;
  onUpdate: (data: Workshop1Data) => void;
}

export function ScopeStep({ data, onUpdate }: ScopeStepProps) {
  const [currentConstraint, setCurrentConstraint] = React.useState('');
  const [currentAssumption, setCurrentAssumption] = React.useState('');

  const handleAddConstraint = () => {
    if (currentConstraint.trim()) {
      onUpdate({
        ...data,
        scope: {
          ...data.scope,
          constraints: [...data.scope.constraints, currentConstraint.trim()]
        }
      });
      setCurrentConstraint('');
    }
  };

  const handleAddAssumption = () => {
    if (currentAssumption.trim()) {
      onUpdate({
        ...data,
        scope: {
          ...data.scope,
          assumptions: [...data.scope.assumptions, currentAssumption.trim()]
        }
      });
      setCurrentAssumption('');
    }
  };

  const handleRemoveConstraint = (index: number) => {
    onUpdate({
      ...data,
      scope: {
        ...data.scope,
        constraints: data.scope.constraints.filter((_, i) => i !== index)
      }
    });
  };

  const handleRemoveAssumption = (index: number) => {
    onUpdate({
      ...data,
      scope: {
        ...data.scope,
        assumptions: data.scope.assumptions.filter((_, i) => i !== index)
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Périmètre de l'étude
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Définissez le périmètre de l'analyse, les contraintes et les hypothèses.
        </p>
      </div>

      <div className="space-y-6">
        <TextArea
          label="Description du périmètre"
          value={data.scope.description}
          onChange={(e) => onUpdate({
            ...data,
            scope: {
              ...data.scope,
              description: e.target.value
            }
          })}
          placeholder="Décrivez le périmètre de l'analyse EBIOS RM..."
        />

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Contraintes</h4>
          <div className="flex gap-2">
            <TextArea
              label=""
              value={currentConstraint}
              onChange={(e) => setCurrentConstraint(e.target.value)}
              placeholder="Ajoutez une contrainte..."
              className="flex-1"
            />
            <Button
              type="button"
              onClick={handleAddConstraint}
              disabled={!currentConstraint.trim()}
              className="self-end"
            >
              Ajouter
            </Button>
          </div>

          {data.scope.constraints.length > 0 && (
            <ul className="space-y-2">
              {data.scope.constraints.map((constraint, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-sm text-gray-700">{constraint}</span>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleRemoveConstraint(index)}
                  >
                    Supprimer
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Hypothèses</h4>
          <div className="flex gap-2">
            <TextArea
              label=""
              value={currentAssumption}
              onChange={(e) => setCurrentAssumption(e.target.value)}
              placeholder="Ajoutez une hypothèse..."
              className="flex-1"
            />
            <Button
              type="button"
              onClick={handleAddAssumption}
              disabled={!currentAssumption.trim()}
              className="self-end"
            >
              Ajouter
            </Button>
          </div>

          {data.scope.assumptions.length > 0 && (
            <ul className="space-y-2">
              {data.scope.assumptions.map((assumption, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-sm text-gray-700">{assumption}</span>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleRemoveAssumption(index)}
                  >
                    Supprimer
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}