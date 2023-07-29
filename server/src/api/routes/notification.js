import {
    Router
} from "express";

import { showNotification } from "../controllers/notification";

import {
    verifyToken
} from "../middlewares/verify";

import catchAsync from "../exceptions/catch-async";

const notificationRoute = new Router;

notificationRoute.get("/", verifyToken, catchAsync(showNotification));

export default notificationRoute;