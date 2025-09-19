import express from "express";
import cors from "cors";

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

app.get("/", (req, res) => {
    res.status(200).send(
        "You are now accessing Krushi Sakha's Backend Server."
    );
});
