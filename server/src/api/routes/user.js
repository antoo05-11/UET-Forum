import {
    Router
} from "express";

import {
    createUser,
    viewUser,
    updateUser,
    findUser,
    getAllUsers,
    // deleteUser
} from "../controllers/user";

import catchAsync from "../exceptions/catch-async";

import {
    verifyToken
} from "../middlewares/verify-token";

const userRoute = Router();

userRoute.get("/", verifyToken, catchAsync(getAllUsers));
userRoute.post("/find", verifyToken, catchAsync(findUser));
userRoute.post("/create", catchAsync(createUser));
userRoute.get("/view", verifyToken, catchAsync(viewUser));
userRoute.post("/update", verifyToken, catchAsync(updateUser));
// userRoute.delete("/delele", verifyToken,catchAsync(deleteUser));

export default userRoute;