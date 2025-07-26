import styles from './salesInfo.module.scss';
import { FaChartLine } from 'react-icons/fa';

const SalesInfo = () => {
    return (
        <div className={`${styles.domainOverview} ${styles.resultCard}`}>
            <h4><FaChartLine className="me-2" /> Sales</h4>
            <div className="mt-4">
                <p>Domain sale history & valuation coming soon...</p>
            </div>
        </div>
    );
};

export default SalesInfo;
