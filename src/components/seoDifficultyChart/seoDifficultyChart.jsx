import React from "react";
import ReactApexChart from "react-apexcharts";
import styles from "./seoDifficultyChart.module.scss";

const SeoDifficultyChart = ({domainData}) => {

  const series = [
    {
      data: [domainData?.seoMetrics?.metrics?.data?.seo_difficulty, domainData?.seoMetrics?.metrics?.data?.on_page_difficulty, domainData?.seoMetrics?.metrics?.data?.off_page_difficulty]
    }
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
      foreColor: "#fff"
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '80%',
        borderRadius: 2
      }
    },
    dataLabels: {
      enabled: true,
      position: 'center',
      offsetX: 25,
      formatter: (val) => `${val}%`,
      style: {
        colors: ["#fff"]
      }
    },
    xaxis: {
      categories: ["SEO Difficulty", "On-page Difficulty", "Off-page Difficulty"],
      max: 100,
      labels: {
        style: {
          colors: "#fff"
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: "#fff"
        }
      }
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val) => `${val}%`
      }
    },
    grid: {
      show: false
    },
    colors: ["#0565E0"]
  };

  return (
    <div className={styles.seoDifficultyChart}>
      <ReactApexChart options={options} series={series} type="bar" height={300} />
    </div>
  );
};

export default SeoDifficultyChart;
