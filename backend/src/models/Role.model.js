import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
});

export const RoleModel = mongoose.model("Role", RoleSchema);