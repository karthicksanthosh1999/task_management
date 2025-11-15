"use client";

import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface BarChartProps {
  data: number[];
  categories: string[];
}

const BarChart: React.FC<BarChartProps> = ({ data, categories }) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 350,
      type: "bar",
    },

    plotOptions: {
      bar: {
        borderRadius: 10,
      },
    },

    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#FFD93D"],
        colorStops: [],
        stops: [0, 100],
      },
    },

    dataLabels: {
      enabled: true,
      formatter: (val: number) => val + "%",
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },

    xaxis: {
      categories,
      position: "top",
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: true },
    },

    yaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        show: false,
        formatter: (val) => val + "%",
      },
    },

    responsive: [
      {
        breakpoint: 1024, // Tablets & small laptops
        options: {
          chart: { height: 300 },
          plotOptions: {
            bar: {
              borderRadius: 8,
            },
          },
          dataLabels: {
            style: { fontSize: "10px" },
          },
        },
      },
      {
        breakpoint: 768, // iPad / Large mobile
        options: {
          chart: { height: 280 },
          plotOptions: {
            bar: {
              borderRadius: 6,
              columnWidth: "50%",
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            labels: { rotate: -45 },
          },
        },
      },
      {
        breakpoint: 480, // Mobile screens
        options: {
          chart: { height: 250 },
          plotOptions: {
            bar: {
              borderRadius: 5,
              columnWidth: "60%",
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            labels: { show: true, rotate: -60 },
          },
        },
      },
    ],
  };

  const series = [
    {
      name: "Inflation",
      data,
    },
  ];

  return <Chart options={options} series={series} type="bar" height={350} />;
};

export default BarChart;
