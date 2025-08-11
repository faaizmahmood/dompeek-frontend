// Approx lat/lon from each country's centroid
// Chip coords tuned for 1200x650 SVG projection

export const tldCountryMap = {
  // Generic TLDs (placed around central/global areas)
  ".com": { lon: 10, lat: 30, chip: { x: 585, y: 295 } },
  ".net": { lon: -75, lat: 38, chip: { x: 250, y: 320 } },
  ".org": { lon: -100, lat: 38, chip: { x: 210, y: 345 } },
  ".info": { lon: 20, lat: 45, chip: { x: 600, y: 330 } },
  ".xyz": { lon: 100, lat: 20, chip: { x: 880, y: 480 } },

  // Country code TLDs
  ".de": { lon: 10, lat: 51, chip: { x: 500, y: 345 } }, // Germany
  ".uk": { lon: -1, lat: 54, chip: { x: 540, y: 415 } }, // United Kingdom
  ".ru": { lon: 90, lat: 60, chip: { x: 870, y: 255 } }, // Russia
  ".cn": { lon: 105, lat: 35, chip: { x: 950, y: 365 } }, // China
  ".in": { lon: 78, lat: 22, chip: { x: 820, y: 455 } }, // India
  ".nl": { lon: 5, lat: 52, chip: { x: 515, y: 330 } }, // Netherlands
  ".fr": { lon: 2, lat: 46, chip: { x: 510, y: 350 } }, // France
  ".it": { lon: 12, lat: 42, chip: { x: 530, y: 380 } }, // Italy
  ".es": { lon: -4, lat: 40, chip: { x: 480, y: 390 } }, // Spain
  ".ca": { lon: -106, lat: 56, chip: { x: 200, y: 250 } }, // Canada
  ".us": { lon: -98, lat: 38, chip: { x: 260, y: 350 } }, // USA
  ".br": { lon: -51, lat: -10, chip: { x: 350, y: 500 } }, // Brazil
  ".au": { lon: 133, lat: -25, chip: { x: 1040, y: 580 } }, // Australia
  ".jp": { lon: 138, lat: 37, chip: { x: 1070, y: 350 } }, // Japan
  ".kr": { lon: 127.5, lat: 37, chip: { x: 1040, y: 340 } }, // South Korea
  ".za": { lon: 24, lat: -29, chip: { x: 600, y: 590 } }, // South Africa
  ".se": { lon: 15, lat: 62, chip: { x: 530, y: 290 } }, // Sweden
  ".no": { lon: 8, lat: 61, chip: { x: 520, y: 270 } }, // Norway
  ".fi": { lon: 26, lat: 64, chip: { x: 550, y: 260 } }, // Finland
  ".pl": { lon: 19, lat: 52, chip: { x: 540, y: 320 } }, // Poland
  ".ch": { lon: 8, lat: 47, chip: { x: 520, y: 340 } }, // Switzerland
  ".be": { lon: 4, lat: 51, chip: { x: 515, y: 320 } }, // Belgium
  ".mx": { lon: -102, lat: 23, chip: { x: 230, y: 400 } }, // Mexico
  ".ar": { lon: -64, lat: -34, chip: { x: 380, y: 580 } }, // Argentina
  ".tr": { lon: 35, lat: 39, chip: { x: 610, y: 380 } }, // Turkey
  ".sa": { lon: 45, lat: 24, chip: { x: 680, y: 420 } }, // Saudi Arabia
  ".ir": { lon: 53, lat: 32, chip: { x: 720, y: 390 } }, // Iran
  ".pk": { lon: 70, lat: 30, chip: { x: 800, y: 400 } }, // Pakistan
};
