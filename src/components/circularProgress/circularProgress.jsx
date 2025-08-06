// eslint-disable-next-line no-unused-vars
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import styles from './circularProgress.module.scss';

const CircularProgress = ({ percentage, duration = 2, label }) => {
  const radius = 80;
  const stroke = 12;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      strokeDashoffset,
      transition: { duration, ease: "easeInOut" }
    });
  }, [strokeDashoffset, controls, duration]);

  return (
    <div className={styles.circleWrapper}>
      <svg height={radius * 2} width={radius * 2}>
        <circle
          className={styles.bg}
          stroke="#d1d1f2"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <motion.circle
          className={styles.progress}
          stroke="#5f67ff"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={controls}
        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className={styles.circleLabel}>
          {label}
        </text>
      </svg>
    </div>
  );
};

export default CircularProgress;
