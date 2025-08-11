import React from "react";
import dayjs from "dayjs";
import styles from "./timelineChat.module.scss"; // We'll style it nicely

const TimelineChart = ({ timeline }) => {
  const { labels, dates } = timeline;

  const events = [
    { label: labels?.[0] || "Created", date: dates[0] },
    { label: labels?.[1] || "Now", date: dates[1] },
    { label: labels?.[2] || "Expiry", date: dates[2] }
  ].filter(e => e.date && e.date !== "N/A");

  return (
    <div className={styles.timelineContainer}>
      {events.map((event, idx) => (
        <div className={styles.timelineItem} key={idx}>
          <div className={styles.timelineDot} />
          <div className={styles.timelineContent}>
            <h4>{event.label}</h4>
            <p>{dayjs(event.date).format("MMM DD, YYYY")}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineChart;
