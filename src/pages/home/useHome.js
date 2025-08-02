import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import NProgress from '../../utils/nprogressConfig';
import apiService from '../../utils/apiClient';
import { toast } from 'react-toastify';

const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/;

const useLandingPage = () => {

    const [whoisData, setWhoisData] = useState(null);
    const [sslData, setSslData] = useState(null);
    const [dnsData, setDnsData] = useState(null);
    const [activeTab, setActiveTab] = useState("available");
    const [showModal, setShowModel] = useState(false)
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            domain: ''
        },
        validationSchema: Yup.object({
            domain: Yup.string()
                .matches(domainRegex, 'Enter a valid domain (e.g., example.com)')
                .required('Domain is required'),
        }),
        onSubmit: async (values) => {
            console.log('Analyzing domain:', values.domain);

            const domain = values.domain;

            try {
                NProgress.start();
                setLoading(true)

                const whoisJson = await apiService.get('/domain/whois', { domain });
                setWhoisData(whoisJson.data);

                const sslJson = await apiService.get('/domain/ssl', { domain });
                setSslData(sslJson.data);

                const dnsRawText = await apiService.get('/domain/dns', { domain });
                // const parsedDns = parseDnsRecords(dnsRawText);
                setDnsData(dnsRawText.data);

            } catch (error) {

                if (error.response?.status === 429) {
                    setShowModel(true);
                    // OR use a toast/snackbar if using a UI library
                    // toast.error("Rate limit reached. Please wait...");
                } else {
                    toast.error("An unexpected error occurred. Please try again.");
                }

            } finally {
                NProgress.done();
                setLoading(false)
            }
        },
    });

    const formatReadableDate = (rawDate) => {
        if (!rawDate) return 'N/A';

        const date = new Date(rawDate);
        if (isNaN(date.getTime())) return rawDate; // fallback if invalid

        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZoneName: 'short',
            timeZone: 'UTC'
        });
    };

    const safeFormatDate = (primary, fallback) => {
        return primary
            ? formatReadableDate(primary)
            : fallback
                ? formatReadableDate(fallback)
                : "N/A";
    };


    const handleCloseModel = ()=>{
setShowModel(false)
    }

    return {
        formik,
        whoisData,
        sslData,
        formatReadableDate,
        safeFormatDate,
        dnsData,
        activeTab,
        setActiveTab,
        handleCloseModel,
        showModal,
        loading
    };
};

export default useLandingPage;
