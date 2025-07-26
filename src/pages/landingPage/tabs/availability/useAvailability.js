import { useEffect, useState } from "react";

const useAvailability = ({ whoisData }) => {
    const [availableSuggestions, setAvailableSuggestions] = useState([]);
    const [isAvailable, setIsAvailable] = useState(false);
    const [loading, setLoading] = useState(false);

    // Check main domain availability
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

    const generateDomainSuggestions = (domain) => {
        const parts = domain.split(".");
        const base = parts[0]?.toLowerCase() || "";
        const tld = parts[1]?.toLowerCase() || "com";

        const tlds = ["net", "org", "co", "io", "app"];
        const prefixes = ["get", "my", "try"];
        const suffixes = ["app", "hq", "official"];

        const suggestions = [];

        // TLD variations
        tlds.forEach((altTld) => {
            if (altTld !== tld) {
                suggestions.push(`${base}.${altTld}`);
            }
        });

        // Prefix variations
        prefixes.forEach((pre) => {
            suggestions.push(`${pre}${base}.${tld}`);
        });

        // Suffix variations
        suffixes.forEach((suf) => {
            suggestions.push(`${base}${suf}.${tld}`);
        });

        // Hyphen variation
        suggestions.push(`${base}-${tld}.com`);

        return suggestions.slice(0, 10); // Trim to 10 suggestions max for faster checks
    };

    const checkAvailability = async (suggestions) => {
        setLoading(true);
        const availableOnly = [];

        for (const domain of suggestions) {
            try {
                const res = await fetch(`https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_WTzi4E3K1PSnV0LPulsLaTM9f90oM&domainName=${domain}&outputFormat=JSON`);
                const data = await res.json();
                const registry = data?.WhoisRecord?.registryData;

                const available =
                    registry?.dataError === "MISSING_WHOIS_DATA" ||
                    /Domain not found/i.test(registry?.rawText ?? '') ||
                    /Domain not found/i.test(registry?.header ?? '');

                if (available) {
                    availableOnly.push(domain);
                }

                if (availableOnly.length >= 5) break; // ✅ Stop after 5 available suggestions
            } catch {
                // Ignore failed check
            }
        }

        setAvailableSuggestions(availableOnly);
        setLoading(false);
    };

    useEffect(() => {
        if (!isAvailable && whoisData?.domainName) {
            const suggestions = generateDomainSuggestions(whoisData.domainName);
            checkAvailability(suggestions);
        }
    }, [whoisData?.domainName, isAvailable]);

    return {
        isAvailable,
        availableSuggestions,
        loading
    };
};

export default useAvailability;
