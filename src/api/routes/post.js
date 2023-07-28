import { Router } from "express";
import { createPost, getPost } from "../controllers/post";

const postRoute = new Router;

postRoute.post("/getPost", getPost);
postRoute.post("/createPost", createPost);

export default postRoute;