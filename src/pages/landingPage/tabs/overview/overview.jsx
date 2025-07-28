import styles from './overview.module.scss';
import { FaGlobe, FaLock } from 'react-icons/fa';

const Overview = ({ whoisData, sslData, safeFormatDate }) => {
    const domainName = whoisData?.domainName || 'N/A';
    const createdDate = safeFormatDate(
        whoisData?.createdDate,
        whoisData?.registryData?.createdDate
    );
    const expiresDate = safeFormatDate(
        whoisData?.expiresDate,
        whoisData?.registryData?.expiresDate
    );

    const sslCert = sslData?.certificates?.[0];
    const sslValidTo = safeFormatDate(sslCert?.validTo);
    const sslIssuer = sslCert?.issuer?.organization || 'N/A';
    const sslCountry = sslCert?.issuer?.country || 'N/A';
    const sslIp = sslData?.ip || 'N/A';

    return (
        <div className={styles.domainOverview}>
            {/* Header */}
            <div className={`d-flex gap-3 ${styles.tab_head}`}>
                <FaGlobe size={40} className="mt-2" />
                <div>
                    <h4>Overview</h4>
                    <p>{domainName}</p>
                </div>
            </div>

            {/* Cards */}
            <div className="row mt-4">
                {/* Domain Info */}
                <div className="col-12 col-md-6">
                    <div className={styles.OverviewCard}>
                        <h4><FaGlobe className="me-2" />Domain Overview</h4>
                        <h6 className="mt-4">
                            Domain Name: <span>{domainName}</span>
                        </h6>
                        <h6 className="mt-3">
                            Created: <span>{createdDate}</span>
                        </h6>
                        <h6 className="mt-3">
                            Expires: <span>{expiresDate}</span>
                        </h6>
                    </div>
                </div>

                {/* SSL Info */}
                <div className="col-12 col-md-6">
                    <div className={styles.OverviewCard}>
                        <h4><FaLock className="me-2" />SSL & IP Info</h4>
                        <h6 className="mt-4">
                            SSL Status: <span>Valid until {sslValidTo || 'N/A'}</span>
                        </h6>
                        <h6>
                            Issuer: <span>{sslIssuer}</span>
                        </h6>
                        <h6 className="mt-3">
                            IP Address: <span>{sslIp}</span>
                        </h6>
                        <h6 className="mt-3">
                            Location: <span>{sslCountry}</span>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
