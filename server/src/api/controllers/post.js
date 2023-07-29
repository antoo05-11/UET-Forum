import error from "mongoose/lib/error";
import Post from "../models/post"


export const getPost = (req, res) => {
    res.json();
}

export const createPost = async (req, res) => {
    let newPost = {
        rootID: "64c3de5efb8519ccb86b9789",
        authorID: req.user.id,
        title: req.body.title,
        content: req.body.content
    }
    await Post.create(
        newPost
    );
    return res.status(200).json(req.body);
}

export const updatePost = async (req, res) => {
    let rootID = req.body.id;
    await Post.findById(rootID).then((post) => {
        post.content = req.body.content;
        post.lastUpdated = Date.now();
        post.title = req.body.title;
        post.save();
        return res.status(200).json(post);
    }).catch((error) => {
        console.log(error);
    });
}
export const answerPost = async (req, res) => {
    
}
export const AIanswerPost = async (req, res) => {
    let rootID = req.body.id;
    const post = await Post.findOne({
        _id: rootID
    });

    const bard = require("fix-esm").require("bard-ai");
    await bard.init(process.env.BARD_COOKIE);
    let newAnswer = {
        author: req.user.id,
        content: await bard.askAI(post.content)
    }
    await Post.findOneAndUpdate({
        _id: rootID
    }, {
        $push: {
            answers: newAnswer
        }
    }, {
        new: true
    }).then((post) => {
        if (!post) res.status(404);
        return res.status(200).json(newAnswer);
    });
}