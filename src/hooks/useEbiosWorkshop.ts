import { useState } from 'react';
import type { Workshop } from '../types/ebios';
import { EBIOS_WORKSHOPS } from '../constants/ebiosWorkshops';

export function useEbiosWorkshop() {
  const [currentWorkshop, setCurrentWorkshop] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const workshop = EBIOS_WORKSHOPS.find(w => w.id === currentWorkshop);

  const markStepComplete = (workshopId: number, stepIndex: number) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      next.add(`${workshopId}-${stepIndex}`);
      return next;
    });
  };

  const isStepComplete = (workshopId: number, stepIndex: number) => {
    return completedSteps.has(`${workshopId}-${stepIndex}`);
  };

  const isWorkshopComplete = (workshopId: number) => {
    const workshop = EBIOS_WORKSHOPS.find(w => w.id === workshopId);
    if (!workshop) return false;
    
    return workshop.steps.every((_, index) => 
      isStepComplete(workshopId, index)
    );
  };

  const canAccessWorkshop = (workshopId: number) => {
    if (workshopId === 1) return true;
    return isWorkshopComplete(workshopId - 1);
  };

  const nextWorkshop = () => {
    if (currentWorkshop < EBIOS_WORKSHOPS.length && isWorkshopComplete(currentWorkshop)) {
      setCurrentWorkshop(prev => prev + 1);
    }
  };

  const previousWorkshop = () => {
    if (currentWorkshop > 1) {
      setCurrentWorkshop(prev => prev - 1);
    }
  };

  return {
    currentWorkshop,
    workshop,
    isStepComplete,
    isWorkshopComplete,
    canAccessWorkshop,
    markStepComplete,
    nextWorkshop,
    previousWorkshop,
  };
}