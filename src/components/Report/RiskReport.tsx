import React from 'react';
import type { Risk, Scenario, Asset, Threat } from '../../types';
import { RiskOverview } from './sections/RiskOverview';
import { RiskMatrix } from './sections/RiskMatrix';
import { RiskTrends } from './sections/RiskTrends';
import { DetailedAnalysis } from './sections/DetailedAnalysis';
import { ExecutiveSummary } from './sections/ExecutiveSummary';
import { MitigationStrategies } from './sections/MitigationStrategies';

interface RiskReportProps {
  risks: Risk[];
  scenarios: Scenario[];
  assets: Asset[];
  threats: Threat[];
}

export function RiskReport({ risks, scenarios, assets, threats }: RiskReportProps) {
  return (
    <div id="risk-report" className="p-8 bg-white">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Rapport d'analyse des risques EBIOS RM</h1>
        <p className="mt-4 text-lg text-gray-600">
          Analyse détaillée des risques selon la méthodologie EBIOS Risk Manager
        </p>
      </header>

      <ExecutiveSummary 
        assets={assets}
        threats={threats}
        scenarios={scenarios}
        risks={risks}
      />

      <RiskOverview risks={risks} className="mb-12" />
      
      <RiskMatrix 
        risks={risks}
        scenarios={scenarios}
        className="mb-12"
      />
      
      <RiskTrends 
        risks={risks}
        scenarios={scenarios}
        className="mb-12"
      />

      <DetailedAnalysis
        risks={risks}
        scenarios={scenarios}
        assets={assets}
        threats={threats}
        className="mb-12"
      />
      
      <MitigationStrategies
        risks={risks}
        scenarios={scenarios}
      />
    </div>
  );
}