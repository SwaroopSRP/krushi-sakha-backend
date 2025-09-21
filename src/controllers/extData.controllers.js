import getSoilProperties from "../services/soilData.services.js";
import { getWeather, getWeatherAlerts } from "../services/weather.services.js";
import getLlmOutput from "../services/llm.services.js";
import getLatestPrice from "../services/marketPrice.services.js";
import translateText from "../services/translator.services.js";
import asyncHandler from "../utils/asyncHandler.js";
import ServerResponse from "../utils/apiResponse.js";
import ServerError from "../utils/apiError.js";

const fetchSoilData = asyncHandler(async (req, res, next) => {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
        throw new ServerError(400, "Latitude and longitude are required.");
    }
    const data = await getSoilProperties(lat, lon);
    if (!data) {
        throw new ServerError(502, "Failed to fetch soil data from external service.");
    }
    res.status(200).json(new ServerResponse(200, data, "Soil data fetched successfully"));
});

const fetchWeatherData = asyncHandler(async (req, res, next) => {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
        throw new ServerError(400, "Latitude and longitude are required.");
    }
    const data = await getWeather(lat, lon);
    if (!data) {
        throw new ServerError(502, "Failed to fetch weather data from external service.");
    }
    res.status(200).json(new ServerResponse(200, data, "Weather data fetched successfully"));
});

const fetchWeatherAlerts = asyncHandler(async (req, res, next) => {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
        throw new ServerError(400, "Latitude and longitude are required.");
    }
    const alerts = await getWeatherAlerts(lat, lon);
    if (!alerts) {
        throw new ServerError(502, "Failed to fetch weather alerts from external service.");
    }
    res.status(200).json(new ServerResponse(200, alerts, "Weather alerts fetched successfully"));
});

const fetchLlmOutput = asyncHandler(async (req, res, next) => {
    const { level = 0, systemPrompt = "", userPrompt } = req.query;
    if (!userPrompt) {
        throw new ServerError(400, "userPrompt is required.");
    }
    const output = await getLlmOutput(Number(level), systemPrompt, userPrompt);
    if (!output) {
        throw new ServerError(502, "Failed to fetch LLM output from external service.");
    }
    res.status(200).json(new ServerResponse(200, output, "LLM output fetched successfully"));
});

const fetchMarketPrice = asyncHandler(async (req, res, next) => {
    const { district, commodity } = req.query;
    if (!district || !commodity) {
        throw new ServerError(400, "District and commodity are required.");
    }
    const price = await getLatestPrice(district, commodity);
    if (!price) {
        throw new ServerError(502, "Failed to fetch market price from external service.");
    }
    res.status(200).json(new ServerResponse(200, price, "Market price fetched successfully"));
});

const fetchTranslation = asyncHandler(async (req, res, next) => {
    const { text, mode = 0 } = req.query;
    if (!text) {
        throw new ServerError(400, "Text is required for translation.");
    }
    const translation = await translateText(text, Number(mode));
    if (!translation) {
        throw new ServerError(502, "Failed to fetch translation from external service.");
    }
    res.status(200).json(new ServerResponse(200, translation, "Translation fetched successfully"));
});

export {
    fetchSoilData,
    fetchWeatherData,
    fetchWeatherAlerts,
    fetchLlmOutput,
    fetchMarketPrice,
    fetchTranslation
};
