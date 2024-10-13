import React from 'react';
import Chart from 'react-apexcharts';

const TimeSeriesChart = ({ data }) => {
  const visitorsPerDay = data.reduce((acc, row) => {
    const date = `${row.arrival_date_year}-${row.arrival_date_month}-${row.arrival_date_day_of_month}`;
    const visitors = parseInt(row.adults) + parseInt(row.children) + parseInt(row.babies);
    acc[date] = (acc[date] || 0) + visitors;
    return acc;
  }, {});

  const series = [
    {
      name: 'Visitors',
      data: Object.entries(visitorsPerDay).map(([date, value]) => ({
        x: new Date(date),
        y: value,
      })),
    },
  ];

  return (
    <Chart
      type="line"
      series={series}
      options={{
        chart: {
          id: 'visitors-time-series',
		  background: 'transparent'
        },
        xaxis: {
          type: 'datetime',
        },
        zoom: {
          enabled: true,
        },
		grid: {
		  xaxis: {
			lines: {
			  show: true,
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

export default TimeSeriesChart;