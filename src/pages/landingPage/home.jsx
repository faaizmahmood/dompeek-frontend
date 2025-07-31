// import { useState } from 'react';
import styles from './home.module.scss';
import useHome from "./useHome";
import { FaGlobe, FaBan, FaServer, FaUserShield, FaChartLine, FaBrain, FaHistory, FaNetworkWired, FaMapMarkerAlt } from 'react-icons/fa';
import { BiTransferAlt } from 'react-icons/bi';
import Overview from './tabs/overview/overview';
import WhoisDetails from './tabs/whoisDetails/whoisDetails';
import DnsRecords from './tabs/dnsRecords/dnsRecords';
import HistoryArchive from './tabs/historyArchive/historyArchive';
import AiInsights from './tabs/aiInsights/aiInsights';
import Availability from './tabs/availability/availability';
import { useEffect } from 'react';
import BlackList from './tabs/blacklist/blacklist';
import ReverseIP from './tabs/reverseIP/reverseIP';
import Model from '../../components/model/model';
import { FaExclamationTriangle } from 'react-icons/fa'
import TabLoading from '../../components/tabLoading/tabLoading';
import Geolocation from './tabs/geolocation/geolocation';
import { useAppSelector } from '../../redux/hooks';

const Home = () => {

    const currentUser = useAppSelector((state) => state.user.profile)

    console.log(currentUser)

    const {
        formik,
        whoisData,
        sslData,
        safeFormatDate,
        dnsData,
        activeTab,
        setActiveTab,
        handleCloseModel,
        showModal,
        loading
    } = useHome();

    useEffect(() => {
        console.log(whoisData)
    }, [whoisData])


    const tabs = [
        { key: "available", label: "Availability", icon: <FaGlobe color='#60a5fa' /> },
        { key: "overview", label: "Overview", icon: <FaGlobe color='#60a5fa' /> },
        { key: "whois", label: "WHOIS", icon: <FaUserShield color='#60a5fa' /> },
        { key: "dns", label: "DNS", icon: <FaServer color='#60a5fa' /> },
        { key: "blacklist", label: "Blacklist", icon: <FaBan color='#60a5fa' /> },
        { key: "reverseip", label: "Reverse IP", icon: <BiTransferAlt color='#60a5fa' /> },
        { key: "geolocation", label: "Geolocation", icon: <FaMapMarkerAlt color='#60a5fa' /> },
        { key: "history", label: "History", icon: <FaHistory color='#60a5fa' /> },
        { key: "insights", label: "AI Insights", icon: <FaBrain color='#60a5fa' /> },
    ];

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
            </div>

            {
                loading ? <TabLoading /> : (
                    <>
                        {(whoisData || sslData || dnsData) && (

                            <div className='container-fluid p-0 mt-5'>
                                <div className={styles.tabs}>
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.key}
                                            className={`${styles.tabButton} ${activeTab === tab.key ? styles.active : ''}`}
                                            onClick={() => setActiveTab(tab.key)}
                                        >
                                            {tab.icon} {tab.label}
                                        </button>
                                    ))}
                                </div>

                                <section className={styles.resultDashboard}>

                                    <div className={`${styles.content}`}>



                                        {activeTab === "available" && (
                                            <Availability whoisData={whoisData} />
                                        )}

                                        {activeTab === "overview" && (
                                            <Overview sslData={sslData} safeFormatDate={safeFormatDate} whoisData={whoisData} />
                                        )}

                                        {activeTab === "whois" && (
                                            <WhoisDetails whoisData={whoisData} />
                                        )}

                                        {activeTab === "dns" && dnsData && (
                                            <DnsRecords dnsData={dnsData} whoisData={whoisData} />
                                        )}

                                        {activeTab === "blacklist" && (
                                            <BlackList whoisData={whoisData} />
                                        )}

                                        {activeTab === "reverseip" && (
                                            <ReverseIP whoisData={whoisData} />
                                        )}

                                        {activeTab === "geolocation" && (
                                            <Geolocation whoisData={whoisData} />
                                        )}


                                        {activeTab === "history" && (
                                            <HistoryArchive />
                                        )}

                                        {activeTab === "insights" && (
                                            <AiInsights />
                                        )}

                                    </div>
                                </section>
                            </div>
                        )}
                    </>
                )
            }



            <Model showModal={showModal} handleClose={handleCloseModel}>
                <div className={styles.limitReached}>
                    <div className={styles.animatedIcon}>
                        <FaExclamationTriangle />
                    </div>
                    <h2>Limit Reached</h2>
                    <p>You’ve hit the limit for free domain lookups.</p>

                    {currentUser?.success === true ? (
                        <p>Upgrade your plan to unlock unlimited analysis.</p>
                    ) : (
                        <p>Sign up now to unlock unlimited analysis!</p>
                    )}

                    <div className={styles.actions}>
                        <button>
                            {currentUser?.success === true ? "Upgrade Plan" : "Create Free Account"}
                        </button>
                    </div>
                </div>

            </Model>
        </main>
    );
};

export default Home;
