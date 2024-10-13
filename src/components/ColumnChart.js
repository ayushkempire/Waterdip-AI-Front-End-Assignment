import React from 'react';
import Chart from 'react-apexcharts';

const ColumnChart = ({ data }) => {
  const visitorsPerCountry = data.reduce((acc, row) => {
    const visitors = parseInt(row.adults) + parseInt(row.children) + parseInt(row.babies);
    acc[row.country] = (acc[row.country] || 0) + visitors;
    return acc;
  }, {});

  const series = [
    {
      name: 'Visitors',
      data: Object.entries(visitorsPerCountry).map(([country, value]) => ({
        x: country,
        y: value,
      })),
    },
  ];

  return (
    <Chart
      type="bar"
      series={series}
      options={{
        chart: {
          id: 'visitors-country',		  
		  background: 'transparent'
        },
        xaxis: {
          categories: Object.keys(visitorsPerCountry),
        },
		grid: {
		  xaxis: {
			lines: {
			  show: false,
			}
		  },
		  yaxis: {
			lines: {
			  show: true,
			}
		  },
		  borderColor: '#333',
		  strokeDashArray: 7,
		},
		theme : {
			mode: 'dark',
		},
      }}
    />
  );
};

export default ColumnChart;