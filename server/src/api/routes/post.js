import {
    Router
} from "express";
import {
    AIanswerPost,
    answerPost,
    // broadcastPost,
    closePost,
    createPost,
    // getAllPosts,
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

// postRoute.get("/:threadID/:page?", getAllPosts);
postRoute.get("/:postID", getPost);
postRoute.post("/create", verifyToken, catchAsync(createPost));
// postRoute.post("/broadcast", verifyToken, catchAsync(broadcastPost));
postRoute.post("/:postID/AIanswer", verifyToken, catchAsync(AIanswerPost));
postRoute.put("/:postID/edit", verifyToken, catchAsync(updatePost));
postRoute.put("/:postID/vote", verifyToken, catchAsync(votePost));
postRoute.put("/:postID/close", verifyToken, catchAsync(closePost));
postRoute.put("/:postID/reopen", verifyToken, catchAsync(reopenPost));
postRoute.post("/:postID/answer", verifyToken, catchAsync(answerPost));

export default postRoute;