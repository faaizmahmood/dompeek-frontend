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
        limitError
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
                            initialValues={{ domain: domain }}
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
                                        <Field type="text" name="domain" placeholder="Google.com" />
                                        <button type="submit">Analyze</button>
                                    </Form>
                                    <ErrorMessage name="domain" component="div" className="text-danger ms-1 mt-2" />
                                </>
                            )}
                        </Formik>
                    </div>
                </section>

                {
                    loading === true || domainData && domainData.whois || limitError ? (
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
                                        <SiCircuitverse className='me-2' size={25} /> AI Insights
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
                                                    <Overview loading={loading} domainData={domainData} />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className={`${styles.tabPanel} ${activeTab === "ai" ? styles.show : ''}`}>
                                                    <AiInsights />
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


            </main>

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
