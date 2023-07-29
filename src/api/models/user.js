import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["student", "admin", "teacher"],
        default: "student",
    },
    name: {
        type: String,
        required: true,
    },
    reputation: {
        type: Number,
        required: true,
        default: 0
    }
});

export default mongoose.model("User", userSchema);