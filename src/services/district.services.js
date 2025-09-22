import axios from "axios";

async function getDistrict(district, state = "kerala") {
    try {
        const query = encodeURIComponent(
            district + (state ? ", " + state : "")
        );
        const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

        const { data } = await axios.get(url, {
            headers: {
                "User-Agent": "MyNodeApp/1.0 (email@example.com)" // required by Nominatim
            },
            timeout: 20000 // 20 seconds
        });

        if (!data || data.length === 0) return null;

        return {
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon)
        };
    } catch (err) {
        console.error("Error fetching coordinates:", err.message);
        return null;
    }
}

export default getDistrict;
