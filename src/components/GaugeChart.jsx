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
            width: 30, // Increased width for better visibility
            color: [
              [0.25, "#FF0000"],  // Bad (Red)
              [0.5, "#FFA500"],   // Average (Orange)
              [0.75, "#00FF00"],  // Good (Green)
              [1, "#004d00"],     // Excellent (Dark Green)
            ],
          },
        },
        pointer: {
          width: 5,
          length: "85%",
          itemStyle: {
            color: "blue", // Pointer color
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          length: 5,
          lineStyle: {
            color: "#fff",
          },
        },
        axisLabel: {
          show: false,
        },
        detail: {
          formatter: (value) => `OEE: ${value}%`, // Adjusted label
          fontSize: 14,
          fontWeight: "bold",
          offsetCenter: [0, "65%"],
        },
        data: [{ value: 80 }], // Adjust the pointer value here
      },
    ],
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
      <ReactECharts option={option} style={{ height: "300px", width: "400px" }} />
    </div>
  );
};

export default GaugeChart;
