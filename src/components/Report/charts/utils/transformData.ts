import type { Risk, Scenario } from '../../../../types';
import { RISK_LEVELS } from '../config';

export function getRiskDistribution(risks: Risk[]) {
  return {
    low: risks.filter(r => r.level <= RISK_LEVELS.low.max).length,
    medium: risks.filter(r => r.level > RISK_LEVELS.low.max && r.level <= RISK_LEVELS.medium.max).length,
    high: risks.filter(r => r.level > RISK_LEVELS.medium.max && r.level <= RISK_LEVELS.high.max).length,
    critical: risks.filter(r => r.level > RISK_LEVELS.high.max).length,
  };
}

export function getScenarioRiskData(scenarios: Scenario[], risks: Risk[]) {
  return scenarios.map(scenario => {
    const risk = risks.find(r => r.scenarioId === scenario.id);
    return {
      scenario: scenario.name.substring(0, 20),
      probability: risk?.probability || 0,
      impact: risk?.impact || 0,
      level: risk?.level || 0,
    };
  });
}

export function getHeatmapData(risks: Risk[]) {
  return Array.from({ length: 5 }, (_, i) => ({
    id: `${5 - i}`,
    data: Array.from({ length: 5 }, (_, j) => ({
      x: `${j + 1}`,
      y: risks.filter(r => r.impact === (5 - i) && r.probability === (j + 1)).length
    }))
  }));
}