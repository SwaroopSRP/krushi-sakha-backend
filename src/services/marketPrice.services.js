import fs from "fs/promises";
import path from "path";

async function getLatestPrices(district, commodity) {
    try {
        const cap = (str) =>
            str
                .toLowerCase()
                .split(" ")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ");

        const districtCap = cap(district);
        const commodityCap = cap(commodity);

        // Read the local JSON file
        const filePath = path.join(process.cwd(), "public", "prices.json"); // adjust path if needed
        const fileData = await fs.readFile(filePath, "utf-8");
        const allData = JSON.parse(fileData);

        const districtData = allData[districtCap];
        if (!districtData || districtData.length === 0) return [];

        // Filter for the given commodity
        const filtered = districtData
            .filter((record) => record.commodity === commodityCap)
            .slice(0, 7); // get last 7 records (assuming already in descending order)

        return filtered.map((record) => ({
            district: record.district,
            commodity: record.commodity,
            arrivalDate: record.arrivalDate,
            price: parseInt(record.price, 10)
        }));
    } catch (err) {
        console.error("Error fetching last 7 prices from JSON:", err.message);
        return [];
    }
}

export default getLatestPrices;
