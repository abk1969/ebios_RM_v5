export interface RiskSource {
  id: string;
  name: string;
  description: string;
  category: 'state' | 'organization' | 'individual' | 'environmental';
  motivation: string;
  capabilities: {
    technical: number;
    financial: number;
    human: number;
  };
  opportunities: string[];
}

export interface TargetedObjective {
  id: string;
  name: string;
  description: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  motivation: string;
}

export interface SourceObjectivePair {
  id: string;
  sourceId: string;
  objectiveId: string;
  likelihood: number;
  justification: string;
}

export interface Workshop2Data {
  riskSources: RiskSource[];
  objectives: TargetedObjective[];
  pairs: SourceObjectivePair[];
}