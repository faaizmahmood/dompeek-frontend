import styles from './dnsRecords.module.scss';
import { FaServer } from 'react-icons/fa';

const DnsRecords = ({ dnsData, whoisData }) => {
    const recordTypes = {
        row1: ['A', 'MX'],
        row2: ['TXT'],
        row3: ['NS', 'SOA'],
    };

    const renderRecordCard = (type, colClass = "col-md-6") => (
        dnsData[type]?.length > 0 && (
            <div key={type} className={`mb-4 ${colClass}`}>
                <div className={styles.card}>
                    <h6>{type} Record:</h6>
                    <span>
                        {dnsData[type].map((val, idx) => (
                            <span key={idx} className="d-block small mt-3">{val}</span>
                        ))}
                    </span>

                </div>
            </div>
        )
    );

    return (
        <div className={`${styles.dnsRecord} ${styles.resultCard}`}>

            {/* <h4><FaServer className="me-2" /> DNS Records</h4> */}

            <div className={`d-flex gap-3 ${styles.tab_head}`}>
                            <FaServer color='#fff' size={40} className='mt-2' />
                            <div>
                                <h4>Overview</h4>
                                <p>{whoisData?.domainName || 'N/A'}</p>
                            </div>
                        </div>

            {/* Row 1: A + MX */}
            <div className="row mt-4">
                {recordTypes.row1.map(type => renderRecordCard(type))}
            </div>

            {/* Row 2: TXT full width */}
            <div className="row">
                {recordTypes.row2.map(type => renderRecordCard(type, "col-12"))}
            </div>

            {/* Row 3: NS + SOA */}
            <div className="row">
                {recordTypes.row3.map(type => renderRecordCard(type))}
            </div>
        </div>
    );
};

export default DnsRecords;
