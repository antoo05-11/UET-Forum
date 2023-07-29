import {
    Router
} from "express";

import {
    createThread,
    deleteThread,
    getThread,
    reopenThread,
    updateThread
} from "../controllers/thread";

import {
    verifyToken
} from "../middlewares/verify-token";

import catchAsync from "../exceptions/catch-async";

const threadRoute = new Router;

threadRoute.get("/:id", catchAsync(getThread));
threadRoute.post("/create", verifyToken, catchAsync(createThread));
threadRoute.put("/:id/edit", verifyToken, catchAsync(updateThread));
threadRoute.put("/:id/reopen", verifyToken, catchAsync(reopenThread))
threadRoute.delete("/:id", verifyToken, catchAsync(deleteThread));

export default threadRoute;