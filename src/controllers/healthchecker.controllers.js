import ServerResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const healthChecker = asyncHandler(async (req, res) => {
    res.status(200).send(
        new ServerResponse(200, {
            message: "Server up and running...",
            status: "UP"
        })
    );
});

export default healthChecker;
