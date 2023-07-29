import Answer from "../models/answer";
import Post from "../models/post";
import Thread from "../models/thread";
import User from "../models/user";


export const getAllPosts = async (req, res) => {
    let rootID = req.body.rootID;
    let thread = await thread.findById(rootID);
    if (!thread.isAlive) return res.status(404);
    let posts = Post.find({
        rootID: rootID,
        isAlive: true
    });
    res.status(200).json({
        thread,
        posts
    });
}

export const getPost = async (req, res) => {
    let post = await Post.findById(req.params.id);
    if (!post) return res.status(404);
    return res.status(200).json({
        post
    });
}


export const createPost = async (req, res) => {
    let newPost = {
        rootID: req.body.rootID,
        authorID: req.user.id,
        title: req.body.title,
        content: req.body.content
    }
    await Post.create(newPost).then((post) => {
        Thread.findOneAndUpdate({
            _id: newPost.rootID
        }, {
            $push: {
                children: post.id
            }
        }, {
            new: true
        }).then((thread) => {
            if (!thread) return res.status(404);
            return res.status(200).json(newPost);
        });
    });
}

export const updatePost = async (req, res) => {
    await Post.findById(req.params.id).then((post) => {
        if (!post) return res.status(200);
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
    let rootID = req.params.id;

    let newAnswer = {
        author: req.user.id,
        rootID: req.body.rootID,
        content: req.body.content
    }
    await Answer.create(newAnswer).then((answer));
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

const MIN_REPU_VOTE_UP = 5;
const MIN_REPU_VOTE_DOWN = 10;

export const votePost = async (req, res) => {
    let voteVal = req.body.voteVal;
    await User.findById(req.user._id).then((user) => {
        if (!user) return res.status(404).json();
        if (user.id == req.user._id) {
            return res.status(400).json();
        }
        let reputation = user.reputation;
        if (reputation < MIN_REPU_VOTE_UP) return res.status(400).json();
        Post.findById(req.params.id)
            .then((post) => {
                if (!post) {
                    return res.status(404).json();
                }
                User.findById(post.authorID).then((author) => {
                    if (voteVal) {
                        post.point++;
                        author.reputation++;
                    } else if (reputation >= MIN_REPU_VOTE_DOWN) {
                        post.point--;
                        author.reputation--;
                    } else return res.status(400).json();
                    author.save();
                    post.save();
                    return res.status(200).json();
                })
            }).catch((error) => {
                console.log(error);
            })
    })
}

export const closePost = async (req, res) => {
    await Post.findById(req.params.id).then((post) => {
        if (!post) return res.status(404);
        post.isAlive = false;
        post.save();
        return res.status(200);
    })
}

export const reopenPost = async (req, res) => {
    await Post.findById(req.params.id).then((post) => {
        if (!post) return res.status(404);
        post.isAlive = true;
        post.save();
        return res.status(200);
    })
}