import React from 'react';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import type { Risk } from '../../../types';
import { CHART_MARGINS, CHART_THEMES } from './config';
import { getHeatmapData } from './utils/transformData';
import { getHeatmapConfig } from './utils/chartConfigs';

interface RiskHeatMapProps {
  risks: Risk[];
  margin?: typeof CHART_MARGINS.heatmap;
}

export function RiskHeatMap({
  risks,
  margin = CHART_MARGINS.heatmap
}: RiskHeatMapProps) {
  const data = getHeatmapData(risks);
  const { axisConfig, colorConfig, legendConfig } = getHeatmapConfig();

  return (
    <ResponsiveHeatMap
      data={data}
      margin={margin}
      valueFormat=">-.2s"
      theme={{ tooltip: CHART_THEMES.tooltip }}
      {...axisConfig}
      {...colorConfig}
      legends={[legendConfig]}
    />
  );
}