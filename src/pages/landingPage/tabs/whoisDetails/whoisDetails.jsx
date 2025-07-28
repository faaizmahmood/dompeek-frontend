import { FaUserShield, FaRegCalendarAlt, FaServer, FaLock, FaExclamationTriangle } from 'react-icons/fa';
import styles from './whoisDetails.module.scss';

const WhoisDetails = ({ whoisData }) => {
    const registry = whoisData?.registryData || {};
    const registrant = registry?.registrant || {};
    const nameservers = registry?.nameServers?.hostNames || [];

    const createdDate = new Date(registry?.createdDateNormalized || '').toDateString();
    const expiresDate = new Date(registry?.expiresDateNormalized || '').toDateString();
    // const updatedDate = new Date(registry?.updatedDateNormalized || '').toDateString();
    const status = registry?.status || 'N/A';
    const abuseEmail = whoisData?.contactEmail || 'N/A';

    return (
        <div className={`${styles.whoIsDetails} ${styles.resultCard}`}>
        
            <div className={`d-flex gap-3 ${styles.tab_head}`}>
                <FaUserShield size={40} className='mt-2' />
                <div>
                    <h4>Overview</h4>
                    <p>{whoisData?.domainName || 'N/A'}</p>
                </div>
            </div>

            {/* Row 1: Owner, Registrar | Dates | Nameservers */}
            <div className="row mt-4">
                <div className={`col-md-4 $`}>
                    <div className={styles.card}>
                        <h6>Owner:</h6>
                        <p>{registrant.organization || 'Private'}</p>
                        <h6 className="mt-3">Registrar:</h6>
                        <p>{whoisData?.registrarName || 'N/A'}</p>
                    </div>
                </div>
                <div className={`col-md-4 mt-md-0 mt-3`}>
                    <div className={styles.card}>
                        <h6><FaRegCalendarAlt className="me-1" /> Registered On:</h6>
                        <p>{createdDate || 'N/A'}</p>
                        <h6 className="mt-3">Expires On:</h6>
                        <p>{expiresDate || 'N/A'}</p>
                    </div>

                </div>
                <div className={`col-md-4 mt-md-0 mt-3`}>
                    <div className={styles.card}>
                        <h6><FaServer className="me-1" /> Name Servers:</h6>
                        <ul className="ps-3">
                            {nameservers.map((ns, i) => <li key={i}>{ns}</li>)}
                        </ul>
                    </div>

                </div>
            </div>

            {/* Row 2: WHOIS status and Guard */}
            <div className="row mt-md-4 mt-3">
                <div className={`col-12 `}>
                    <div className={styles.card}>
                        <h6><FaLock className="me-1" /> Status:</h6>
                        <p>{status}</p>
                        <h6 className="mt-3">WHOIS Guard Enabled:</h6>
                        <p>{registrant.organization?.toLowerCase().includes('privacy') ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            </div>

            {/* Row 3: Audit events and abuse contact */}
            <div className="row mt-md-4 mt-3">
                <div className={`col-md-6 `}>
                    <div className={styles.card}>
                        <h6>Recent WHOIS Events:</h6>
                        <p className='mt-3'><span>Created:</span> {new Date(whoisData?.audit?.createdDate || '').toDateString()}</p>
                        <p><span>Updated:</span> {new Date(whoisData?.audit?.updatedDate || '').toDateString()}</p>
                    </div>
                </div>
                <div className={`col-md-6 mt-md-0 mt-3`}>
                    <div className={styles.card}>
                        <h6><FaExclamationTriangle className="me-1" /> Abuse Contact:</h6>
                        <p className='mt-3'>{abuseEmail}</p>
                        <h6 className="mt-3">Transfer Lock:</h6>
                        <p>{status?.includes('clientTransferProhibited') ? 'Enabled' : 'Disabled'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhoisDetails;
