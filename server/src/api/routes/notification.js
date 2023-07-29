import {
    Router
} from "express";

import { reachNotification, showNotification } from "../controllers/notification";

import {
    verifyToken
} from "../middlewares/verify";

import catchAsync from "../exceptions/catch-async";

const notificationRoute = new Router;

notificationRoute.get("/", verifyToken, catchAsync(showNotification));
notificationRoute.get("/:post_id/:ans_id", verifyToken, catchAsync(reachNotification));

export default notificationRoute;