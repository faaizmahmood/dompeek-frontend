import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import NProgress from '../../utils/nprogressConfig';

const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/;

// DNS parser utility
const parseDnsRecords = (dnsRawText) => {
    const records = {
        A: [],
        MX: [],
        NS: [] ,
        TXT: [] ,
        SOA: [],
        Others: []
    };

    const lines = dnsRawText.split('\n');

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        const [type, value] = trimmedLine.split(/\s*:\s*/, 2);

        switch (type) {
            case "A":
            case "MX":
            case "NS":
            case "TXT":
            case "SOA":
                records[type].push(value);
                break;
            default:
                records.Others.push(trimmedLine);
        }
    }

    return records;
};

const useLandingPage = () => {

    const [whoisData, setWhoisData] = useState(null);
    const [sslData, setSslData] = useState(null);
    const [dnsData, setDnsData] = useState(null);


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
            const domain = values.domain
            try {
                NProgress.start();

                const whoisRes = await fetch(`https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_WTzi4E3K1PSnV0LPulsLaTM9f90oM&domainName=${domain}&outputFormat=JSON`);
                const whoisJson = await whoisRes.json();
                setWhoisData(whoisJson.WhoisRecord);

                const sslRes = await fetch(`https://ssl-certificates.whoisxmlapi.com/api/v1?apiKey=at_WTzi4E3K1PSnV0LPulsLaTM9f90oM&domainName=${domain}`);
                const sslJson = await sslRes.json();
                setSslData(sslJson);

                const dnsRes = await fetch(`https://api.hackertarget.com/dnslookup/?q=${domain}`);
                const dnsRawText = await dnsRes.text();
                const parsedDns = parseDnsRecords(dnsRawText);
                setDnsData(parsedDns);

            } catch (error) {
                console.error("Error fetching domain info:", error);
            } finally {
                NProgress.done();
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


    return {
        formik,
        whoisData,
        sslData,
        formatReadableDate,
        safeFormatDate,
        dnsData
    };
};

export default useLandingPage;
