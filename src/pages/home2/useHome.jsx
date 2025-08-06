import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import apiService from '../../utils/apiClient';
import { useAppSelector } from "../../redux/hooks";


const useHome = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const [loading, setLoading] = useState(false)

    const [activeTab, setActiveTab] = useState("overview");

    const [showModal, setShowModal] = useState(false)

    const handleCloseModel = () => setShowModal(false)

    const [limitError, setLimitError] = useState(false)

    const currentUser = useAppSelector((state) => state.user.profile)

    const [domainData, setDomainData] = useState({
        blacklist: null,
        dns: null,
        ipGeolocation: null,
        reverseIP: null,
        seoMetrics: null,
        ssl: null,
        suggestions: null,
        whois: null,
    });

    let domain = ''

    const fetchOverviewData = async (domainOverride = null) => {

        const params = new URLSearchParams(location.search);

        domain = domainOverride || params.get("domain");

        if (!domain) return;

        try {


            setLoading(true);

            setLimitError(false)

            const res = await apiService.get('/domain/overview', { domain });

            const results = res.data.results || {};

            console.log(res.data)

            setDomainData({
                blacklist: results.blacklist?.success ? results.blacklist.data : null,
                dns: results.dns?.success ? results.dns.data : null,
                ipGeolocation: results.ipGeolocation?.success ? results.ipGeolocation.data : null,
                reverseIP: results.reverseIP?.success ? results.reverseIP.data : null,
                seoMetrics: results.seoMetrics?.success ? results.seoMetrics.data : null,
                ssl: results.ssl?.success ? results.ssl.data : { error: results.ssl?.error || 'SSL fetch failed' },
                suggestions: results.suggestions?.success ? results.suggestions.data : [],
                whois: results.whois?.success ? results.whois.data : null,
            });


        } catch (error) {
            console.log(error);
            if (error?.response?.status === 429) {
                setShowModal(true);
                setLimitError(true)
            }
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchOverviewData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);

    const validationSchema = Yup.object({
        domain: Yup.string()
            .trim()
            .matches(
                /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/,
                'Invalid domain format (e.g. example.com)'
            )
            .required('Domain is required'),
    });


    return {
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
    }

}

export default useHome