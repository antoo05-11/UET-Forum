import HttpException from "../exceptions/http-exception";
import Notification from "../models/notification";
import Post from "../models/post"

export const pushNotification = async function(users, content) {
    const notifications = users.map((user) => ({
        user: user,
        time: Date.now(),
        content: content
    }));

    await Notification.insertMany(notifications);
};

export const showNotification = async (req, res) => {
    const user = req.user;
    const notifications = await Notification.find({ "user": user });
    if (!notifications) throw new HttpException(404, "Notifications not found")

    return res.status(200).json(notifications);
};

export const reachNotification = async (req, res) => {
    const post = await Post.findById(req.params.id);

};
