import axios from "axios";

async function getLatestPrices(district, commodity) {
    try {
        const apiKey = process.env.DATA_GOV_API_KEY;
        const url = "https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24";

        const cap = str =>
            str
                .toLowerCase()
                .split(" ")
                .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ");

        const districtCap = cap(district);
        const commodityCap = cap(commodity);

        const resp = await axios.get(url, {
            params: {
                "api-key": apiKey,
                format: "json",
                limit: 7,
                offset: 0,
                "filters[State]": "Kerala",
                "filters[District]": districtCap,
                "filters[Commodity]": commodityCap,
                "sort[Arrival_Date]": "desc"
            }
        });

        const records = resp.data.records;
        if (!records || records.length === 0) return [];

        return records.map(record => ({
            district: record.District,
            commodity: record.Commodity,
            arrivalDate: record.Arrival_Date,
            price: parseInt(record.Modal_Price, 10)
        }));
    } catch (err) {
        console.error("Error fetching last 7 prices:", err.message);
        return [];
    }
}

export default getLatestPrices;
