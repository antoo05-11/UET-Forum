import {
    Router
} from "express";

import authRoute from "./auth";
import userRoute from "./user";
import postRoute from "./post";
import threadRoute from "./thread";

const router = Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/post", postRoute);
router.use("/thread", threadRoute);

export default router;