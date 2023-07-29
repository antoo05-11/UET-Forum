import {
    Router
} from "express";
import {
    AIanswerPost,
    createPost,
    getPost,
    updatePost,
    votePost,
} from "../controllers/post";
import catchAsync from "../exceptions/catch-async";
import {
    verifyToken
} from "../middlewares/verify-token";

const postRoute = new Router;

postRoute.post("/getPost", getPost);
postRoute.post("/createPost", verifyToken, catchAsync(createPost));
postRoute.post("/AIanswerPost", verifyToken, catchAsync(AIanswerPost));
postRoute.post("/updatePost", verifyToken, catchAsync(updatePost));
postRoute.post("/votePost", verifyToken, catchAsync(votePost));


export default postRoute;