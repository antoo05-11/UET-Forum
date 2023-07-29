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
        type: String,
        required: true
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
    childrens: [{
        type: Schema.Types.ObjectId
    }],
    isAlive: {
        type: Boolean,
        required: true,
        default: true
    }
});

export default mongoose.model("Thread", threadSchema);