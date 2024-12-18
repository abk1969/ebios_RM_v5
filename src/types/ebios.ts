export interface Workshop {
  id: number;
  title: string;
  description: string;
  steps: string[];
}

export interface BusinessValue {
  id: string;
  name: string;
  description: string;
  stakeholderId: string;
  criticalityLevel: number;
}

export interface RiskSource {
  id: string;
  name: string;
  description: string;
  category: 'human' | 'environmental' | 'system';
  motivation?: string;
  capability?: number;
}

export interface StrategicScenario {
  id: string;
  name: string;
  description: string;
  riskSourceId: string;
  businessValueId: string;
  likelihood: number;
  severity: number;
  operationalScenarios: string[];
}

export interface OperationalScenario {
  id: string;
  name: string;
  description: string;
  strategicScenarioId: string;
  technicalControls: string[];
  probability: number;
  impact: number;
}

export interface RiskTreatment {
  id: string;
  scenarioId: string;
  type: 'reduction' | 'sharing' | 'avoidance' | 'acceptance';
  description: string;
  measures: string[];
  cost: number;
  effectiveness: number;
  deadline: Date;
  status: 'planned' | 'inProgress' | 'completed';
}

export interface EbiosContext {
  organization: {
    name: string;
    sector: string;
    size: string;
  };
  scope: {
    description: string;
    constraints: string[];
    assumptions: string[];
  };
  stakeholders: {
    id: string;
    name: string;
    role: string;
    influence: number;
  }[];
}