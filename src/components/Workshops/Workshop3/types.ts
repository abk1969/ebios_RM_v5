export interface StrategicScenario {
  id: string;
  name: string;
  description: string;
  sourceIds: string[];
  targetedValues: string[];
  mode: 'direct' | 'indirect' | 'combined';
  severity: number;
  likelihood: number;
  justification: string;
  controls: {
    id: string;
    name: string;
    type: 'preventive' | 'protective' | 'recovery';
    effectiveness: number;
  }[];
}

export interface Workshop3Data {
  scenarios: StrategicScenario[];
}