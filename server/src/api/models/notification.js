import mongoose, { Schema } from "mongoose";

const notificationSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    time: {
        type: Date,
        required: true
    },
    content: {
        type: Schema.Types.Mixed,
        required: true
    }
});

export default mongoose.model("Notification", notificationSchema);