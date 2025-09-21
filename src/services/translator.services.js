import axios from "axios";
import { v4 as uuidv4 } from "uuid";

let key = process.env.AZURE_TRANSLATOR_KEY;
let location = process.env.AZURE_TRANSLATOR_REGION;
let endpoint = "https://api.cognitive.microsofttranslator.com";

async function translateText(text, mode = 0) {
    try {
        const response = await axios({
            baseURL: endpoint,
            url: "/translate",
            method: "post",
            headers: {
                "Ocp-Apim-Subscription-Key": key,
                "Ocp-Apim-Subscription-Region": location,
                "Content-type": "application/json",
                "X-ClientTraceId": uuidv4().toString()
            },
            params: {
                "api-version": "3.0",
                from: mode ? "en" : "ml",
                to: mode ? "ml" : "en"
            },
            data: [{ text: text }],
            responseType: "json"
        });
        const translation = response.data[0].translations[0].text;

        return translation;
    } catch (err) {
        console.error("Translation error:", err.response?.data || err.message);
        throw err;
    }
}

export default translateText;
