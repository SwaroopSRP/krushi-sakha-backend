import axios from "axios";

async function getLatestPrice(district, commodity) {
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

        const latestDateResp = await axios.get(url, {
            params: {
                "api-key": apiKey,
                format: "json",
                limit: 1,
                offset: 0,
                "filters[District]": districtCap,
                "filters[Commodity]": commodityCap,
                "sort[Arrival_Date]": "desc"
            }
        });

        const latestRecords = latestDateResp.data.records;
        if (!latestRecords || latestRecords.length === 0) return null;

        const latestDate = latestRecords[0].Arrival_Date;

        const finalResp = await axios.get(url, {
            params: {
                "api-key": apiKey,
                format: "json",
                limit: 1,
                offset: 0,
                "filters[State]": "Kerala",
                "filters[District]": districtCap,
                "filters[Commodity]": commodityCap,
                "filters[Arrival_Date]": latestDate
            }
        });

        const finalRecords = finalResp.data.records;
        if (!finalRecords || finalRecords.length === 0) return null;

        const record = finalRecords[0];

        return {
            district: record.District,
            commodity: record.Commodity,
            arrivalDate: record.Arrival_Date,
            price: parseInt(record.Modal_Price, 10)
        };
    } catch (err) {
        console.error("Error fetching latest price:", err.message);
        return null;
    }
}

export default getLatestPrice;
