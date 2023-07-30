import Answer from "../models/answer";
import Post from "../models/post";
import User from "../models/user";

export const getRank = async (req, res) => {
    let result = [];
    let userList = await User.find();
    for (const user of userList) {
        let posts = await Post.find({
            author: user.id
        });
        let answers = await Answer.find({
            author: user.id
        });
        let total = Math.round(user.reputation * 0.3 + posts.length * 0.3 + answers.length * 0.4);
        result.push({
            userID: user.id,
            name: user.name,
            reputation: user.reputation,
            postsNum: posts.length,
            ansNum: answers.length,
            total: total
        });
    }
    return res.status(200).json(result);
};