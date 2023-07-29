import {
    Router
} from "express";

import {
    createUser,
    findUser,
    getAllUsers
} from "../controllers/user";

import catchAsync from "../exceptions/catch-async";

import {
    isAdmin,
    verifyToken
} from "../middlewares/verify-token";

const userRoute = Router();

userRoute.get("/", verifyToken, isAdmin, catchAsync(getAllUsers));
userRoute.post("/find",verifyToken, catchAsync(findUser));
userRoute.post("/create", catchAsync(createUser));

export default userRoute;