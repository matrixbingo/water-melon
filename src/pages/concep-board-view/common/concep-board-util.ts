const labelOption = {
  show: true,
  fontSize: 16,
  rich: {
    name: {}
  }
};

export const createOptionsBack = (chartData = { xAxis: [] as any[], seriesRaisingLimit: [] as any[], seriesAll: [] as any[]}) => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['涨停数', '总数']
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar', 'stack'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        // data: ['2012', '2013', '2014', '2015', '2016']
        data: chartData.xAxis
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '涨停数',
        type: 'bar',
        barGap: 0,
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        // data: [320, 332, 301, 334, 390]
        data: chartData.seriesRaisingLimit
      },
      {
        name: '总数',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        // data: [220, 182, 191, 234, 290]
        data: chartData.seriesAll
      },
    ]
  };
}


export const createOptions = (chartData = { xAxis: [] as any[], seriesRaisingLimit: [] as any[], seriesAll: [] as any[]}) => {
  return  {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    legend: {
      selected: {
        '总数': false
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: chartData.xAxis.reverse()
      // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    series: [
      {
        name: '涨停数',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        // data: [320, 302, 301, 334, 390, 330, 320]
        data: chartData.seriesRaisingLimit.reverse()
      },
      {
        name: '总数',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        // data: [120, 132, 101, 134, 90, 230, 210]
        data: chartData.seriesAll.reverse()
      }
    ]
  };
}


