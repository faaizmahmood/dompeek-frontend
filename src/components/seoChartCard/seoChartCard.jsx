import React from 'react';
import styles from './seoChartCard.module.scss';

const SEOChartCard = ({ label, value }) => {
    // Generate dummy chart data (simulate fluctuation)
    const chartPoints = Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * (parseInt(value) + 5))
    );

    // Determine color based on value
    const getColor = (val) => {
        const v = parseInt(val);
        if (v <= 10) return '#ff4d4f'; // red
        if (v <= 30) return '#facc15'; // yellow
        return '#4ade80'; // green
    };

    const chartPath = chartPoints
        .map((point, i) => {
            const x = (i / (chartPoints.length - 1)) * 100;
            const y = 100 - point;
            return `${i === 0 ? 'M' : 'L'}${x},${y}`;
        })
        .join(' ');

    return (
        <div className={`${styles.card} ${styles.seoChartCard}`}>
            <h6>{label}</h6>
            <h5>{value}</h5>

            <svg viewBox="0 0 100 100" className={styles.chart}>
                <path
                    d={chartPath}
                    fill="none"
                    stroke={getColor(value)}
                    strokeWidth="2"
                />
            </svg>
        </div>
    );
};

export default SEOChartCard;
