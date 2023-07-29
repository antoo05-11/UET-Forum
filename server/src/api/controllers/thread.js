import Thread from "../models/thread"
import Post from "../models/post"

export const getThread = async (req, res) => {
    let rootID = req.param["id"];

    const thread = await Thread.findById(rootID);

    let children;
    if (thread.type === "1") {
        children = Thread.find({"rootID": rootID});
    } else {
        children = Post.find({"rootID": rootID});
    }
    
    return res.status(200).json({
        "thread": thread,
        "children": children
    });
};

export const createThread = async (req, res) => {

}

export const updateThread = async (req, res) => {

}

export const deleteThread = async (req, res) => {

}