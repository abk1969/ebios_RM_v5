// Chart-specific configuration factories
export function getHeatmapConfig() {
  return {
    axisConfig: {
      axisTop: {
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Probabilité',
        legendPosition: 'middle',
        legendOffset: -46
      },
      axisLeft: {
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Impact',
        legendPosition: 'middle',
        legendOffset: -72
      }
    },
    colorConfig: {
      colors: {
        type: 'quantize',
        steps: 5,
        colors: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#3182bd']
      },
      emptyColor: '#f5f5f5'
    },
    legendConfig: {
      anchor: 'bottom',
      translateX: 0,
      translateY: 30,
      length: 400,
      thickness: 8,
      direction: 'row',
      tickPosition: 'after',
      tickSize: 3,
      tickSpacing: 4,
      tickOverlap: false,
      title: 'Nombre de risques →',
      titleAlign: 'start',
      titleOffset: 4
    }
  } as const;
}

export function getRadarConfig() {
  return {
    chartConfig: {
      curve: 'linearClosed',
      borderWidth: 2,
      borderColor: 'white',
      gridLevels: 5,
      gridShape: 'circular',
      gridLabelOffset: 36,
      enableDots: true,
      dotSize: 8,
      dotColor: 'white',
      dotBorderWidth: 2,
      dotBorderColor: '#333333',
      enableDotLabel: true,
      dotLabel: 'value',
      dotLabelYOffset: -12,
      fillOpacity: 0.25,
      blendMode: 'multiply',
      animate: true,
      motionConfig: 'gentle'
    },
    colors: ['#3182bd', '#e6550d', '#31a354']
  } as const;
}

export function getPieConfig() {
  return {
    chartConfig: {
      innerRadius: 0.5,
      padAngle: 0.7,
      cornerRadius: 3,
      activeOuterRadiusOffset: 8,
      borderWidth: 1,
      borderColor: 'white',
      arcLinkLabelsSkipAngle: 10,
      arcLinkLabelsTextColor: '#333333',
      arcLinkLabelsThickness: 2,
      arcLinkLabelsColor: '#333333',
      arcLabelsSkipAngle: 10,
      arcLabelsTextColor: '#ffffff'
    }
  } as const;
}