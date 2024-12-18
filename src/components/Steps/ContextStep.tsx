import React from 'react';
import { StepHeader } from '../StepHeader';
import { TextArea } from '../TextArea';
import { Button } from '../Button';

interface ContextStepProps {
  onNext: (context: string) => void;
  context: string;
}

export function ContextStep({ onNext, context: initialContext }: ContextStepProps) {
  const [context, setContext] = React.useState<string>(initialContext);
  const [error, setError] = React.useState<string>('');

  const validateContext = (value: string) => {
    if (!value.trim()) {
      return 'Le contexte est requis.';
    }
    if (value.length < 20) {
      return 'Le contexte doit contenir au moins 20 caractères.';
    }
    return '';
  };

  const handleContextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContext = e.target.value;
    setContext(newContext);
    setError(validateContext(newContext));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validateContext(context);
    if (validationError) {
      setError(validationError);
      return;
    }
    onNext(context);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <StepHeader
        step={1}
        title="Cadrage et socle de sécurité"
        description="Définissez le contexte et le socle de sécurité de l'analyse de risque."
      />

      <TextArea
        label="Description du contexte"
        id="context"
        value={context}
        onChange={handleContextChange}
        placeholder="Décrivez le contexte de votre analyse, les objectifs, les limites, les acteurs, etc..."
        error={error}
      />

      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={!!error || !context.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Suivant
        </Button>
      </div>
    </form>
  );
}