"use client";

import React from "react";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface DonutChartProps {
  labels: string[];
  series: number[];
}

const DonutChart: React.FC<DonutChartProps> = ({ labels, series }) => {
  const options: ApexCharts.ApexOptions = {
    labels,
    chart: {
      type: "donut",
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#83a4d4", "#ff9a9e", "#a18cd1", "#f6d365"],
        inverseColors: false,
        opacityFrom: 0.9,
        opacityTo: 1,
        stops: [0, 100],
      },
    },

    colors: ["#3f87a6", "#ff758c", "#7f53ac", "#ffb56b"],

    legend: {
      position: "bottom",
      offsetY: 0,
      height: 30,
    },

    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: { width: 350 },
          legend: { position: "bottom" },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: { width: 300 },
          legend: { position: "bottom" },
        },
      },
      {
        breakpoint: 480,
        options: {
          chart: { width: 250 },
          legend: { show: false },
        },
      },
      {
        breakpoint: 360,
        options: {
          chart: { width: 200 },
          legend: { show: false },
        },
      },
    ],
  };

  return (
    <ApexChart options={options} series={series} type="donut" width="380" />
  );
};

export default DonutChart;
