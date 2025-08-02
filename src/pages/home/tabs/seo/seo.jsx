import { useEffect, useState } from "react"
import apiService from "../../../../utils/apiClient"
import { toast } from "react-toastify"
import styles from './seo.module.scss'
import { RiSeoLine } from "react-icons/ri"
import TabLoading from "../../../../components/tabLoading/tabLoading";
import SearchTrendChart from "../../../../components/charts/searchTrendChart/searchTrendChart";
import SeoMetricCard from "../../../../components/charts/seoMetricCard/SeoMetricCard";
import SeoBarChart from "../../../../components/charts/seoBarChart";
import TrafficChart from "../../../../components/charts/trafficChart/trafficChart";



const Seo = ({ whoisData }) => {

    const [seoMetrics, setSeoMetrics] = useState([])
    const [seoDifficultyMetrics, setSeoDifficultyMetrics] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const domain = whoisData?.domainName;
        if (!domain) return;

        const fetchSEOMetrics = async () => {
            try {
                setLoading(true);

                const res = await apiService.get('/domain/seo-metrics', { domain });

                if (res?.data?.metrics?.status === 'success') {
                    const metrics = res.data.metrics.data;
                    setSeoMetrics(metrics);

                    const difficultyData = [
                        { name: 'SEO Difficulty', value: metrics.seo_difficulty },
                        { name: 'On-Page Difficulty', value: metrics.on_page_difficulty },
                        { name: 'Off-Page Difficulty', value: metrics.off_page_difficulty },
                    ];
                    setSeoDifficultyMetrics(difficultyData);
                } else {
                    toast.error(`No metrics found for ${domain}`);
                }

            } catch (error) {
                console.error("SEO Metrics Error:", error);
                // const message = error?.response?.data?.error || 'Failed to fetch SEO metrics';
                // toast.error(`Error: ${message}`);

            } finally {
                setLoading(false);
            }
        };

        fetchSEOMetrics();
    }, [whoisData?.domainName]);

    return (
        <>

            <div className={styles.seo}>

                <div className={`d-flex gap-3 ${styles.tab_head}`}>
                    <RiSeoLine color='#fff' size={40} className="mt-2" />
                    <div>
                        <h4>SEO Analysis</h4>
                        <p>{whoisData?.domainName}</p>
                    </div>
                </div>

                {
                    loading ? <TabLoading /> : (
                        <>

                            <div className="row mt-3">
                                <SeoMetricCard styles={styles} title="Domain Authority" value={seoMetrics?.domain_authority} />
                                <SeoMetricCard styles={styles} title="Page Authority" value={seoMetrics?.page_authority} />
                                <SeoMetricCard styles={styles} title="Global Rank" value={seoMetrics?.global_rank} />
                                <SeoMetricCard styles={styles} title="Domain Rank" value={seoMetrics?.domain_rank} />
                            </div>

                            <div className="row">
                                <SeoMetricCard styles={styles} title="Organic keywords" value={seoMetrics?.organic_keywords} />
                                <SeoMetricCard styles={styles} title="Referring Domains" value={seoMetrics?.referring_domains} />
                                <SeoMetricCard styles={styles} title="Backlinks" value={seoMetrics?.backlinks} />
                                <SeoMetricCard styles={styles} title="Referring IPs" value={seoMetrics?.referring_ips} />
                            </div>


                            <div className="row mt-3 px-2">
                                <div className={styles.seoCard}>
                                    <SearchTrendChart data={seoMetrics?.search_trend_data || []} />
                                </div>
                            </div>

                            <div className="row mt-4 d-flex justify-content-center">
                                <SeoMetricCard styles={styles} title="Trust Flow" value={seoMetrics?.trust_flow} showChart />
                                <SeoMetricCard styles={styles} title="Citation Flow" value={seoMetrics?.citation_flow} showChart />
                                <SeoMetricCard styles={styles} title="Popularity Score" value={seoMetrics?.popularity_score} showChart />
                                {/* <SeoMetricCard styles={styles} title="Referring IPs" value={seoMetrics?.referring_ips} /> */}
                            </div>

                            <div className="row mt-3 p-2">
                                <div className={styles.seoCard}>
                                    <SeoBarChart data={seoDifficultyMetrics || []} styles={styles} />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-6">

                                    <div className={styles.seoCard}>
                                        <div>
                                            <h6>Traffic Volume:</h6>
                                            <p>{Number(seoMetrics?.traffic?.Visits || 0).toLocaleString()}</p>
                                        </div>
                                        <div className="mt-5">
                                            <h6>Traffic Volume:</h6>
                                            <p>{Number(seoMetrics?.traffic?.Visits || 0).toLocaleString()}</p>
                                        </div>
                                        <div className="mt-5">
                                            <h6>Traffic Volume:</h6>
                                            <p>{Number(seoMetrics?.traffic?.Visits || 0).toLocaleString()}</p>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-6 d-lg-block d-none">
                                    <div className={styles.seoCard}>
                                        <TrafficChart data={seoMetrics?.traffic || {}} />
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }

            </div>
        </>
    )
}

export default Seo