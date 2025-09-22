import axios from "axios";

async function getSoilProperties(lat, lon) {
    const SOIL_URL = "https://rest.isric.org/soilgrids/v2.0/properties/query";
    const props = ["phh2o", "cec", "clay", "ocd", "bdod"];
    const depth = "30-60cm";

    const params = new URLSearchParams({
        lat,
        lon,
        depth,
        value: "mean"
    });
    props.forEach((p) => params.append("property", p));

    const url = `${SOIL_URL}?${params.toString()}`;

    try {
        const { data } = await axios.get(url);
        console.log(JSON.stringify(data, null, 2)); // pretty-print the raw JSON
        return data; // optional, in case you want to use it
    } catch (error) {
        console.error(
            "Error fetching soil properties:",
            error.response?.data || error.message
        );
    }
}

// Example usage
(async () => {
    await getSoilProperties(12.9716, 77.5946); // Bangalore coordinates
})();
