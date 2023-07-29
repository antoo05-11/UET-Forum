import {
    Router
} from "express";

import {
    deleteAnswer,
    getAnswer,
    updateAnswer
} from "../controllers/answers";

import {
    verifyToken
} from "../middlewares/verify";

import catchAsync from "../exceptions/catch-async";

const answerRoute = new Router;

answerRoute.get("/:id", getAnswer);
answerRoute.put("/:id/edit", verifyToken, catchAsync(updateAnswer));
answerRoute.delete("/:id/", verifyToken, catchAsync(deleteAnswer));

export default answerRoute;