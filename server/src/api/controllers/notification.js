import Notification from "../models/notification";

export const pushNotification = async function(users, content) {
    const notifications = users.map((user) => ({
        user: user,
        time: Date.now(),
        content: content
    }));

    await Notification.insertMany(notifications);
};

// export const showNotification = async (req, res) => {
//     const user = req.user;
// };