import express from "express";
import cors from "cors";
import extDataRouter from "./routes/extData.routes.js";
import healthCheckerRouter from "./routes/healthcheck.routes.js";

const app = express();
export default app;

app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));

// CORS Configs
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    })
);

app.use("/api/v1/ext-data", extDataRouter);
app.use("/api/v1/health", healthCheckerRouter);

app.get("/", (req, res) => {
    res.status(200).send(
        "You are now accessing Krushi Sakha's Backend Server."
    );
});
