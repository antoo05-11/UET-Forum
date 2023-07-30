import Thread from "../models/thread"
import Post from "../models/post"
import HttpException from "../exceptions/http-exception";

export const getAllThread = async (req, res) => {
    const threads = await Thread.find({ type: 1, isAlive: true });
    if (!threads) throw new HttpException(404, "Thread not found");

    return res.status(200).json(threads);
};

const PAGE_LIMIT = 10;
export const getThread = async (req, res) => {
    let page = req.query.page;
    if (!page) page = 1;
    let sort = req.query.sort;
    if (!sort) sort = "dateTime";
    let order = req.query.order;
    if (!order) order = 1;
    let threadID = req.params.threadID;

    const thread = await Thread.findById(threadID);
    if (!thread) throw new HttpException(404, "Thread not found");
    if (!thread.isAlive) throw new HttpException(400, "Thread is closed");

    let children;
    if (thread.type == 1) {
        children = await Thread.find({
                "rootID": threadID,
                "isAlive": true
            })
            .sort({
                [sort]: parseInt(order)
            })
            .skip(PAGE_LIMIT * (page - 1))
            .limit(PAGE_LIMIT);
        console.log(children);
    } else {
        children = await Post.find({
                "rootID": threadID,
                "isAlive": true
            })
            .sort({
                [sort]: parseInt(order)
            })
            .skip(PAGE_LIMIT * (page - 1))
            .limit(PAGE_LIMIT);
        console.log(children);
    }

    return res.status(200).json({
        thread,
        children
    });
};

export const createThread = async (req, res) => {
    if (req.user.role.includes("student")) throw new HttpException (400, "You do not have permission for this action");

    let newThread = {
        rootID: req.body.rootID,
        type: 2,
        title: req.body.title,
        author: req.user._id
    }
    Thread.create(newThread);
    return res.status(200).json(newThread);
};

export const updateThread = async (req, res) => {
    let thread = await Thread.findById(req.params.threadID);
    if (!thread) throw new HttpException(404, "Thread not found");
    if (!thread.isAlive) throw new HttpException(400, "Thread is closed");
    if (req.user.role.includes("student") || (!req.user.role.includes("admin") && thread.author.toString() != req.user.id)) {
        throw new HttpException (400, "You do not have permission for this action");
    };

    thread.title = req.body.title;
    thread.lastUpdated = Date.now();
    thread.save();
    return res.status(200).json();
};

export const deleteThread = async (req, res) => {
    let thread = await Thread.findById(req.params.threadID);
    if (!thread) throw new HttpException(404, "Thread not found");
    if (req.user.role.includes("student") || (!req.user.role.includes("admin") && thread.author.toString() != req.user.id)) {
        throw new HttpException (400, "You do not have permission for this action");
    };

    thread.isAlive = false;
    thread.save();
    return res.status(200).json();
};

export const reopenThread = async (req, res) => {
    let thread = await Thread.findById(req.params.threadID);
    if (!thread) throw new HttpException(404, "Thread not found");
    if (req.user.role.includes("student") || (!req.user.role.includes("admin") && thread.author.toString() != req.user.id)) {
        throw new HttpException (400, "You do not have permission for this action");
    };

    thread.isAlive = true;
    thread.save();
    return res.status(200).json();
};