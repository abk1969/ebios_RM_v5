export interface OperationalScenario {
  id: string;
  name: string;
  description: string;
  strategicScenarioId: string;
  mode: {
    type: 'technical' | 'physical' | 'organizational';
    details: string;
  };
  existingControls: {
    id: string;
    name: string;
    type: 'preventive' | 'protective' | 'recovery';
    effectiveness: number;
  }[];
  probability: number;
  impact: number;
  justification: string;
}

export interface Workshop4Data {
  scenarios: OperationalScenario[];
}