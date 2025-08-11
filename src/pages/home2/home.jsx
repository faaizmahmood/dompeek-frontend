import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './home.module.scss';
import { MdDashboard } from "react-icons/md";
import { LuBrainCircuit } from "react-icons/lu";
import { SiCircuitverse } from "react-icons/si";
import useHome from './useHome';
import Overview from './tabs/overview/overview';
import AiInsights from './tabs/aiInsights/aiInsights';
import Model from '../../components/model/model';
import { FaExclamationTriangle } from 'react-icons/fa'
import { IoLockClosed } from "react-icons/io5";
import Icon from '../../components/icon/icon';
import aiTabIcon from '../../assets/icons/aiTab.png'
import { TbScreenshot } from "react-icons/tb";
import { Tooltip } from "react-tooltip";
import takeScreenshotAndPDF from '../../utils/takeScreenshotAndPDF';

const Home = () => {


    const {
        navigate,
        activeTab,
        setActiveTab,
        validationSchema,
        loading,
        showModal,
        handleCloseModel,
        currentUser,
        fetchOverviewData,
        domain,
        domainData,
        limitError,
        isDomainAvailable,
        suggestionsLoading,
        suggestions,
        aiSummary,
        aiLoading,
        aiData
    } = useHome()


    return (
        <>
            <main className={styles.home}>
                <section className={styles.hero}>
                    <div className={styles.content}>
                        <h1>Analyze Everything About Any Domain</h1>
                        <p className='mt-4'>
                            Get advanced insights into domain history, SEO, value, sales, security and more.
                        </p>
                    </div>

                    <div className={`${styles.inputBox} mt-3`}>
                        <Formik
                            enableReinitialize
                            initialValues={{ domain: domain || "" }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {

                                const inputDomain = values.domain.trim().toLowerCase();
                                const currentParams = new URLSearchParams(window.location.search);
                                const currentDomain = currentParams.get("domain");

                                if (currentDomain === inputDomain) {
                                    // Manually call fetch if same domain is already in URL
                                    fetchOverviewData(inputDomain);
                                } else {
                                    navigate(`?domain=${encodeURIComponent(inputDomain)}`);
                                }

                            }}
                        >
                            {() => (
                                <>
                                    <Form>
                                        <Field type="text" name="domain" placeholder="i.e. Google.com" />
                                        <button type="submit">Analyze</button>
                                    </Form>
                                    <ErrorMessage name="domain" component="div" className="text-danger ms-1 mt-2" />
                                </>
                            )}
                        </Formik>
                    </div>
                </section>

                {
                    (loading || domainData && domainData.whois || limitError || isDomainAvailable) ? (
                        <>
                            <section className={`${styles.tabs} container mt-4`}>

                                <div className={`${styles.tabBtns} text-center`}>
                                    <button
                                        className={activeTab === "overview" ? styles.active : ''}
                                        onClick={() => setActiveTab("overview")}
                                    >
                                        <MdDashboard className='me-1' size={25} /> Overview
                                    </button>
                                    <button
                                        className={activeTab === "ai" ? styles.active : ''}
                                        onClick={() => setActiveTab("ai")}
                                    >
                                        <Icon path={aiTabIcon} />
                                        Value & Match
                                    </button>
                                </div>

                                <div className={`${styles.tabContent} container`}>

                                    {/* Blur Overlay */}
                                    {limitError && <div className={styles.blurOverlay}>
                                        <div className='text-center'>
                                            <IoLockClosed color='#fff' size={40} />
                                            <button className='filledBtn mt-3'>
                                                {currentUser?.success === true ? "Upgrade Plan" : "Create Free Account"}
                                            </button>
                                        </div>
                                    </div>}

                                    {
                                        activeTab === 'overview' ? (
                                            <>
                                                <div className={`${styles.tabPanel} ${activeTab === "overview" ? styles.show : ''}`}>
                                                    <Overview loading={loading} domainData={domainData} isDomainAvailable={isDomainAvailable} suggestions={suggestions} suggestionsLoading={suggestionsLoading} />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className={`${styles.tabPanel} ${activeTab === "ai" ? styles.show : ''}`}>
                                                    <AiInsights loading={loading} aiSummary={aiSummary} aiData={aiData} aiLoading={aiLoading} isDomainAvailable={isDomainAvailable} />
                                                </div>
                                            </>
                                        )
                                    }


                                </div>
                            </section>
                        </>
                    ) : (
                        <div className="text-center py-5 text-white">
                            <h5>No domain data found.</h5>
                        </div>
                    )
                }

                {/* Screen Shot Icon */}

                <div>
                    <div
                        className={styles.screenShotIcon}
                        data-tooltip-id="screenshot-tooltip"
                        data-tooltip-content="Took Screenshot"
                        onClick={takeScreenshotAndPDF}
                    >
                        <TbScreenshot size={25} color="white" />
                    </div>

                    <Tooltip id="screenshot-tooltip" place="top"
                        style={{
                            backgroundColor: "#1E293B", // dark slate
                            color: "#fff",
                            fontSize: "14px",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
                        }}
                    />
                </div>


            </main>

            {/* Model */}

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




        </>
    );
};

export default Home;
