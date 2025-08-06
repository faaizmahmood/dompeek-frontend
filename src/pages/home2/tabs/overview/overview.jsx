import styles from './overview.module.scss'
import { FaCircleXmark } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import CircularProgress from '../../../../components/circularProgress/circularProgress'
import graph from '../../../../assets/imgs/graph.png'
import OverviewSkeleton from '../../../../components/overviewSkeleton/overviewSkeleton';
import useOverview from './useOverview';
import SearchTrendChart from '../../../../components/searchTrendChart/searchTrendChart';
import SeoDifficultyChart from '../../../../components/seoDifficultyChart/seoDifficultyChart';
import TrafficChart from '../../../../components/trafficChart/trafficChart';
import ReverseIpTable from '../../../../components/reverseIpTable/reverseIpTable';

const Overview = ({ loading, domainData }) => {


    const {
        width,
        isAvailable,
        domainAgeInfo,
        formatReadableDate
    } = useOverview(domainData)

    const blacklist = domainData?.blacklist
    const dns = domainData?.dns
    const revrseIPDomains = domainData?.reverseIP



    const domainInfo = [
        { label: "Owner", value: domainData?.whois?.registrant?.organization || 'N/A' },
        { label: "Registrar", value: domainData?.whois?.registryData?.registrarName || 'Private' },
        {
            label: "Transfer Lock",
            value: domainData?.whois?.registryData?.status
                ? (domainData?.registryData?.status.includes('clientTransferProhibited') ? 'Enabled' : 'Disabled')
                : "N/A"
        },
        { label: "IP", value: domainData?.ipGeolocation?.ip || 'N/A' },
        { label: "Location", value: domainData?.ipGeolocation?.geolocation?.city || 'N/A' },
        { label: "ISP / Org", value: domainData?.ipGeolocation?.geolocation?.org },
    ];

    const seoChartCardData = [
        { lable: 'Domain Rank', value: domainData?.seoMetrics?.metrics?.data?.domain_rank || 'N/A', showChart: false },
        { lable: 'Global Rank', value: domainData?.seoMetrics?.metrics?.data?.global_rank || 'N/A', showChart: true },
        { lable: 'Domain Authority', value: domainData?.seoMetrics?.metrics?.data?.domain_authority || 'N/A', showChart: true },
        { lable: 'Page Authority', value: domainData?.seoMetrics?.metrics?.data?.page_authority || 'N/A', showChart: true },
        { lable: 'Backlinks', value: domainData?.seoMetrics?.metrics?.data?.backlinks || 'N/A', showChart: true },
        { lable: 'Referring IPs', value: domainData?.seoMetrics?.metrics?.data?.referring_ips || 'N/A', showChart: true },
    ]


    // loading ? return <OverviewSkeleton /> : ""

    return (
        <>

            {
                loading ? <OverviewSkeleton /> : (
                    <>

                        <div className={styles.overview}>

                            <div className={`${styles.availibility}`}>

                                <div className='d-flex justify-content-center gap-4'>
                                    {
                                        isAvailable ? (
                                            <>
                                                <FaCircleCheck size={40} color='#00d351ff' />
                                                <h2>This domain is available</h2>
                                            </>
                                        ) : (
                                            <>
                                                <FaCircleXmark size={40} color='#D30000' />
                                                <h2>This domain is already registered.</h2>
                                            </>
                                        )
                                    }

                                </div>

                                {
                                    domainData?.suggestions?.data?.length > 0 ? (
                                        <>
                                            <hr />

                                            <div className={styles.alternatives}>

                                                <h4 className='text-center mt-4'>💡 Available Alternatives</h4>

                                                <div className={styles.buttons}>
                                                    {
                                                        domainData?.suggestions?.data?.length > 0 ? (
                                                            domainData.suggestions.data.map((ele, ind) => (
                                                                <button key={ind}>{ele}</button>
                                                            ))
                                                        ) : (
                                                            <p className='text-white'>No suggestions available.</p>
                                                        )
                                                    }

                                                </div>

                                            </div>
                                        </>
                                    ) : ""
                                }



                            </div>

                            <div className={`${styles.age_whois} mt-4`}>

                                <div className='row'>

                                    <div className='col-lg-4'>
                                        <div className={styles.card}>
                                            <h5 className='text-white'>Age</h5>

                                            <div className='my-4'>
                                                <CircularProgress percentage={67} label={domainAgeInfo?.ageText} />
                                            </div>

                                            <div className='d-flex justify-content-between mt-5'>

                                                <div className=''>
                                                    <h6>Created</h6>
                                                    <h5>{formatReadableDate(domainData?.whois?.createdDate || domainData?.whois?.registryData?.createdDate)}</h5>
                                                </div>

                                                <div className=''>
                                                    <h6>Expire</h6>
                                                    <h5>{formatReadableDate(domainData?.whois?.expiresDate || domainData?.whois?.registryData?.expiresDate)}</h5>                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                    <div className='col-lg-8 mt-lg-0 mt-4'>
                                        <div className={styles.card}>
                                            <div className='row'>
                                                {
                                                    domainInfo.map((ele, ind) => (
                                                        <>
                                                            <div className='col-sm-4 col-6 mt-4' key={ind}>
                                                                <h6>{ele.label}</h6>
                                                                <h5>{ele.value}</h5>
                                                            </div>
                                                        </>
                                                    ))
                                                }
                                            </div>
                                            <div className='row mt-4'>
                                                <div className='col-sm-8'>
                                                    <h6>Name Servers</h6>
                                                    {
                                                        domainData?.whois?.registryData?.nameServers?.hostNames?.length > 0 ? (
                                                            domainData.whois.registryData.nameServers.hostNames.map((ele, ind) => (
                                                                <h5 key={ind}>{ele}</h5>
                                                            ))
                                                        ) : (
                                                            <h5>N/A</h5>
                                                        )
                                                    }
                                                </div>
                                                <div className='col-sm-4 mt-sm-0 mt-3'>
                                                    <h6>Status</h6>
                                                    <h5>
                                                        {domainData?.whois?.registryData?.status
                                                            ? domainData?.whois?.registryData?.status.split(" ")[0]
                                                            : "N/A"}

                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.seo}>

                                <div className='row mt-4'>

                                    <div className='col-lg-6'>

                                        <div className='row g-3'>

                                            {
                                                seoChartCardData.map((ele, ind) => (
                                                    <>
                                                        <div className='col-sm-6' key={ind}>
                                                            <div className={`${styles.card} ${styles.seoChartCard}`}>
                                                                <h6>{ele.lable}</h6>
                                                                <h5>{ele.value}</h5>

                                                                <div className='text-end'>
                                                                    {
                                                                        ele.showChart ? <img src={graph} /> : ""
                                                                    }

                                                                </div>

                                                            </div>
                                                        </div>
                                                    </>
                                                ))
                                            }

                                        </div>

                                    </div>

                                    <div className='col-lg-6 mt-lg-0 mt-3'>

                                        <div className='row'>

                                            <div className='col-sm-6'>
                                                <div className={styles.card}>
                                                    <h5 className='text-white'>Citation Flow</h5>

                                                    <div className='my-4'>
                                                        <CircularProgress percentage={domainData?.seoMetrics?.metrics?.data?.citation_flow} duration={4} label={domainData?.seoMetrics?.metrics?.data?.citation_flow || "N/A"} />
                                                    </div>

                                                </div>
                                            </div>

                                            <div className='col-sm-6 mt-sm-0 mt-3'>
                                                <div className={styles.card}>
                                                    <h5 className='text-white'>Popularity Score</h5>

                                                    <div className='my-4'>
                                                        <CircularProgress percentage={domainData?.seoMetrics?.metrics?.data?.popularity_score} duration={4} label={domainData?.seoMetrics?.metrics?.data?.popularity_score || "N/A"} />
                                                    </div>

                                                </div>
                                            </div>

                                        </div>

                                        <div className='row mt-3'>

                                            <div className='col-12'>
                                                <div className={styles.card}>
                                                    <h5 className='text-white mb-4'>Trust Flow</h5>

                                                    <div className={`${styles.barChart}`}>

                                                        <div className={styles.fullLenght}></div>

                                                        <div className={styles.progress} style={{ width: width }}>

                                                            <div className={styles.percentageContainer}>
                                                                <div className={styles.percentage}>{width}</div>
                                                            </div>

                                                        </div>

                                                        <div className='d-flex justify-content-between mt-2 px-1'>
                                                            <h5>0%</h5>
                                                            <h5>100%</h5>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className={`${styles.searchTrend} mt-4`}>
                                <SearchTrendChart domainData={domainData} />
                            </div>

                            <div className={`${styles.seoDifficulty_trafic} mt-4`}>

                                <div className='row'>

                                    <div className='col-8'>

                                        <div className={styles.card}>

                                            <h5>SEO Difficulty</h5>

                                            <div className={styles.seoDifficulty}>
                                                <SeoDifficultyChart domainData={domainData} />
                                            </div>

                                        </div>

                                    </div>


                                    <div className='col-4'>

                                        <div className={styles.card}>
                                            <h5>Traffic Engagement</h5>
                                            <TrafficChart domainData={domainData} />
                                        </div>

                                    </div>

                                </div>

                            </div>


                            <div className={styles.blackList_reverseIP}>

                                <div className='row mt-4'>

                                    {/* General Info */}
                                    <div className='col-6'>
                                        <div className={styles.card}>
                                            <h4>BlackList - General Info</h4>

                                            <div className='row mt-4'>

                                                <div className='col-4'>
                                                    <h6>Domain</h6>
                                                    <h5>{blacklist?.domain || 'N/A'}</h5>
                                                </div>
                                                <div className='col-4'>
                                                    <h6>Root Domain</h6>
                                                    <h5>{blacklist?.root_domain || 'N/A'}</h5>
                                                </div>
                                                <div className='col-4'>
                                                    <h6>Country Code</h6>
                                                    <h5>{blacklist?.country_code || 'N/A'}</h5>
                                                </div>

                                            </div>

                                            <div className='row mt-4'>

                                                <div className='col-4'>
                                                    <h6>Language</h6>
                                                    <h5>{blacklist?.language_code || 'N/A'}</h5>
                                                </div>
                                                <div className='col-8'>
                                                    <h6>Final URL</h6>
                                                    <h5>{blacklist?.final_url || 'N/A'}</h5>
                                                </div>

                                            </div>

                                            <div className='row mt-4'>

                                                <div className='col-4'>
                                                    <h6>Server</h6>
                                                    <h5>{blacklist?.server || 'N/A'}</h5>
                                                </div>
                                                <div className='col-8'>
                                                    <h6>Page Title</h6>
                                                    <h5>{blacklist?.page_title || 'N/A'}</h5>
                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                    {/* Safety Checks */}

                                    <div className='col-6'>
                                        <div className={styles.card}>
                                            <h4>BlackList - Safety Checks</h4>

                                            <div className='row mt-4'>

                                                <div className='col-4'>
                                                    <h6>Unsafe</h6>
                                                    <h5>{blacklist?.unsafe || 'False'}</h5>
                                                </div>
                                                <div className='col-4'>
                                                    <h6>Spamming</h6>
                                                    <h5>{blacklist?.spamming || 'False'}</h5>
                                                </div>
                                                <div className='col-4'>
                                                    <h6>Malware</h6>
                                                    <h5>{blacklist?.malware || 'False'}</h5>
                                                </div>

                                            </div>

                                            <div className='row mt-4'>

                                                <div className='col-4'>
                                                    <h6>Phishing</h6>
                                                    <h5>{blacklist?.phishing || 'False'}</h5>
                                                </div>
                                                <div className='col-4'>
                                                    <h6>Suspicious</h6>
                                                    <h5>{blacklist?.suspicious || 'False'}</h5>
                                                </div>
                                                <div className='col-4'>
                                                    <h6>Adult</h6>
                                                    <h5>{blacklist?.adult || 'False'}</h5>
                                                </div>

                                            </div>

                                            <div className='row mt-4'>

                                                <div className='col-4'>
                                                    <h6>Phishing</h6>
                                                    <h5>{blacklist?.phishing || 'False'}</h5>
                                                </div>
                                                <div className='col-4'>
                                                    <h6>Riskiest TLD</h6>
                                                    <h5>{blacklist?.risky_tld || 'False'}</h5>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                    <div className='col-6 mt-3'>
                                        <div className={styles.card}>
                                            <h4>DNS Record</h4>

                                            <div className='row mt-4'>

                                                <div className='col-4'>
                                                    <h6>A Records</h6>
                                                    {
                                                        dns?.A.length === 0 ? <h5>N/A</h5> : (
                                                            <>
                                                                {
                                                                    dns?.A?.map((ele) => {
                                                                        return (
                                                                            <>
                                                                                <h5>{ele}</h5>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </>
                                                        )
                                                    }
                                                </div>
                                                <div className='col-8'>
                                                    <h6>NS</h6>
                                                    {
                                                        dns?.NS.length === 0 ? <h5>N/A</h5> : (
                                                            <>
                                                                {
                                                                    dns?.NS?.map((ele) => {
                                                                        return (
                                                                            <>
                                                                                <h5>{ele}</h5>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </>
                                                        )
                                                    }
                                                </div>


                                            </div>

                                            <div className='row mt-4'>

                                                <div className='col-12'>
                                                    <h6>MX</h6>
                                                    {
                                                        dns?.MX.length === 0 ? <h5>N/A</h5> : (
                                                            <>
                                                                {
                                                                    dns?.MX?.map((ele) => {
                                                                        return (
                                                                            <>
                                                                                <h5>{ele}</h5>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </>
                                                        )
                                                    }
                                                </div>
                                                <div className='col-12 mt-4'>
                                                    <h6>SOA</h6>
                                                    {
                                                        dns?.SOA.length === 0 ? <h5>N/A</h5> : (
                                                            <>
                                                                {
                                                                    dns?.SOA?.map((ele) => {
                                                                        return (
                                                                            <>
                                                                                <h5>{ele}</h5>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </>
                                                        )
                                                    }
                                                </div>
                                                <div className='col-12 mt-4'>
                                                    <h6>TXT</h6>
                                                    {
                                                        dns?.TXT.length === 0 ? <h5>N/A</h5> : (
                                                            <>
                                                                {
                                                                    dns?.TXT?.map((ele) => {
                                                                        return (
                                                                            <>
                                                                                <h5>{ele}</h5>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </>
                                                        )
                                                    }
                                                </div>
                                                <div className='col-12 mt-4'>
                                                    <h6>Others</h6>
                                                    {
                                                        dns?.Others.length === 0 ? <h5>N/A</h5> : (
                                                            <>
                                                                {
                                                                    dns?.Others?.map((ele) => {
                                                                        return (
                                                                            <>
                                                                                <h5>{ele}</h5>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </>
                                                        )
                                                    }
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                    <div className='col-6 mt-3'>
                                        <div className={styles.card}>
                                            <h4>Reverse IP Lookup</h4>
                                            <div className="mt-4">
                                                <ReverseIpTable revrseIPDomains={revrseIPDomains} />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </>
                )
            }


        </>
    )
}

export default Overview