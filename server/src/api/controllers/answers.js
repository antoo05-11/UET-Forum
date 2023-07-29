import Answer from "../models/answer"

export const getAnswer = async (req, res) => {
    await Answer.findById(req.params.id).then((answer) => {
        if (!answer) res.status(404);
        res.status(200).json(answer);
    })
}