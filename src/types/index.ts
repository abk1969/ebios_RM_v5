export interface Risk {
  id: string;
  scenarioId: string; // ID du scénario associé
  probability: number; // Probabilité du risque (par exemple, de 1 à 5)
  impact: number; // Impact du risque (par exemple, de 1 à 5)
  level: number; // Niveau de risque calculé (par exemple, probabilité * impact)
  likelihoodLevel: number; // Niveau de vraisemblance sur une échelle de 1 à 4
  gravityLevel: number; // Niveau de gravité sur une échelle de 1 à
  comment?: string; // Optional comment
}

export interface Asset {
  id: string;
  name: string;
  description: string;
}

export interface Threat {
  id: string;
  name: string;
  description: string;
}

export interface Stakeholder {
  id: string;
  name: string;
  needs: string[];
}

export interface BusinessValue {
  id: string;
  name: string;
  description: string;
  stakeholderId: string; // Lier la valeur métier à une partie prenante
  essentialityCriteria: string[];
}

export interface FearedEvent {
  id: string;
  businessValueId: string;
  threatId: string;
  impactLevel: number; // Niveau d'impact sur une échelle de 1 à 4 (EBIOS RM)
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  threatId: string;
  fearedEventId: string; // Lier le scénario à un événement redouté
  likelihoodLevel: number; // Niveau de vraisemblance sur une échelle de 1 à 4 (EBIOS RM)
}

export interface EbiosFormData {
  context: string;
  stakeholders: Stakeholder[];
  businessValues: BusinessValue[];
  threats: Threat[];
  fearedEvents: FearedEvent[];
  scenarios: Scenario[];
  risks: Risk[];
}
