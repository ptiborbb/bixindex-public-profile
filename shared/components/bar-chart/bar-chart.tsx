import { max } from 'lodash';
import React, { FC, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { roundToHighestDecimal } from '../../utils/round-to-highest-decimal';

export interface IChartData {
  year: string;
  amount: number;
}

interface IBarChartProps {
  data: IChartData[];
  label: string;
}

export const BarChart: FC<IBarChartProps> = ({ data, label }) => {
  const mappedData = useMemo(() => data.map((d) => d.amount / 1000000), []);
  const maxValue = useMemo(() => roundToHighestDecimal(max(mappedData)), [mappedData]);
  const chartData = useMemo(() => {
    return {
      labels: data.map((d) => d.year),
      datasets: [
        {
          label,
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: mappedData,
          barPercentage: 0.15,
        },
      ],
    };
  }, [data]);

  const chartOptions = useMemo(
    () => ({
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              stepSize: maxValue / 20,
              suggestedMin: 0,
              suggestedMax: maxValue,
            },
          },
        ],
      },
      legend: {
        align: 'start',
      },
    }),
    [maxValue],
  );

  return (
    <div style={{ width: '50vw', height: '50vh' }}>
      <Bar data={chartData} width={10} height={50} options={chartOptions} />
    </div>
  );
};
