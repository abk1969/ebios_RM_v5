import React from 'react';
import { TextArea } from '../../../TextArea';
import { Button } from '../../../Button';
import type { Workshop5Data, RiskTreatment } from '../types';

interface SecurityMeasuresStepProps {
  data: Workshop5Data;
  onUpdate: (data: Workshop5Data) => void;
}

export function SecurityMeasuresStep({ data, onUpdate }: SecurityMeasuresStepProps) {
  const [currentMeasure, setCurrentMeasure] = React.useState<{
    treatmentId: string;
    name: string;
    type: RiskTreatment['measures'][number]['type'];
    cost: number;
    effectiveness: number;
    deadline: string;
    status: RiskTreatment['measures'][number]['status'];
  }>({
    treatmentId: '',
    name: '',
    type: 'preventive',
    cost: 0,
    effectiveness: 1,
    deadline: '',
    status: 'planned'
  });

  const handleAddMeasure = () => {
    if (currentMeasure.treatmentId && currentMeasure.name) {
      onUpdate({
        ...data,
        treatments: data.treatments.map(t => 
          t.id === currentMeasure.treatmentId ? {
            ...t,
            measures: [...t.measures, {
              id: crypto.randomUUID(),
              name: currentMeasure.name,
              type: currentMeasure.type,
              cost: currentMeasure.cost,
              effectiveness: currentMeasure.effectiveness,
              deadline: currentMeasure.deadline,
              status: currentMeasure.status
            }]
          } : t
        )
      });
      
      setCurrentMeasure({
        treatmentId: currentMeasure.treatmentId,
        name: '',
        type: 'preventive',
        cost: 0,
        effectiveness: 1,
        deadline: '',
        status: 'planned'
      });
    }
  };

  const handleRemoveMeasure = (treatmentId: string, measureId: string) => {
    onUpdate({
      ...data,
      treatments: data.treatments.map(t => 
        t.id === treatmentId ? {
          ...t,
          measures: t.measures.filter(m => m.id !== measureId)
        } : t
      )
    });
  };

  const measureTypes = [
    { value: 'preventive', label: 'Préventive' },
    { value: 'protective', label: 'Protective' },
    { value: 'recovery', label: 'Récupération' }
  ] as const;

  const statusTypes = [
    { value: 'planned', label: 'Planifiée' },
    { value: 'inProgress', label: 'En cours' },
    { value: 'completed', label: 'Terminée' }
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Mesures de sécurité
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Définissez les mesures de sécurité pour chaque traitement.
        </p>
      </div>

      <div className="space-y-8">
        {data.treatments.map((treatment) => (
          <div
            key={treatment.id}
            className="p-4 bg-gray-50 rounded-lg space-y-4"
          >
            <div>
              <h4 className="font-medium text-gray-900">
                {treatmentTypes.find(t => t.value === treatment.type)?.label}
              </h4>
              <p className="text-sm text-gray-600 mt-1">{treatment.description}</p>
            </div>

            <div className="space-y-4">
              <h5 className="font-medium text-gray-900">Mesures de sécurité</h5>
              
              {currentMeasure.treatmentId === treatment.id && (
                <div className="space-y-4 p-4 bg-white rounded-lg">
                  <TextArea
                    label="Nom de la mesure"
                    value={currentMeasure.name}
                    onChange={(e) => setCurrentMeasure({
                      ...currentMeasure,
                      name: e.target.value
                    })}
                    placeholder="Ex: Authentification forte, Chiffrement..."
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type de mesure
                      </label>
                      <select
                        value={currentMeasure.type}
                        onChange={(e) => setCurrentMeasure({
                          ...currentMeasure,
                          type: e.target.value as typeof currentMeasure.type
                        })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        {measureTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Statut
                      </label>
                      <select
                        value={currentMeasure.status}
                        onChange={(e) => setCurrentMeasure({
                          ...currentMeasure,
                          status: e.target.value as typeof currentMeasure.status
                        })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        {statusTypes.map(status => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Coût estimé (k€)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={currentMeasure.cost}
                        onChange={(e) => setCurrentMeasure({
                          ...currentMeasure,
                          cost: Number(e.target.value)
                        })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date limite
                      </label>
                      <input
                        type="date"
                        value={currentMeasure.deadline}
                        onChange={(e) => setCurrentMeasure({
                          ...currentMeasure,
                          deadline: e.target.value
                        })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Efficacité attendue
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="4"
                      value={currentMeasure.effectiveness}
                      onChange={(e) => setCurrentMeasure({
                        ...currentMeasure,
                        effectiveness: Number(e.target.value)
                      })}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Faible</span>
                      <span>Moyenne</span>
                      <span>Forte</span>
                      <span>Très forte</span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setCurrentMeasure({
                        treatmentId: '',
                        name: '',
                        type: 'preventive',
                        cost: 0,
                        effectiveness: 1,
                        deadline: '',
                        status: 'planned'
                      })}
                    >
                      Annuler
                    </Button>
                    <Button
                      type="button"
                      onClick={handleAddMeasure}
                      disabled={!currentMeasure.name}
                    >
                      Ajouter la mesure
                    </Button>
                  </div>
                </div>
              )}

              {currentMeasure.treatmentId !== treatment.id && (
                <Button
                  type="button"
                  onClick={() => setCurrentMeasure({
                    ...currentMeasure,
                    treatmentId: treatment.id
                  })}
                >
                  Ajouter une mesure
                </Button>
              )}

              {treatment.measures.length > 0 && (
                <div className="space-y-2">
                  {treatment.measures.map((measure) => (
                    <div
                      key={measure.id}
                      className="flex items-center justify-between p-2 bg-white rounded-lg"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">
                            {measure.name}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {measureTypes.find(t => t.value === measure.type)?.label}
                          </span>
                          <span className={`
                            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${measure.status === 'completed' ? 'bg-green-100 text-green-800' :
                              measure.status === 'inProgress' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'}
                          `}>
                            {statusTypes.find(s => s.value === measure.status)?.label}
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-gray-600">
                          <span>Coût : {measure.cost}k€</span>
                          <span className="mx-2">•</span>
                          <span>Efficacité : {measure.effectiveness}/4</span>
                          <span className="mx-2">•</span>
                          <span>Échéance : {new Date(measure.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => handleRemoveMeasure(treatment.id, measure.id)}
                      >
                        Supprimer
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}