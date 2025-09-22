import { Router } from "express";
import {
    getSoilRecommendation,
    getProfitabilityRecommendation,
    getMarketRecommendation,
    getWeatherRecommendation,
    getDssRoot
} from "../controllers/insights.controllers.js";

const insightsRouter = Router();

insightsRouter.get("/", getDssRoot);
insightsRouter.get("/soil", getSoilRecommendation);
insightsRouter.get("/profitability", getProfitabilityRecommendation);
insightsRouter.get("/market", getMarketRecommendation);
insightsRouter.get("/weather", getWeatherRecommendation);

export default insightsRouter;
