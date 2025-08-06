
function getDomainAgeInfo(created, expiresDate) {
    const createdDate = new Date(created);
    const expiryDate = new Date(expiresDate);
    const currentDate = new Date();

    // Total lifetime of domain in ms
    const totalLifeMs = expiryDate - createdDate;

    // Age till now in ms
    const ageMs = currentDate - createdDate;

    // Handle future domains or invalid dates
    if (ageMs < 0 || totalLifeMs <= 0) {
        return {
            ageText: "Invalid dates",
            percentageUsed: "0%",
        };
    }

    // Convert ms to days
    const totalLifeDays = Math.floor(totalLifeMs / (1000 * 60 * 60 * 24));
    const ageDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));

    // Calculate years and days used
    const years = Math.floor(ageDays / 365);
    const remainingDays = ageDays % 365;

    // Calculate percentage
    const percent = ((ageDays / totalLifeDays) * 100).toFixed(2);

    return {
        ageText: `${years} Y, ${remainingDays} D`,
        percentageUsed: `${percent}%`,
    };
}


export default getDomainAgeInfo