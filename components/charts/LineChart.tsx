"use client";

import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface LineChartProps {
    categories: string[];
    series: { name: string; data: number[] }[];
}

const WorkStatusLineChart: React.FC<LineChartProps> = ({ categories, series }) => {
    const options: ApexCharts.ApexOptions = {
        chart: {
            type: "line",
            height: 350,
            toolbar: { show: false },
            foreColor: "#ccc",
        },

        stroke: {
            width: 3,
            curve: "smooth",
        },

        markers: {
            size: 6,
            strokeWidth: 2,
            hover: { size: 8 },
        },

        colors: [
            "#1E90FF", // Completed (blue)
            "#00C896", // Pending (green)
            "#FFA500", // Planning (orange)
            "#FF4971", // Progress (pink/red)
        ],

        tooltip: {
            theme: "dark",
            shared: true,
            intersect: false,
            x: { format: "yyyy/MM/dd" },
        },

        legend: {
            position: "top",
            horizontalAlign: "right",
            labels: { colors: "#fff" },
        },

        grid: {
            borderColor: "#334155",
            strokeDashArray: 4,
        },

        xaxis: {
            categories,
            labels: { rotate: -45, style: { colors: "#fff" } },
        },

        yaxis: {
            labels: { style: { colors: "#fff" } },
        }
    };

    return <Chart options={options} series={series} type="line" height={350} />;
};

export default WorkStatusLineChart;
