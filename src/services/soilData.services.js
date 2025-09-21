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

        const result = { depthLayer: depth };
        for (const layer of data.properties.layers) {
            const propName = layer.name;
            // SoilGrids returns one depth slice for the requested depth
            const val = layer.depths[0].values.mean;

            switch (propName) {
                case "phh2o":
                    result.pH = val / 10.0; // convert pH×10 to pH
                    break;
                case "cec":
                    result.CEC = val; // cmol/kg
                    break;
                case "clay":
                    result.clayContent = val; // %
                    break;
                case "ocd":
                    result.organicCarbon = val; // g/kg
                    break;
                case "bdod":
                    result.bulkDensity = val; // kg/m³
                    break;
            }
        }
        return result;
    } catch (error) {
        console.error("Error fetching soil properties:", error);
        throw error;
    }
}

export default getSoilProperties;
