// components/LocalProgressBar.jsx
import styles from './localProgressBar.module.scss';

const LocalProgressBar = ({ loading }) => {
  return (
    <div className={`${styles.progressContainer} ${loading ? styles.active : ''}`}>
      <div className={styles.progressBar}></div>
    </div>
  );
};

export default LocalProgressBar;
