import styles from './historyArchive.module.scss';
import { FaHistory } from 'react-icons/fa';

const HistoryArchive = () => {
    return (
        <div className={`${styles.domainOverview} ${styles.resultCard} text-white`}>
            <h4><FaHistory className="me-2" /> Archive History</h4>
            <div className="mt-4">
                <p>Wayback machine archive integration coming soon...</p>
            </div>
        </div>
    );
};

export default HistoryArchive;
