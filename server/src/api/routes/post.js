import {
    Router
} from "express";
import {
    AIanswerPost,
    answerPost,
    closePost,
    createPost,
    deletePost,
    getAllPosts,
    getPost,
    reopenPost,
    updatePost,
    votePost,
} from "../controllers/post";
import catchAsync from "../exceptions/catch-async";
import {
    verifyToken
} from "../middlewares/verify";

const postRoute = new Router;

postRoute.get("/", getAllPosts);
postRoute.get("/:id", getPost);
postRoute.post("/create", verifyToken, catchAsync(createPost));
postRoute.post("/AIanswer", verifyToken, catchAsync(AIanswerPost));
postRoute.put("/:id/edit", verifyToken, catchAsync(updatePost));
postRoute.put("/:id/vote", verifyToken, catchAsync(votePost));
postRoute.put(":id/close", verifyToken, catchAsync(closePost));
postRoute.put("/:id/reopen", verifyToken, catchAsync(reopenPost));
postRoute.post("/:id/answer", verifyToken, catchAsync(answerPost));

export default postRoute;