import React from 'react';
import { TextArea } from '../../../TextArea';
import { Button } from '../../../Button';
import { MultiSelect } from '../../../MultiSelect';
import type { Workshop1Data, BusinessValue } from '../types';

interface BusinessValuesStepProps {
  data: Workshop1Data;
  onUpdate: (data: Workshop1Data) => void;
}

export function BusinessValuesStep({ data, onUpdate }: BusinessValuesStepProps) {
  const [currentValue, setCurrentValue] = React.useState<Partial<BusinessValue>>({
    name: '',
    description: '',
    stakeholders: [],
    importance: 'medium'
  });

  const handleAddValue = () => {
    if (currentValue.name && currentValue.description) {
      const newValue: BusinessValue = {
        ...currentValue as BusinessValue,
        id: crypto.randomUUID()
      };
      
      onUpdate({
        ...data,
        businessValues: [...data.businessValues, newValue]
      });
      
      setCurrentValue({
        name: '',
        description: '',
        stakeholders: [],
        importance: 'medium'
      });
    }
  };

  const handleRemoveValue = (id: string) => {
    onUpdate({
      ...data,
      businessValues: data.businessValues.filter(v => v.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Identification des valeurs métier
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Identifiez les valeurs métier essentielles de l'organisation et leur importance.
        </p>
      </div>

      <div className="space-y-4">
        <TextArea
          label="Nom de la valeur métier"
          value={currentValue.name}
          onChange={(e) => setCurrentValue({ ...currentValue, name: e.target.value })}
          placeholder="Ex: Données clients, Propriété intellectuelle..."
        />

        <TextArea
          label="Description"
          value={currentValue.description}
          onChange={(e) => setCurrentValue({ ...currentValue, description: e.target.value })}
          placeholder="Décrivez la valeur métier et son importance pour l'organisation..."
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Importance
          </label>
          <select
            value={currentValue.importance}
            onChange={(e) => setCurrentValue({ 
              ...currentValue, 
              importance: e.target.value as BusinessValue['importance']
            })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="low">Faible</option>
            <option value="medium">Moyenne</option>
            <option value="high">Haute</option>
            <option value="critical">Critique</option>
          </select>
        </div>

        <Button
          type="button"
          onClick={handleAddValue}
          disabled={!currentValue.name || !currentValue.description}
          className="w-full"
        >
          Ajouter la valeur métier
        </Button>
      </div>

      {data.businessValues.length > 0 && (
        <div className="mt-8">
          <h4 className="font-medium text-gray-900 mb-4">Valeurs métier identifiées</h4>
          <div className="space-y-4">
            {data.businessValues.map((value) => (
              <div
                key={value.id}
                className="flex items-start justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h5 className="font-medium text-gray-900">{value.name}</h5>
                  <p className="text-sm text-gray-600 mt-1">{value.description}</p>
                  <div className="mt-2">
                    <span className={`
                      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${value.importance === 'critical' ? 'bg-red-100 text-red-800' :
                        value.importance === 'high' ? 'bg-orange-100 text-orange-800' :
                        value.importance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'}
                    `}>
                      {value.importance === 'critical' ? 'Critique' :
                       value.importance === 'high' ? 'Haute' :
                       value.importance === 'medium' ? 'Moyenne' : 'Faible'}
                    </span>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => handleRemoveValue(value.id)}
                >
                  Supprimer
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}