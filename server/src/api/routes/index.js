import {
    Router
} from "express";

import authRoute from "./auth";
import userRoute from "./user";
import postRoute from "./post";
import threadRoute from "./thread";
import answerRoute from "./answer";
import notificationRoute from "./notification";
const router = Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/post", postRoute);
router.use("/thread", threadRoute);
router.use("/notification", notificationRoute);
router.use("/answer", answerRoute);

export default router;