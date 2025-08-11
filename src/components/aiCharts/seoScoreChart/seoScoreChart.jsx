import React from "react";
import Chart from "react-apexcharts";

const SEOScoreChart = ({ chartData }) => {
  const { labels, values } = chartData;

  const series = [
    {
      name: "SEO Metrics",
      data: values
    }
  ];

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 6
      }
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val}`
    },
    xaxis: {
      categories: labels,
      labels: {
        style: {
          colors: "#d9d9d9ff",
          fontSize: "14px"
        }
      }
    },
    yaxis: {
      min: 0,
      max: 100, // Assuming percentages, adjust if not
      tickAmount: 5,
      labels: {
        formatter: (val) => `${val}`,
        style: {
          colors: "#d9d9d9ff", // same as x-axis
          fontSize: "14px"
        }
      }
    },
    colors: ["#6366f1"],
    grid: { borderColor: "#ffffffff" },
    tooltip: {
      y: {
        formatter: (val) => `${val}`
      }
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: 800, margin: "auto" }}>
      <Chart options={options} series={series} type="bar" height={250} />
    </div>
  );
};

export default SEOScoreChart;
