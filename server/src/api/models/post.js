import mongoose, {
    Schema
} from "mongoose";

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
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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
        type: Schema.Types.ObjectId
    }],
    isAlive: {
        type: Boolean,
        default: true,
        required: true
    }

});

export default mongoose.model("Post", postSchema);