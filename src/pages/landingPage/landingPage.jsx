import styles from './landingPage.module.scss';
import useLandingPage from "./useLandingPage";
import { FaGlobe, FaLock, FaServer, FaUserShield, FaChartLine } from 'react-icons/fa';

const LandingPage = () => {
    const {
        formik,
        whoisData,
        sslData,
        safeFormatDate,
        dnsData
    } = useLandingPage();

    //   const isSslDataValid = sslData?.certificates?.[0] && sslData?.domainName === formik.values.domain;

    return (
        <main className={styles.landingPage}>
            <div className="container">
                <section className={styles.hero}>
                    <h1 className="mt-5">Analyze Everything About Any Domain</h1>
                    <p className="mt-4">
                        Get advanced insights into domain history, SEO, value, sales, security and more.
                    </p>
                    <form className={styles.searchForm} onSubmit={formik.handleSubmit}>
                        <input
                            type="text"
                            name="domain"
                            placeholder="Enter domain name..."
                            value={formik.values.domain}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <button type="submit">Analyze</button>
                    </form>
                    {formik.touched.domain && formik.errors.domain && (
                        <div className="error">{formik.errors.domain}</div>
                    )}
                </section>

                {whoisData && (
                    <section className={styles.resultDashboard}>

                        {/* Domain Overview */}
                        <div className={`${styles.domainOverview} ${styles.resultCard}`}>
                            <h4><FaGlobe className="me-2" /> Domain Overview</h4>
                            <div className="mt-4">
                                <h6>Domain Name: <span>{whoisData?.domainName || 'N/A'}</span></h6>
                                <h6 className="mt-3">Created: <span>{safeFormatDate(whoisData?.createdDate, whoisData?.registryData?.createdDate)}</span></h6>
                                <h6 className="mt-3">Expires: <span>{safeFormatDate(whoisData?.expiresDate, whoisData?.registryData?.expiresDate)}</span></h6>
                            </div>
                        </div>

                        {/* SSL Section */}
                        {/* {isSslDataValid && ( */}
                        <div className={`${styles.domainOverview} ${styles.resultCard} mt-4`}>
                            <h4><FaLock className="me-2" /> SSL & IP Info</h4>
                            <div className="mt-4">
                                <h6>SSL Status: <span>Valid until {safeFormatDate(sslData?.certificates[0].validTo)}</span></h6>
                                <h6>Issuer: <span>{sslData?.certificates[0].issuer?.organization || 'N/A'}</span></h6>
                                <h6 className="mt-3">IP Address: <span>{sslData?.ip || 'N/A'}</span></h6>
                                <h6 className="mt-3">Location: <span>{sslData?.certificates[0].issuer?.country || 'N/A'}</span></h6>
                            </div>
                        </div>
                        {/* )} */}

                        {/* DNS Records (static placeholder) */}
                        {dnsData && (
                            <div className={`${styles.domainOverview} ${styles.resultCard} mt-4`}>
                                <h4><FaServer className="me-2" /> DNS Records</h4>
                                <div className="mt-4">

                                    {/* A Records */}
                                    {dnsData.A.length > 0 && (
                                        <div className="mb-3">
                                            <h6>A Record:</h6>
                                            {dnsData.A.map((ip, idx) => (
                                                <span key={idx} className="d-block">{ip}</span>
                                            ))}
                                        </div>
                                    )}

                                    {/* MX Records */}
                                    {dnsData.MX.length > 0 && (
                                        <div className="mb-3">
                                            <h6>MX Record:</h6>
                                            {dnsData.MX.map((mx, idx) => (
                                                <span key={idx} className="d-block">{mx}</span>
                                            ))}
                                        </div>
                                    )}

                                    {/* TXT/SPF Records */}
                                    {dnsData.TXT.length > 0 && (
                                        <div className="mb-3">
                                            <h6>TXT/SPF:</h6>
                                            {dnsData.TXT.map((txt, idx) => (
                                                <span key={idx} className="d-block">{txt}</span>
                                            ))}
                                        </div>
                                    )}

                                    {/* NS Records */}
                                    {dnsData.NS.length > 0 && (
                                        <div className="mb-3">
                                            <h6>NS Record:</h6>
                                            {dnsData.NS.map((ns, idx) => (
                                                <span key={idx} className="d-block">{ns}</span>
                                            ))}
                                        </div>
                                    )}

                                    {/* SOA Record */}
                                    {dnsData.SOA.length > 0 && (
                                        <div className="mb-3">
                                            <h6>SOA Record:</h6>
                                            {dnsData.SOA.map((soa, idx) => (
                                                <span key={idx} className="d-block">{soa}</span>
                                            ))}
                                        </div>
                                    )}

                                </div>
                            </div>
                        )}


                        {/* WHOIS Section */}
                        <div className={`${styles.domainOverview} ${styles.resultCard} mt-4`}>
                            <h4><FaUserShield className="me-2" /> WHOIS Details</h4>
                            <div className="mt-4">
                                <h6>Registrar: <span>{whoisData?.registrant?.organization ?? whoisData?.registrarName ?? 'N/A'}</span></h6>
                                <h6 className="mt-3">Owner: <span>{whoisData?.registrant?.organization ?? 'Private'}</span></h6>
                                <h6 className="mt-3">Country: <span>{whoisData?.registrant?.country ?? whoisData?.registryData?.registrant?.country ?? 'N/A'}</span></h6>
                            </div>
                        </div>

                        {/* Coming Soon */}
                        <div className={`${styles.domainOverview} ${styles.resultCard} mt-4`}>
                            <h4><FaChartLine className="me-2" /> Coming Soon</h4>
                            <div className="mt-4">
                                <h6><span>SEO Score, Valuation, Archive History, etc.</span></h6>
                            </div>
                        </div>

                    </section>
                )}
            </div>
        </main>
    );
};

export default LandingPage;
