import mongoose, {
    Mongoose,
    Schema
} from "mongoose";

const threadSchema = mongoose.Schema({
    rootID: {
        type: Schema.Types.ObjectId,
        ref: 'Thread'
    },
    type: {
        type: Number,
        enum: [1, 2]
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dateTime: {
        type: Date,
        required: true,
        default: Date.now()
    },
    lastUpdated: {
        type: Date,
        required: true,
        default: Date.now()
    },
    children: [{
        type: Schema.Types.ObjectId
    }],
    isAlive: {
        type: Boolean,
        required: true,
        default: true
    }
});

export default mongoose.model("Thread", threadSchema);