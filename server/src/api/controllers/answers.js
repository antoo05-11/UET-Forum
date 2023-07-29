import Answer from "../models/answer"

export const getAnswer = async (req, res) => {
    await Answer.findById(req.params.id).then((answer) => {
        if (!answer) res.status(404);
        res.status(200).json(answer);
    })
}

export const updateAnswer = async (req, res) => {
    await Answer.findById(req.params.id).then((answer) => {
        if (!answer) res.status(404);
        answer.rootID = req.rootID;
        answer.content = req.content;
        answer.save();
        return res.status(200).json(answer);
    })
}

export const deleteAnswer = async (req, res) => {
    await Answer.deleteOne({
        _id: req.params.id
    }).then(() => {
        res.status(200);
    })
}