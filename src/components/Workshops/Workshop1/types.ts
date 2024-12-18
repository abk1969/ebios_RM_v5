export interface BusinessValue {
  id: string;
  name: string;
  description: string;
  stakeholders: string[];
  importance: 'low' | 'medium' | 'high' | 'critical';
}

export interface SecurityCriterion {
  id: string;
  name: string;
  description: string;
  type: 'confidentiality' | 'integrity' | 'availability';
  scale: {
    low: string;
    medium: string;
    high: string;
    critical: string;
  };
}

export interface SecurityNeed {
  id: string;
  businessValueId: string;
  criterionId: string;
  level: 'low' | 'medium' | 'high' | 'critical';
  justification: string;
}

export interface Scope {
  description: string;
  constraints: string[];
  assumptions: string[];
}

export interface Asset {
  id: string;
  name: string;
  description: string;
  type: 'hardware' | 'software' | 'network' | 'personnel' | 'site' | 'organization';
  businessValues: string[]; // IDs of related business values
}

export interface Workshop1Data {
  businessValues: BusinessValue[];
  securityCriteria: SecurityCriterion[];
  securityNeeds: SecurityNeed[];
  scope: Scope;
  assets: Asset[];
}