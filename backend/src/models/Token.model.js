import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toObject(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        return ret;
    },
    toJSON(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        return ret;
    }
});

export const TokenModel = mongoose.model("Token", TokenSchema);