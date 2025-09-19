import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({
    path: "./.env"
});

const port = process.env.PORT || 6900;

app.listen(port, () => {
    console.log(`Server up and running on http://localhost:${port}`);
});
