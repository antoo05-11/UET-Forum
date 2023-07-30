import HttpException from "../exceptions/http-exception";
import Answer from "../models/answer";
import Post from "../models/post";
import Thread from "../models/thread";
import User from "../models/user";
import { pushNotification } from "./notification";

const PAGE_LIMIT = 10;

// export const getAllPosts = async (req, res) => {
//     const threadID = req.params.threadID;
//     const page = req.query.page;
//     const sort = req.query.sort;
    
//     const thread = await Thread.findById(threadID);
//     if (!thread || !thread.isAlive) throw new HttpException(404, "Thread not found");

//     const posts = await Post.find({ rootID: threadID, isAlive: true });
//     if (!posts) throw new HttpException(404, "Posts not found");

//     console.log(posts);

//     res.status(200).json({ thread, posts });
// }

export const getPost = async (req, res) => {
    let page = req.query.page;
    if (!page) page = 1;

    let sort = req.query.sort;
    if (!sort) sort = "dateTime";

    let order = req.query.order;
    if (!order) order = "1";

    let post = await Post.findById(req.params.postID);
    if (!post) throw new HttpException(404, "Post not found");

    post = JSON.parse(JSON.stringify(post));

    await User.findById(post.author).then((user) => {
        if (!user) throw new HttpException(404, "User not found");
        post.authorName = user.username;
    })

    const answers = await Answer.find({
        postID: post._id
    }).sort({
        [sort]: parseInt(order)
    }).skip(
        PAGE_LIMIT * (page - 1)
    ).limit(PAGE_LIMIT);
    if (!answers) throw new HttpException(404, "Answers not found");

    let fullAns = [];
    for (const answer of answers) {
        await User.findById(answer.author).then((user) => {
            let clone = JSON.parse(JSON.stringify(answer));
            if (!user) clone.authorName = "AI Answer";
            else clone.authorName = user.username;;
            fullAns.push(clone);
        });
    }

    return res.status(200).json({ post, fullAns });
}


export const createPost = async (req, res) => {
    let newPost = {
        rootID: req.body.threadID,
        author: req.user.id,
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
            if (!thread) throw new HttpException(404, "Thread not found");
            return res.status(200).json(newPost);
        });
    });
};

export const updatePost = async (req, res) => {
    let post = await Post.findById(req.params.postID);
    if (!post) throw new HttpException(404, "Post not found");
    if (!req.user.role.includes("admin") && post.author.toString() != req.user.id) throw new HttpException (400, "You do not have permission for this action");

    post.content = req.body.content;
    post.lastUpdated = Date.now();
    post.title = req.body.title;
    post.save();
    return res.status(200).json(post);
};

export const answerPost = async (req, res) => {
    const postID = req.params.postID;
    const post = await Post.findById(postID);

    let newAnswer = {
        author: req.user.id,
        postID: postID,
        rootID: req.body.rootID,
        content: req.body.content
    }

    const createdAnswer = await Answer.create(newAnswer);
    if (!createdAnswer) throw new HttpException(404, "Error create answer");

    post.answers.push(createdAnswer.id);
    const updatedPost = await post.save();
    if (!updatedPost) throw new HttpException(404, "Error update post")

    pushNotification([post.author], {
        "post": updatedPost.id,
        "answer": createdAnswer.id,
        "title": updatedPost.title,
        "action": "answer"
    });

    return res.status(200).json(newAnswer);
}

export const AIanswerPost = async (req, res) => {
    let postID = req.params.postID;
    const post = await Post.findOne({ _id: postID });
    if (!post) throw new HttpException(404, "Post not found");
    if (!req.user.role.includes("admin") && post.author.toString() != req.user.id) throw new HttpException (400, "You do not have permission for this action");

    const bard = require("fix-esm").require("bard-ai");
    await bard.init(process.env.BARD_COOKIE);
    let newAnswer = {
        postID: req.params.postID,
        content: await bard.askAI(post.content)
    }
    await Answer.create(newAnswer).then((answer) => {
        if (!answer) res.status(404);
        Post.findOneAndUpdate({
            _id: postID
        }, {
            $push: {
                answers: answer.id
            }
        }, {
            new: true
        }).then((post) => {
            if (!post) res.status(404);
            return res.status(200).json(newAnswer);
        });
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
        Post.findById(req.params.postID)
            .then((post) => {
                if (!post) {
                    return res.status(404).json();
                }
                User.findById(post.author).then((author) => {
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
    let post = await Post.findOne({ _id: postID });
    if (!post) throw new HttpException(404, "Post not found");
    if (!req.user.role.includes("admin") && post.author.toString() != req.user.id) throw new HttpException (400, "You do not have permission for this action");
    
    post.isAlive = false;
    post.save();
    return res.status(200).json();
}

export const reopenPost = async (req, res) => {
    let post = await Post.findOne({ _id: postID });
    if (!post) throw new HttpException(404, "Post not found");
    if (!req.user.role.includes("admin") && post.author.toString() != req.user.id) throw new HttpException (400, "You do not have permission for this action");

    post.isAlive = true;
    post.save();
    return res.status(200).json();
}