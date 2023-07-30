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

answerRoute.get("/:answerID", getAnswer);
answerRoute.put("/:answerID/edit", verifyToken, catchAsync(updateAnswer));
answerRoute.delete("/:answerID/delete", verifyToken, catchAsync(deleteAnswer));

export default answerRoute;