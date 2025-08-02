import { useEffect, useState } from 'react';
import styles from './blacklist.module.scss';
import apiService from '../../../../utils/apiClient';
import TabLoading from '../../../../components/tabLoading/tabLoading';
import { FaBan } from 'react-icons/fa';

const BlackList = ({ whoisData }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const domain = whoisData?.domainName
            try {
                setLoading(true)
                const res = await apiService.get('/domain/blacklist', { domain }); // replace with actual
                setData(res.data);
            } catch (err) {
                console.error('Error fetching blacklist data:', err);
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, [whoisData?.domainName]);

    if (loading) return <TabLoading text={"Fetching Blacklist Detail"}/>;
    if (!data) return <p>No data found or still fetching...</p>;

    return (
        <div className={`${styles.blacklist}`}>

            <div className={`d-flex gap-3 ${styles.tab_head}`}>
                <FaBan color='#fff'r size={40} className="mt-2" />
                <div>
                    <h4>BlackList</h4>
                    <p>{whoisData?.domainName}</p>
                </div>
            </div>


            <div className="mt-4 row">
                {/* GENERAL INFO */}
                <div className="col-md-6 mb-3">
                    <div className={styles.section}>
                        <h6 className='mb-4'> General Info</h6>
                        <p><strong>Domain:</strong> {data.domain}</p>
                        <p><strong>Root Domain:</strong> {data.root_domain}</p>
                        <p><strong>IP Address:</strong> {data.ip_address}</p>
                        <p><strong>Server:</strong> {data.server}</p>
                        <p><strong>Country Code:</strong> {data.country_code}</p>
                        <p><strong>Language:</strong> {data.language_code}</p>
                        <p><strong>Domain Age:</strong> {data.domain_age?.human}</p>
                        <p><strong>Page Title:</strong> {data.page_title}</p>
                        <p><strong>Final URL:</strong> {data.final_url}</p>
                    </div>
                </div>

                {/* SAFETY / THREATS */}
                <div className="col-md-6 mb-3">
                    <div className={styles.section}>
                        <h6 className='mb-4'> Safety Checks</h6>
                        <p><strong>Unsafe:</strong> {String(data.unsafe)}</p>
                        <p><strong>Spamming:</strong> {String(data.spamming)}</p>
                        <p><strong>Malware:</strong> {String(data.malware)}</p>
                        <p><strong>Phishing:</strong> {String(data.phishing)}</p>
                        <p><strong>Suspicious:</strong> {String(data.suspicious)}</p>
                        <p><strong>Adult:</strong> {String(data.adult)}</p>
                        <p><strong>Risk Score:</strong> {data.risk_score}</p>
                        <p><strong>Riskiest TLD:</strong> {String(data.risky_tld)}</p>
                    </div>
                </div>

                {/* DNS RECORDS */}
                <div className="col-md-12 mb-3">
                    <div className={styles.section}>
                        <h6 className='mb-4'> DNS Records</h6>
                        <p><strong>A Records:</strong> {data.a_records?.join(', ')}</p>
                        <p><strong>MX Records:</strong> {data.mx_records?.join(', ')}</p>
                        <p><strong>NS Records:</strong> {data.ns_records?.join(', ')}</p>
                        <p><strong>SPF Record:</strong> {String(data.spf_record)}</p>
                        <p><strong>DMARC Record:</strong> {String(data.dmarc_record)}</p>
                    </div>
                </div>

                {/* TECHNOLOGIES */}
                {data.technologies?.length > 0 && (
                    <div className="col-md-12 mb-3">
                        <div className={styles.section}>
                            <h6 className='mb-3'>Technologies</h6>
                            <ul>
                                {data.technologies.map((tech, i) => (
                                    <li key={i}>{tech}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlackList;
