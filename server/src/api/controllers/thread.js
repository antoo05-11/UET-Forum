import Thread from "../models/thread"

export const getThread = async (req, res) => {

}

export const createThread = async (req, res) => {
    let newThread = {
        rootID: req.body.rootID,
        type: 2,
        title: req.body.title
    }
    Thread.create(newThread);
    return res.status(200).json(newThread);
}

export const updateThread = async (req, res) => {
    Thread.findById(req.param['id']).then((thread)=>{
        thread.title = req.body.title;
        thread.lastUpdated = Date.now();
        thread.save();
    })
}

export const deleteThread = async (req, res) => {

}