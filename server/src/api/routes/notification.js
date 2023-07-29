import {
    Router
} from "express";

import {

} from "../controllers/notification";

import {
    verifyToken
} from "../middlewares/verify";

import catchAsync from "../exceptions/catch-async";

const notificationRoute = new Router;


export default notificationRoute;