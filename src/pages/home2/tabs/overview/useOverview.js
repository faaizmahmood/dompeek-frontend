import { useEffect, useState } from "react";
import getDomainAgeInfo from "../../../../utils/getDomainAgeInfo";

const useOverview = (domainData) => {

    const [width, setWidth] = useState('0%');

    const [isAvailable, setIsAvailable] = useState(false);


    const [domainAgeInfo, setDomainAgeInfo] = useState({
        ageText: '',
        percentageUsed: '0%',
    });


    function formatReadableDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }

    // Width of bar chart
    useEffect(() => {


        // Animate bar width based on used %
        setTimeout(() => {
            setWidth(`${domainData?.seoMetrics?.metrics?.data?.trust_flow || '100'}%`);
        }, 100);

    }, [domainData?.seoMetrics?.metrics?.data?.trust_flow])

    // Extract dates only once when data is ready
    // Extract dates or estimated age if available
    useEffect(() => {
        const createdDate = domainData?.whois?.createdDate || domainData?.whois?.registryData?.createdDate;
        const expiresDate = domainData?.whois?.expiresDate || domainData?.whois?.registryData?.expiresDate;

        const info = getDomainAgeInfo(createdDate, expiresDate);
        setDomainAgeInfo(info);

    }, [
        domainData?.whois?.createdDate,
        domainData?.whois?.expiresDate,
        domainData?.whois?.registryData?.createdDate,
        domainData?.whois?.registryData?.expiresDate
    ]);



    // Check if domain is available based on WHOIS raw text
    useEffect(() => {
        if (domainData?.whois) {
            const registry = domainData.whois?.registryData;
            const available =
                registry?.dataError === "MISSING_WHOIS_DATA" ||
                /Domain not found/i.test(registry?.rawText ?? '') ||
                /Domain not found/i.test(registry?.header ?? '');

            setIsAvailable(available);
        }
    }, [domainData?.whois]);

    return {
        width,              // For progress bar width
        isAvailable,        // If domain is available
        domainAgeInfo,      // Contains age text and % used
        formatReadableDate,
    };
};

export default useOverview;
