import {
    Router
} from "express";
import {
    getRank
} from "../controllers/rank";

const rankRouter = new Router;

rankRouter.get("/", getRank);

export default rankRouter;