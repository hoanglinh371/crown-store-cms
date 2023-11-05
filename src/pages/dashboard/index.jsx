import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { Card } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

import { getReports } from '@/services/reports';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: getReports,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const chartData = {
    labels: data.data.map((item) => item.Month),
    datasets: [
      {
        label: 'Sales Revenue',
        data: data.data.map((item) => item.TotalSales),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data1 = {
    labels: data.data1.map((item) => item.product_name),
    datasets: [
      {
        label: 'Units Sold',
        data: data.data1.map((item) => item.TotalUnitsSold),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options1 = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  const data2 = {
    labels: data.data2.map((item) => item.product_name),
    datasets: [
      {
        label: 'Inventory',
        data: data.data2.map((item) => item.TotalInventory),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options2 = {
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      <Card>
        <Line data={chartData} options={chartOptions} />
      </Card>
      <Card>
        <Bar data={data1} options={options1} />
      </Card>
      <Card>
        <Bar data={data2} options={options2} />
      </Card>
    </div>
  );
}
