import Post from "../models/post"

export const getPost = (req, res) => {
    res.json();
}

export const createPost = (req, res) => {
    let newPost = {
        authorID: "test",
        title: "hello world",
        content: "something"
    }
    Post.create(
        newPost
    );
    res.status(200).json(newPost);
}