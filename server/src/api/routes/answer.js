import {
    Router
} from "express";
import {
    getAnswer
} from "../controllers/answers";

const answerRoute = new Router;

answerRoute.get("/:id", getAnswer);

export default answerRoute;