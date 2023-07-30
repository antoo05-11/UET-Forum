import User from "../models/user";
import bcrypt from "bcryptjs";
import HttpException from "../exceptions/http-exception";
import Post from "../models/post";
import Answer from "../models/answer";

export const getUser = async (req, res) => {
    let userID = req.params.id;
    if(!userID) userID = req.user.id;
    const user = await User.findById(userID);
    if (!user) throw new HttpException(404, "User not found");

    const [postList, answerList] = await Promise.all([
        Post.find({
            author: user.id
        }),
        Answer.find({
            author: user.id
        }),
    ]);

    const posts = postList.map(foundPost => ({
        id: foundPost.id,
        title: foundPost.title,
        point: foundPost.point,
        dateTime: foundPost.dateTime,
    }));

    let answers = await Promise.all(
        answerList.map(async foundAnswer => {
            const foundPost = await Post.findById(foundAnswer.postID);
            if (foundPost)
                return {
                    postID: foundAnswer.postID,
                    answerID: foundAnswer.id,
                    title: foundPost.title,
                    point: foundAnswer.point,
                    dateTime: foundAnswer.lastUpdated,
                };
        })

    );
    var filtered = answers.filter(function (answers) {
        return answers != null;
    });
    answers = filtered;
    return res.status(200).json({
        user,
        posts,
        answers
    });
};

export const userShortenedView = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) throw new HttpException(404, "User not found");
    return res.status(200).json({
        userID: user.id,
        name: user.name
    })
}



export const viewUser = async (req, res) => {
    return res.status(200).json(req.user);
};

export const createUser = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    const existingUser = await User.findOne({
        username
    });
    if (existingUser) throw new HttpException(400, "Username is duplicated");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username,
        password: hashedPassword
    });

    return res.status(200).json({
        newUser
    });
};

export const updateUser = async (req, res) => {
    const {
        name,
        role,
        password
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findById(req.user._id);

    user.name = name;

    const roleEnumValues = User.schema.path('role').enumValues;
    if (roleEnumValues.includes(role)) {
        user.role = role;
    }

    user.password = hashedPassword;
    user.save();

    return res.status(200).json(user);
};

// export const deleteUser = async (req, res) => {
//     await User.findByIdAndDelete(req.user._id);
//     return res.status(200).json({ message: 'User deleted successfully' });
// };

export const getAllUsers = async (req, res) => {
    const users = await User.find();
    return res.status(200).json({
        users
    });
};

export const findUser = async (req, res) => {
    const regexPattern = new RegExp(req.body.input, 'i');

    const users = await User.find({
        username: {
            $regex: regexPattern
        }
    });
    return res.status(200).json(users);
}