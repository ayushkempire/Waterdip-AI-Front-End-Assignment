import React from 'react';
import Chart from 'react-apexcharts';

const SparklineChart = ({ data, type }) => {
  const totalVisitors = data.reduce((acc, row) => {
    acc += parseInt(row[type]);
    return acc;
  }, 0);

  const series = [
    {
      name: `Total ${type}`,
      data: [totalVisitors],
    },
  ];

  return (
    <Chart
      type="line"
      series={series}
      options={{
        chart: {
          id: `sparkline-${type}`,
          sparkline: {
            enabled: true,
          },		  
		  background: 'transparent'
        },
		theme : {
			mode: 'dark',
		},
      }}
    />
  );
};

export default SparklineChart;