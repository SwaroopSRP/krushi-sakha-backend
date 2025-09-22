import { Router } from "express";
import {
    fetchSoilData,
    fetchWeatherData,
    fetchWeatherAlerts,
    fetchLlmOutput,
    fetchMarketPrice,
    fetchTranslation,
    fetchDistrictCoordinates
} from "../controllers/extData.controllers.js";

const extDataRouter = Router();

extDataRouter.get("/soil-data", fetchSoilData);
extDataRouter.get("/weather-data", fetchWeatherData);
extDataRouter.get("/weather-alerts", fetchWeatherAlerts);
extDataRouter.get("/llm-output", fetchLlmOutput);
extDataRouter.get("/market-price", fetchMarketPrice);
extDataRouter.get("/translate", fetchTranslation);
extDataRouter.get("/dist-coords", fetchDistrictCoordinates);

export default extDataRouter;
