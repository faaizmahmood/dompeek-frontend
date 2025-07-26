import styles from './overview.module.scss'
import { FaGlobe, FaLock } from 'react-icons/fa';

const Overview = ({ whoisData, safeFormatDate, sslData }) => {
    return (
        <>
            <div className={`${styles.domainOverview}`}>

                <div className={`d-flex gap-3 ${styles.tab_head}`}>
                    <FaGlobe size={40} className='mt-2' />
                    <div>
                        <h4>Overview</h4>
                        <p>{whoisData?.domainName || 'N/A'}</p>
                    </div>
                </div>

                <div className='row mt-4'>

                    <div className="col-6">
                        <div className={styles.OverviewCard}>
                            <h4><FaGlobe className="me-2" />Domain Overview</h4>
                            <h6 className="mt-4">Domain Name: <span>{whoisData?.domainName || 'N/A'}</span></h6>
                            <h6 className="mt-3">Created: <span>{safeFormatDate(whoisData?.createdDate, whoisData?.registryData?.createdDate)}</span></h6>
                            <h6 className="mt-3">Expires: <span>{safeFormatDate(whoisData?.expiresDate, whoisData?.registryData?.expiresDate)}</span></h6>
                        </div>
                    </div>

                    <div className={`col-6`}>
                        <div className={styles.OverviewCard}>
                            <h4><FaLock className="me-2" /> SSL & IP Info</h4>
                            <h6 className='mt-4'>SSL Status: <span>Valid until {safeFormatDate(sslData?.certificates[0].validTo)}</span></h6>
                            <h6>Issuer: <span>{sslData?.certificates[0].issuer?.organization || 'N/A'}</span></h6>
                            <h6 className="mt-3">IP Address: <span>{sslData?.ip || 'N/A'}</span></h6>
                            <h6 className="mt-3">Location: <span>{sslData?.certificates[0].issuer?.country || 'N/A'}</span></h6>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Overview