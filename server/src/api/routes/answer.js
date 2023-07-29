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

const answerRoute = new Router;
answerRoute.get("/:id", getAnswer);
answerRoute.put("/:id/edit", verifyToken, updateAnswer);
answerRoute.delete("/:id/", verifyToken, deleteAnswer);
export default answerRoute;