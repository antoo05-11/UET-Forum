import HttpException from "../exceptions/http-exception";
import Answer from "../models/answer"

export const getAnswer = async (req, res) => {
    await Answer.findById(req.params.answerID).then((answer) => {
        if (!answer) throw new HttpException(404, "Answer not found");
        res.status(200).json(answer);
    })
}

export const updateAnswer = async (req, res) => {
    let answer = await Answer.findById(req.params.answerID);
    if (!answer) throw new HttpException(404, "Answer not found");
    if (!req.user.role.includes("admin") && answer.author.toString() != req.user.id) throw new HttpException (400, "You do not have permission for this action");

    answer.rootID = req.rootID;
    answer.content = req.content;
    answer.save();
    return res.status(200).json(answer);
};

export const deleteAnswer = async (req, res) => {
    let answer = await Answer.findById(req.params.answerID);
    if (!answer) throw new HttpException(404, "Answer not found");
    if (!req.user.role.includes("admin") && answer.author.toString() != req.user.id) throw new HttpException (400, "You do not have permission for this action");

    const isDeleted = await Answer.deleteOne({ _id: req.params.answerID });
    if (!isDeleted) throw new HttpException(403, "Error deleting answer");

    res.status(200).json();
}