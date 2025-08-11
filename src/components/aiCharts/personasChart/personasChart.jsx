// PersonasChart.jsx
import React from "react";
import Chart from "react-apexcharts";

const PersonasChart = ({ personas }) => {
    const truncateLabel = (label) => {
        if (!label) return "";
        return label.length > 5 ? label.substring(0, 5) + "..." : label; // shorten long labels
    };

    const options = {
        chart: {
            type: "bar",
            toolbar: { show: false },
            background: "transparent",
        },
        plotOptions: {
            bar: {
                horizontal: true,
                borderRadius: 6,
                distributed: false, // use single color
                barHeight: "60%",
            }
        },
        colors: ["#0565E0"], // single color for all bars
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val}%`,
            style: {
                colors: ["#fff"]
            }
        },
        legend: {
            show: false
        },
        xaxis: {
            categories: personas.map(p => truncateLabel(p.label)),
            labels: {
                style: {
                    colors: "#fff",
                    fontSize: "13px"
                }
            },
            max: 100
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#fff",
                    fontSize: "13px"
                }
            }
        },
        tooltip: {
            theme: "dark", // ensures dark background
            style: {
                fontSize: "13px",
                color: "#fff"
            },
            custom: function ({ series, seriesIndex, dataPointIndex }) {
                const persona = personas[dataPointIndex];
                const label = persona?.label || "";
                const reason = persona?.reason || "";
                const match = series[seriesIndex][dataPointIndex];

                return `
      <div style="
        background: #1A1E34;
        color: white;
        padding: 10px;
        border-radius: 6px;
        max-width: 250px;
        white-space: normal;
        word-break: break-word;
        font-size: 13px;
      ">
        <strong>${label}</strong><br/>
        <span style="color:#38BDF8;font-weight:bold;">${match}% match</span>
        <div style="margin-top:5px;">
          ${reason}
        </div>
      </div>
    `;
            }
        },

        grid: {
            borderColor: "#eee"
        }
    };

    const series = [
        {
            name: "Match %",
            data: personas.map(p => p.match_percent)
        }
    ];

    return (
        <div style={{
            background: "",
            padding: "0px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            color: 'white'
        }}>
            <Chart options={options} series={series} type="bar" height={350} />
        </div>
    );
};

export default PersonasChart;
