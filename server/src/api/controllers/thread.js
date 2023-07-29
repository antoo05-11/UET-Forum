import Thread from "../models/thread"
import Post from "../models/post"

export const getAllThread = async (req, res) => {

    const threads = await Thread.find({
        type: 1,
        isAlive: true
    });
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
    let rootID = req.params.id;

    const thread = await Thread.findById(rootID);
    if (!thread.isAlive) return res.status(404);

    let children;
    if (thread.type == 1) {
        children = await Thread.find({
                "rootID": rootID,
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
                "rootID": rootID,
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
    let newThread = {
        rootID: req.body.rootID,
        type: 2,
        title: req.body.title,
        author: req.user._id
    }
    Thread.create(newThread);
    return res.status(200).json(newThread);
}

export const updateThread = async (req, res) => {
    Thread.findById(req.params.id).then((thread) => {
        thread.title = req.body.title;
        thread.lastUpdated = Date.now();
        thread.save();
        return res.status(200).json();
    })
}

export const deleteThread = async (req, res) => {
    Thread.findById(req.params.id).then((thread) => {
        if (!thread) res.status(404);
        thread.isAlive = false;
        thread.save();
        return res.status(200);
    })
}

export const reopenThread = async (req, res) => {
    Thread.findById(req.params.id).then((thread) => {
        if (!thread) res.status(404);
        thread.isAlive = true;
        thread.save();
        return res.status(200);
    })
}