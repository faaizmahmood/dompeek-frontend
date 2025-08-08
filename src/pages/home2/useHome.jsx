import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import apiService from "../../utils/apiClient";
import { useAppSelector } from "../../redux/hooks";

const useHome = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [loading, setLoading] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [showModal, setShowModal] = useState(false);
    const [limitError, setLimitError] = useState(false);
    const [isDomainAvailable, setIsDomainAvailable] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsLoading, setSuggestionsLoading] = useState(false);
    const [aiSummary, setAISummary] = useState([]);

    const currentUser = useAppSelector((state) => state.user.profile);

    const [domainData, setDomainData] = useState({
        blacklist: null,
        dns: null,
        ipGeolocation: null,
        reverseIP: null,
        seoMetrics: null,
        ssl: null,
        suggestions: null,
        whois: null,
        tldUsage: null,
    });

    let domain = "";

    const handleCloseModel = () => setShowModal(false);

    const fetchAiSummary = async (domainDataPayload) => {
        try {
            setAiLoading(true);
            const res = await apiService.post("/domain/ai-summary", { domainData: domainDataPayload });
            setAISummary(res.data);
            console.log("✅ AI Analysis Response:", res.data);
        } catch (err) {
            console.error("❌ API Error:", err);
        } finally {
            setAiLoading(false);
        }
    };

    useEffect(() => {
        if (!domainData?.whois?.domainName) return;
        fetchAiSummary(domainData);
    }, [domainData]);

    const fetchSuggestions = async (domain) => {
        try {
            setSuggestionsLoading(true);
            const res = await apiService.get("/domain/get-suggestions", { domain });
            setSuggestions(res.data ? res.data : []);
        } catch (error) {
            console.log("Suggestions fetch error:", error);
        } finally {
            setSuggestionsLoading(false);
        }
    };

    const fetchOverviewData = async (domainOverride = null) => {
        const params = new URLSearchParams(location.search);
        domain = domainOverride || params.get("domain");
        if (!domain) return;

        try {
            setLoading(true);
            setLimitError(false);
            setIsDomainAvailable(false);

            // Reset before fetch
            setDomainData({
                blacklist: null,
                dns: null,
                ipGeolocation: null,
                reverseIP: null,
                seoMetrics: null,
                ssl: null,
                suggestions: null,
                whois: null,
                tldUsage: null,
            });
            setSuggestions([]);

            const res = await apiService.get("/domain/overview", { domain });

            // ✅ Handle available domain shortcut
            if (res.data?.available === true) {
                setIsDomainAvailable(true);

                // Only domainName in whois for AI summary
                const minimalData = {
                    blacklist: null,
                    dns: null,
                    ipGeolocation: null,
                    reverseIP: null,
                    seoMetrics: null,
                    ssl: null,
                    whois: { domainName: domain },
                    tldUsage: null,
                };

                setDomainData(minimalData);
                fetchAiSummary(minimalData);
                fetchSuggestions(domain);

                return; // Exit early
            }

            const results = res.data.results || {};

            const fullData = {
                blacklist: results.blacklist?.success ? results.blacklist.data : null,
                dns: results.dns?.success ? results.dns.data : null,
                ipGeolocation: results.ipGeolocation?.success ? results.ipGeolocation.data : null,
                reverseIP: results.reverseIP?.success ? results.reverseIP.data : null,
                seoMetrics: results.seoMetrics?.success ? results.seoMetrics.data : null,
                ssl: results.ssl?.success
                    ? results.ssl.data
                    : { error: results.ssl?.error || "SSL fetch failed" },
                whois: results.whois?.success ? results.whois.data : null,
                tldUsage: results.tldUsage?.success ? results.tldUsage.data : null,
            };

            setDomainData(fullData);
            fetchSuggestions(domain);
        } catch (error) {
            console.log(error);
            if (error?.response?.status === 429) {
                setShowModal(true);
                setLimitError(true);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOverviewData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);

    const validationSchema = Yup.object({
        domain: Yup.string()
            .trim()
            .matches(
                /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/,
                "Invalid domain format (e.g. example.com)"
            )
            .required("Domain is required"),
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
        limitError,
        isDomainAvailable,
        suggestionsLoading,
        suggestions,
        aiSummary,
        aiLoading,
    };
};

export default useHome;
