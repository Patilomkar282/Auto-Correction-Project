import React from "react";
import ReactECharts from "echarts-for-react";

const GaugeChart = () => {
  const option = {
    title: {
      text: "Gauge Chart",
      left: "center",
      top: "5%",
      textStyle: { fontSize: 14, fontWeight: "bold" },
    },
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 4,
        axisLine: {
          lineStyle: {
            width: 80,
            color: [
              [0.25, "#FF0000"],  // 🔴 Bad (Red)
              [0.5, "#FFA500"],   // 🟠 Average (Orange)
              [0.75, "#00FF00"],  // 🟢 Good (Green)
              [1, "#004d00"],     // 🟢 Dark Green (Excellent)
            ],
          },
        },
        pointer: {
          width: 4,
          length: "80%",
          itemStyle: {
            color: "blue", // Pointer color
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          length: 10,
          lineStyle: {
            color: "#fff",
          },
        },
        axisLabel: {
          show: false,
        },
        detail: {
          formatter: (value) => `Percentage OEE : ${value}%`, // 🆕 Added Label
          fontSize: 16,
          fontWeight: "bold",
          offsetCenter: [0, "70%"],
        },
        data: [{ value: 80 }], // Adjust the pointer value here
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: "500px", width: "500px", marginLeft:'250px', marginTop:'20px'}} />;
};

export default GaugeChart;
