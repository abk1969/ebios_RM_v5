export interface RiskTreatment {
  id: string;
  scenarioId: string;
  type: 'reduction' | 'sharing' | 'avoidance' | 'acceptance';
  description: string;
  measures: {
    id: string;
    name: string;
    type: 'preventive' | 'protective' | 'recovery';
    cost: number;
    effectiveness: number;
    deadline: string;
    status: 'planned' | 'inProgress' | 'completed';
  }[];
  residualRisk: {
    probability: number;
    impact: number;
    justification: string;
  };
}

export interface Workshop5Data {
  treatments: RiskTreatment[];
  monitoringPlan: {
    id: string;
    name: string;
    frequency: 'monthly' | 'quarterly' | 'biannual' | 'annual';
    indicators: string[];
    stakeholders: string[];
  }[];
}