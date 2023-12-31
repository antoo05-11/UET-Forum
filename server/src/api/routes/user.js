import {
    Router
} from "express";

import {
    createUser,
    viewUser,
    updateUser,
    findUser,
    getAllUsers,
    getUser,
    userShortenedView,
    // deleteUser
} from "../controllers/user";

import catchAsync from "../exceptions/catch-async";

import {
    verifyToken
} from "../middlewares/verify";

const userRoute = Router();

userRoute.get("/", verifyToken, catchAsync(getAllUsers));
userRoute.get("/view/:id", catchAsync(getUser));
userRoute.post("/find", verifyToken, catchAsync(findUser));
userRoute.post("/create", catchAsync(createUser));
userRoute.get("/view", verifyToken, catchAsync(getUser));
userRoute.get("/shortenedView/:id", catchAsync(userShortenedView));
userRoute.post("/update", verifyToken, catchAsync(updateUser));
// userRoute.delete("/delele", verifyToken,catchAsync(deleteUser));

export default userRoute;