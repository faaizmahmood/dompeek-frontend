import { useEffect, useState } from "react";
import apiService from "../../../../utils/apiClient";

const useAvailability = ({ whoisData }) => {
    const [availableSuggestions, setAvailableSuggestions] = useState([]);
    const [isAvailable, setIsAvailable] = useState(false);
    const [loading, setLoading] = useState(false);

    // Step 1: Determine availability from WHOIS
    useEffect(() => {
        if (whoisData) {
            const registry = whoisData?.registryData;
            const available =
                registry?.dataError === "MISSING_WHOIS_DATA" ||
                /Domain not found/i.test(registry?.rawText ?? '') ||
                /Domain not found/i.test(registry?.header ?? '');

            setIsAvailable(available);
        }
    }, [whoisData]);

    // Step 2: Fetch suggestions from backend
    const fetchGoDaddySuggestions = async (baseDomain) => {
        setLoading(true);
        try {
            const response = await apiService.get('/no/domain/suggestions', {
                domain: baseDomain
            });

            const suggestions = response?.data || [];
            setAvailableSuggestions(suggestions);
        } catch (err) {
            console.error("GoDaddy suggestions failed:", err);
        } finally {
            setLoading(false);
        }
    };

    // Step 3: Trigger suggestions when domain is NOT available
    useEffect(() => {
        if (!isAvailable && whoisData?.domainName) {
            const base = whoisData.domainName.split(".")[0];
            if (base) fetchGoDaddySuggestions(base);
        }
    }, [whoisData?.domainName, isAvailable]);

    return {
        isAvailable,
        availableSuggestions,
        loading
    };
};

export default useAvailability;
