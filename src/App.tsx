import React from 'react';
import { Workshop1 } from './components/Workshops/Workshop1';
import { Workshop2 } from './components/Workshops/Workshop2';
import { Workshop3 } from './components/Workshops/Workshop3';
import { Workshop4 } from './components/Workshops/Workshop4';
import { Workshop5 } from './components/Workshops/Workshop5';
import { StepNavigation } from './components/Navigation/StepNavigation';
import { WorkshopProgress } from './components/Navigation/WorkshopProgress';
import { useEbiosWorkshop } from './hooks/useEbiosWorkshop';
import { EBIOS_WORKSHOPS } from './constants/ebiosWorkshops';
import type { EbiosContext, BusinessValue, RiskSource, StrategicScenario, OperationalScenario, RiskTreatment } from './types/ebios';

function App() {
  const {
    currentWorkshop,
    workshop,
    isStepComplete,
    isWorkshopComplete,
    canAccessWorkshop,
    markStepComplete,
    nextWorkshop,
    previousWorkshop,
  } = useEbiosWorkshop();

  const handleContextNext = (context: string) => {
    updateData({ context });
    nextStep();
  };

  const handleAssetsNext = (assets: Asset[]) => {
    updateData({ assets });
    nextStep();
  };

  const handleThreatsNext = (threats: Threat[]) => {
    updateData({ threats });
    nextStep();
  };

  const handleScenariosNext = (scenarios: Scenario[]) => {
    updateData({ scenarios });
    nextStep();
  };

  const handleRisksSubmit = (risks: Risk[]) => {
    updateData({ risks });
    console.log('Final EBIOS RM data:', data);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-blue-600 shadow-md py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">EBIOS RM</h1>
          <p className="text-white text-sm">
            Méthode d'appréciation et de traitement des risques
          </p>
        </div>
      </header>

      <main className="container mx-auto mt-6 px-4 pb-8">
        <StepNavigation
          currentWorkshop={currentWorkshop}
          workshops={EBIOS_WORKSHOPS}
          onWorkshopClick={(id) => canAccessWorkshop(id)}
          isWorkshopComplete={isWorkshopComplete}
        />

        <div className="bg-white shadow rounded-lg p-6">
          <WorkshopProgress
            workshop={workshop}
            isStepComplete={isStepComplete}
            description="Suivez les ateliers pour réaliser votre analyse EBIOS RM"
          />

          {currentWorkshop === 1 && (
            <Workshop1
              onComplete={() => nextWorkshop()}
              onStepComplete={(step) => markStepComplete(1, step)}
            />
          )}
          {currentWorkshop === 2 && (
            <Workshop2
              onComplete={() => nextWorkshop()}
              onStepComplete={(step) => markStepComplete(2, step)}
              onBack={() => previousWorkshop()}
            />
          )}
          {currentWorkshop === 3 && (
            <Workshop3
              onComplete={() => nextWorkshop()}
              onStepComplete={(step) => markStepComplete(3, step)}
              onBack={() => previousWorkshop()}
            />
          )}
          {currentWorkshop === 4 && (
            <Workshop4
              onComplete={() => nextWorkshop()}
              onStepComplete={(step) => markStepComplete(4, step)}
              onBack={() => previousWorkshop()}
            />
          )}
          {currentWorkshop === 5 && (
            <Workshop5
              onComplete={() => nextWorkshop()}
              onStepComplete={(step) => markStepComplete(5, step)}
              onBack={() => previousWorkshop()}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;