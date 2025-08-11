import React from "react";
import Chart from "react-apexcharts";

const CompetitiveSnapshotChart = ({ data = [] }) => {
  const competitors = data?.map(d => d.competitor) || [];
  const ourValues = data?.map(d => d.our_value) || [];
  const competitorValues = data?.map(d => d.competitor_value) || [];

  const options = {
    chart: {
      type: "radar",
      background: "transparent",
      toolbar: { show: false }
    },
    colors: ["#0565E0", "#FBBF24"],
    xaxis: {
      categories: competitors,
      labels: { style: { colors: "#fff", fontSize: "12px" } }
    },
    yaxis: {
      labels: { style: { colors: "#fff" } }
    },
    legend: {
      position: "bottom",
      labels: { colors: "#fff" }
    },
    tooltip: {
      theme: "",
      y: {
        formatter: (val, { dataPointIndex }) => {
          const gap = data?.[dataPointIndex]?.gap || "N/A";
          return `${val} (${gap})`;
        }
      }
    },
    stroke: {
      width: 2
    },
    fill: {
      opacity: 0.2
    },
    markers: {
      size: 4
    }
  };

  const series = [
    { name: "Our Value", data: ourValues },
    { name: "Competitor", data: competitorValues }
  ];

  if (!data || data.length === 0) {
    return (
      <div style={{ color: "#fff", textAlign: "center", padding: "20px" }}>
        No competitive snapshot data available.
      </div>
    );
  }

  return (
    <div style={{
      background: "transparent",
      padding: "0px",
      borderRadius: "12px"
    }}>
      {/* <h3 style={{ color: "#fff", textAlign: "center", marginBottom: "15px" }}>
        Competitive Snapshot
      </h3> */}
      <Chart options={options} series={series} type="radar" height={500} />
    </div>
  );
};

export default CompetitiveSnapshotChart;
