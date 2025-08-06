import React from "react";
import ReactApexChart from "react-apexcharts";
import styles from "./searchTrendChart.module.scss";

const SearchTrendChart = ({ domainData }) => {
    const monthlySearchData =
        domainData?.seoMetrics?.metrics?.data?.search_trend_data || [];

    // Early return if no data
    if (monthlySearchData.length === 0) {
        return (
            <div className={styles.searchTrendChart}>
                <p style={{ color: "#ccc", textAlign: "center" }}>No search trend data available</p>
            </div>
        );
    }

    // Extract labels and values safely
    const labels = monthlySearchData.map((d) =>
        `${d?.month?.substring(0, 3)} ${d?.year}`
    );

    const values = monthlySearchData.map((d) => d?.value || 0);

    const options = {
        chart: {
            type: "area",
            height: 350,
            zoom: { enabled: false },
            foreColor: "#fff",
            background: "transparent",
        },
        dataLabels: { enabled: false },
        stroke: { curve: "smooth" },
        title: {
            text: "Search Trends Over Time",
            align: "left",
            style: {
                fontSize: "16px",
                color: "#fff",
            },
        },
        xaxis: {
            categories: labels,
            labels: {
                rotate: -45,
            },
        },
        yaxis: {
            title: {
                text: "Search Volume",
                style: {
                    color: "#fff",
                },
            },
        },
        tooltip: {
            y: {
                formatter: (val) => val.toLocaleString(),
            },
        },
        grid: {
            borderColor: "rgba(255,255,255,0.1)",
        },
    };

    const series = [
        {
            name: "Search Volume",
            data: values,
        },
    ];

    return (
        <div className={styles.searchTrendChart}>
            <ReactApexChart options={options} series={series} type="area" height={350} />
        </div>
    );
};

export default SearchTrendChart;
