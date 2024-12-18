import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import type { Risk, Scenario } from '../../../types';
import { CHART_MARGINS } from './config';
import { getScenarioRiskData } from './utils/transformData';
import { getRadarConfig } from './utils/chartConfigs';

interface RiskRadarChartProps {
  scenarios: Scenario[];
  risks: Risk[];
  margin?: typeof CHART_MARGINS.radar;
}

export function RiskRadarChart({
  scenarios,
  risks,
  margin = CHART_MARGINS.radar
}: RiskRadarChartProps) {
  const data = getScenarioRiskData(scenarios, risks);
  const { chartConfig, colors } = getRadarConfig();

  return (
    <ResponsiveRadar
      data={data}
      keys={['probability', 'impact', 'level']}
      indexBy="scenario"
      maxValue={5}
      margin={margin}
      colors={colors}
      {...chartConfig}
    />
  );
}