import axios from "axios";
import asyncHandler from "../utils/asyncHandler.js";
import ServerError from "../utils/apiError.js";
import ServerResponse from "../utils/apiResponse.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

const FASTAPI_BASE = process.env.FASTAPI_BASE;

// Soil recommendation
export const getSoilRecommendation = asyncHandler(async (req, res, next) => {
    const { lat, lon, crop } = req.query;
    if (!lat || !lon || !crop) {
        throw new ServerError(400, "lat, lon, and crop are required");
    }
    const { data } = await axios.get(`${FASTAPI_BASE}/soil/`, {
        params: { lat, lon, crop }
    });
    res.status(200).json(new ServerResponse(200, data));
});

// Profitability recommendation
export const getProfitabilityRecommendation = asyncHandler(
    async (req, res, next) => {
        const { lat, lon, area, crop } = req.query;
        if (!lat || !lon || !area || !crop) {
            throw new ServerError(400, "lat, lon, area, and crop are required");
        }
        const { data } = await axios.get(`${FASTAPI_BASE}/profitability/`, {
            params: { lat, lon, area, crop }
        });
        res.status(200).json(new ServerResponse(200, data));
    }
);

// Market recommendation
export const getMarketRecommendation = asyncHandler(async (req, res, next) => {
    const { commodity } = req.query;
    if (!commodity) {
        throw new ServerError(400, "commodity is required");
    }
    const { data } = await axios.get(`${FASTAPI_BASE}/market/`, {
        params: { commodity }
    });
    res.status(200).json(new ServerResponse(200, data));
});

// Weather recommendation
export const getWeatherRecommendation = asyncHandler(async (req, res, next) => {
    const { lat, lon, crop } = req.query;
    if (!lat || !lon || !crop) {
        throw new ServerError(400, "lat, lon, and crop are required");
    }
    const { data } = await axios.get(`${FASTAPI_BASE}/weather/`, {
        params: { lat, lon, crop }
    });
    res.status(200).json(new ServerResponse(200, data));
});

// Root endpoint
export const getDssRoot = asyncHandler(async (req, res, next) => {
    const { data } = await axios.get(`${FASTAPI_BASE}/`);
    res.status(200).json(new ServerResponse(200, data));
});
