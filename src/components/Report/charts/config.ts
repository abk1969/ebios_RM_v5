// Shared chart configuration and types
export const CHART_MARGINS = {
  pie: { top: 40, right: 80, bottom: 80, left: 80 },
  radar: { top: 70, right: 80, bottom: 40, left: 80 },
  heatmap: { top: 60, right: 90, bottom: 60, left: 90 }
} as const;

export const RISK_COLORS = {
  low: 'rgb(34, 197, 94)',      // Green
  medium: 'rgb(234, 179, 8)',   // Yellow
  high: 'rgb(249, 115, 22)',    // Orange
  critical: 'rgb(239, 68, 68)'  // Red
} as const;

export const RISK_LEVELS = {
  low: { max: 6, label: 'Faible' },
  medium: { max: 12, label: 'Moyen' },
  high: { max: 18, label: 'Élevé' },
  critical: { max: 25, label: 'Critique' }
} as const;

// Chart-specific configurations
export const CHART_THEMES = {
  tooltip: {
    container: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      background: '#ffffff',
      color: '#333333',
      fontSize: '12px',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
      padding: '8px 12px',
    },
  },
} as const;
