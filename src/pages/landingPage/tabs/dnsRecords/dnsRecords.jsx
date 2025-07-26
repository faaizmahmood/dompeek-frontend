import styles from './dnsRecords.module.scss';
import { FaServer } from 'react-icons/fa';

const DnsRecords = ({ dnsData }) => {
    return (
        <div className={`${styles.domainOverview} ${styles.resultCard}`}>
            <h4><FaServer className="me-2" /> DNS Records</h4>
            <div className="mt-4">
                {["A", "MX", "TXT", "NS", "SOA"].map((type) => (
                    dnsData[type]?.length > 0 && (
                        <div key={type} className="mb-3">
                            <h6>{type} Record:</h6>
                            {dnsData[type].map((val, idx) => (
                                <span key={idx} className="d-block">{val}</span>
                            ))}
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default DnsRecords;
