// utils/getUsageByCountry.js

const tldToCountryISOMap = {
  ".us": "US",
  ".uk": "GB",
  ".de": "DE",
  ".fr": "FR",
  ".cn": "CN",
  ".au": "AU",
  ".nl": "NL",
  ".ru": "RU",
  ".br": "BR",
  ".in": "IN",
  ".ca": "CA",
  ".it": "IT",
  ".jp": "JP",
  ".pl": "PL",
  ".ch": "CH",
  ".es": "ES",
  ".se": "SE",
  ".no": "NO",
  ".fi": "FI",
  ".za": "ZA",
  ".mx": "MX",
  ".kr": "KR",
  ".tr": "TR",
  ".id": "ID",
  ".ir": "IR",
  ".be": "BE",
  ".ar": "AR",
  ".pt": "PT",
  ".vn": "VN",
  ".gr": "GR",
  ".ua": "UA",
  ".ro": "RO",
  ".hu": "HU",
  ".cz": "CZ",
  ".at": "AT",
  ".il": "IL",
  ".sg": "SG",
  ".my": "MY",
  ".nz": "NZ",
  ".ie": "IE",
  ".th": "TH",
  ".ae": "AE",
  ".ng": "NG",
  ".kz": "KZ",
  // Add more as needed
};

export default function getUsageByCountry(tldUsageData = []) {
  const result = {};

  tldUsageData.forEach(({ tld, count }) => {
    const iso = tldToCountryISOMap[tld.toLowerCase()];
    if (iso) {
      result[iso] = count;
    }
  });

  return result;
}
