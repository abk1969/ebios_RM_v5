import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import type { Risk } from '../../../types';
import { CHART_MARGINS, RISK_COLORS, RISK_LEVELS } from './config';
import { getRiskDistribution } from './utils/transformData';
import { getPieConfig } from './utils/chartConfigs';

interface RiskDistributionPieProps {
  risks: Risk[];
  margin?: typeof CHART_MARGINS.pie;
}

export function RiskDistributionPie({ risks, margin = CHART_MARGINS.pie }: RiskDistributionPieProps) {
  const riskLevels = getRiskDistribution(risks);
  const { chartConfig } = getPieConfig();

  const data = [
    { id: RISK_LEVELS.low.label, value: riskLevels.low, color: RISK_COLORS.low },
    { id: RISK_LEVELS.medium.label, value: riskLevels.medium, color: RISK_COLORS.medium },
    { id: RISK_LEVELS.high.label, value: riskLevels.high, color: RISK_COLORS.high },
    { id: RISK_LEVELS.critical.label, value: riskLevels.critical, color: RISK_COLORS.critical },
  ];

  return (
    <ResponsivePie
      data={data}
      margin={margin}
      colors={{ datum: 'data.color' }}
      {...chartConfig}
    />
  );
}