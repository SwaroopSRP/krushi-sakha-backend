import axios from "axios";

async function getSoilProperties(lat, lon) {
    console.log(`Generating soil data for lat=${lat}, lon=${lon}...`);

    const result = {
        depthLayer: "30-60cm",
        pH: +(5.3 + Math.random() * 2).toFixed(1), // 5.0 - 7.0
        CEC: +(10 + Math.random() * 10).toFixed(1), // cmol/kg
        clayContent: +(20 + Math.random() * 30).toFixed(1), // %
        organicCarbon: +(5 + Math.random() * 15).toFixed(1), // g/kg
        bulkDensity: +(1.2 + Math.random() * 0.3).toFixed(2) // kg/m³
    };

    return result;
}

export default getSoilProperties;
