import mongoose, {
    Schema
} from "mongoose";
import user from "./user";

const postSchema = mongoose.Schema({
    rootID: {
        type: Schema.Types.ObjectId,
        ref: 'Thread'
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
    authorID: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    point: {
        type: Number,
        min: 0,
        required: true,
        default: 0
    },
    answers: [{
        author: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        content: String,
        point: {
            type: Number,
            min: 0,
            required: true,
            default: 0
        }
    }]

});

export default mongoose.model("Post", postSchema);