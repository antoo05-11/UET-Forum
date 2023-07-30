import {
    Router
} from "express";

import { reachNotification, showAllNotifications } from "../controllers/notification";

import {
    verifyToken
} from "../middlewares/verify";

import catchAsync from "../exceptions/catch-async";

const notificationRoute = new Router;

notificationRoute.get("/", verifyToken, catchAsync(showAllNotifications));
notificationRoute.get("/:postID/:answerID", verifyToken, catchAsync(reachNotification));

export default notificationRoute;