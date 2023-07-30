import {
    Router
} from "express";

import {
    createThread,
    deleteThread,
    getAllThread,
    getThread,
    reopenThread,
    updateThread
} from "../controllers/thread";

import {
    verifyToken
} from "../middlewares/verify";

import catchAsync from "../exceptions/catch-async";

const threadRoute = new Router;

threadRoute.get("/", catchAsync(getAllThread));
threadRoute.get("/:threadID", catchAsync(getThread)); // 2
threadRoute.post("/create", verifyToken, catchAsync(createThread));
threadRoute.put("/:threadID/edit", verifyToken, catchAsync(updateThread)); // Thread Owner
threadRoute.put("/:threadID/reopen", verifyToken, catchAsync(reopenThread)) // Thread Owner
threadRoute.delete("/:threadID/close", verifyToken, catchAsync(deleteThread)); // Thread Owner

export default threadRoute;