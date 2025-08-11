// Speedometer.jsx
import React from "react";
import Chart from "react-apexcharts";

const Speedometer = ({ speedometer_data }) => {
  const { value, min, max } = speedometer_data;

  const options = {
    chart: {
      type: "radialBar",
      offsetY: -20,
      sparkline: { enabled: true }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          dropShadow: { enabled: true, top: 2, blur: 4, opacity: 0.2 }
        },
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5,
          dropShadow: { enabled: false }
        },
        dataLabels: {
          name: {
            offsetY: -10,
            color: "#888",
            fontSize: "14px",
          },
          value: {
            formatter: (val) => parseFloat(val).toFixed(1),
            color: "#111",
            fontSize: "28px",
            show: true,
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#6366f1"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: { lineCap: "round" },
    labels: ["Liquidity Score"],
  };

  // Convert value into percentage of max for the gauge
  const series = [((value - min) / (max - min)) * 100];

  return (
    <div style={{ maxWidth: 350, margin: "auto" }}>
      <Chart options={options} series={series} type="radialBar" height={350} />
    </div>
  );
};

export default Speedometer;
