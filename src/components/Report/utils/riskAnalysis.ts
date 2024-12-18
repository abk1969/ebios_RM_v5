import type { Risk } from '../../../types';
import { RISK_LEVELS } from '../charts/config';

export function getRiskLevelsDistribution(risks: Risk[]) {
  const total = risks.length;
  if (total === 0) return { low: 0, medium: 0, high: 0, critical: 0 };

  const counts = {
    low: risks.filter(r => r.level <= RISK_LEVELS.low.max).length,
    medium: risks.filter(r => r.level > RISK_LEVELS.low.max && r.level <= RISK_LEVELS.medium.max).length,
    high: risks.filter(r => r.level > RISK_LEVELS.medium.max && r.level <= RISK_LEVELS.high.max).length,
    critical: risks.filter(r => r.level > RISK_LEVELS.high.max).length,
  };

  return {
    low: Math.round((counts.low / total) * 100),
    medium: Math.round((counts.medium / total) * 100),
    high: Math.round((counts.high / total) * 100),
    critical: Math.round((counts.critical / total) * 100),
  };
}

export function getRiskTrend(risks: Risk[]) {
  // Simuler une tendance (dans un vrai cas, on aurait un historique)
  const baseline = risks.reduce((acc, risk) => acc + risk.level, 0) / risks.length;
  const trend = baseline * (1 + (Math.random() - 0.5) * 0.2);
  
  return {
    current: baseline,
    previous: trend,
    change: ((baseline - trend) / trend) * 100,
  };
}

export function getTopRisks(risks: Risk[], limit = 5) {
  return [...risks]
    .sort((a, b) => b.level - a.level)
    .slice(0, limit);
}