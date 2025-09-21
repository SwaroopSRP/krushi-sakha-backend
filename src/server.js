import os from "node:os";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

const port = process.env.PORT || 6900;

function getLocalIP() {
    const nets = os.networkInterfaces();
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === "IPv4" && !net.internal) {
                return net.address;
            }
        }
    }
    return null;
}

app.listen(port, "0.0.0.0", () => {
    console.log(`Server up and running on http://localhost:${port}`);
    console.log(`Local Address: http://${getLocalIP()}:${port}`);
});
