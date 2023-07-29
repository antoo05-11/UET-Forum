import {
    Router
} from "express";

import { getThread } from "../controllers/thread";

import {
    verifyToken
} from "../middlewares/verify-token";

import catchAsync from "../exceptions/catch-async";

const threadRoute = new Router;

threadRoute.get("/:id", catchAsync(getThread));

export default threadRoute;