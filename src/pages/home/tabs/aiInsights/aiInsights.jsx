import styles from './aiInsights.module.scss';
import { FaBrain } from 'react-icons/fa';

const AiInsights = () => {
    return (
        <div className={`${styles.domainOverview} ${styles.resultCard} text-white`}>
            <h4><FaBrain className="me-2" /> AI Insights</h4>
            <div className="mt-4">
                <p>SEO score, trend analysis, and AI predictions coming soon...</p>
            </div>
        </div>
    );
};

export default AiInsights;
