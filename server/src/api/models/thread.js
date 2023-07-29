import mongoose, {
    Mongoose,
    Schema
} from "mongoose";

const threadSchema = mongoose.Schema({
    rootID: {
        type: Schema.Types.ObjectId,
        ref: 'Thread'
    },
    title: {
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
    }
});

export default mongoose.model("Thread", threadSchema);