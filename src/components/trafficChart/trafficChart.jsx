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
        normalized.Visits.toFixed(1),
        normalized.BounceRate.toFixed(1),
        normalized.PagePerVisit.toFixed(1),
        normalized.TimeOnSite.toFixed(1),
    ].map(Number); // convert to number

    const options = {
        chart: {
            width: "100%",
            type: "pie",
            background: 'transparent',

        },
        stroke: {
            show: false,           // ✅ disables stroke entirely
            width: 0,
            colors: ['transparent']
        },
        labels: ["Visits", "Bounce Rate", "Pages/Visit", "Time on Site"],
        colors: ["#0565E0", "#38BCF8", "#A1A1A1", "#C96E00"],
        theme: {
            mode: "dark",
        },
        legend: {
            show: false, // ✅ Hides legend on all screen sizes
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
            <ReactApexChart
                options={options}
                series={series}
                type="pie"
                width={260}
            />
        </div>
    );
};

export default TrafficChart;
