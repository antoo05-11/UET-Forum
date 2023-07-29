import User from "../models/user";
import bcrypt from "bcryptjs";
import HttpException from "../exceptions/http-exception";

// CRUD
export const getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) throw new HttpException(404, "User not found");

    return res.status(200).json(user);
};


export const viewUser = async (req, res) => {
    console.log(req.user);
    return res.status(200).json(req.user);
};

export const createUser = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    const existingUser = await User.findOne({ username });
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