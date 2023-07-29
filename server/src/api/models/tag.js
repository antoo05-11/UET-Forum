import mongoose from "mongoose";

const tagSchema = mongoose.Schema({
    keyword: {
        type: String,
        required: true
    }
});

export default mongoose.model("Tag", tagSchema);