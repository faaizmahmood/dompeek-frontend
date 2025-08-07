import React from "react";
import ReactApexChart from "react-apexcharts";
import styles from "./trafficChart.module.scss";

const TrafficChart = ({ domainData }) => {
    const trafficData = {
        Visits: Number(domainData?.seoMetrics?.metrics?.data?.traffic?.Visits ?? 0),
        BounceRate: Number(domainData?.seoMetrics?.metrics?.data?.traffic?.BounceRate ?? 0),
        PagePerVisit: Number(domainData?.seoMetrics?.metrics?.data?.traffic?.PagePerVisit ?? 0),
        TimeOnSite: Number(domainData?.seoMetrics?.metrics?.data?.traffic?.TimeOnSite ?? 0),
    };

    // Normalize values (0–100)
    const normalized = {
        Visits: Math.min((trafficData.Visits / 6000000000) * 100, 100),
        BounceRate: trafficData.BounceRate,
        PagePerVisit: (trafficData.PagePerVisit / 10) * 100,
        TimeOnSite: (trafficData.TimeOnSite / 600) * 100,
    };

    const series = [
        normalized.Visits,
        normalized.BounceRate,
        normalized.PagePerVisit,
        normalized.TimeOnSite,
    ].map(num => Number(num.toFixed(1)));

    // ✅ Fallback: If all values are 0 or NaN
    const hasValidData = series.some(value => !isNaN(value) && value > 0);

    const options = {
        chart: {
            width: "100%",
            type: "pie",
            background: 'transparent',
        },
        stroke: {
            show: false,
            width: 0,
            colors: ['transparent']
        },
        labels: ["Visits", "Bounce Rate", "Pages/Visit", "Time on Site"],
        colors: ["#0565E0", "#38BCF8", "#A1A1A1", "#C96E00"],
        theme: {
            mode: "dark",
        },
        legend: {
            show: false,
        },
        responsive: [
            {
                breakpoint: 576,
                options: {
                    chart: {
                        width: 230,
                    },
                    legend: {
                        show: false,
                    },
                },
            },
        ],
    };

    return (
        <div className={`${styles.trafficChart} mt-5`}>
            {hasValidData ? (
                <ReactApexChart
                    options={options}
                    series={series}
                    type="pie"
                    width={260}
                />
            ) : (
                <div className="text-muted text-center py-4">
                    <h6 className="text-whitw" style={{ fontSize: "14px" }}>No traffic data available for this domain</h6>
                </div>
            )}
        </div>
    );
};

export default TrafficChart;
