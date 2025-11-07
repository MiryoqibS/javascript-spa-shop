import mongoose from "mongoose";
import { ENV } from "../config/ENV.js";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatarUrl: {
        type: String,
        default: `${ENV.API_URL}/storage/avatars/default.webp`,
    },
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            required: true,
        }
    ],
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        required: true,
    },
    verificationLink: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,

    toObject(doc, ret) {
        ret.id = ret._id;
        delete ret.id;
        delete ret.verificationCode;
        delete ret.password
        return ret;
    },
    toJSON(doc, ret) {
        ret.id = ret._id;
        delete ret.id;
        delete ret.verificationCode;
        delete ret.password
        return ret;
    }
});

export const UserModel = mongoose.model("User", UserSchema);