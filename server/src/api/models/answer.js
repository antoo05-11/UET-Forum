import mongoose, {
    Schema
} from "mongoose";

const answerSchema = mongoose.Schema({
    rootID: {
        type: Schema.Types.ObjectId
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
    content: {
        type: String,
        required: true
    },
    point: {
        type: Number,
        min: 0,
        required: true,
        default: 0
    }
});

export default mongoose.model("Answer", answerSchema);