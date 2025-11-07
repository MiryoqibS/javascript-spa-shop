import mongoose from "mongoose";

// == Схема продукта (кроссовок) ==
const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    sizes: {
        type: [Number],
        required: true,
    },
}, {
    timestamps: true,
    
    toObject(doc, ret) {
        ret.id = ret._id;
        delete ret.id;
        return ret;
    },
    toJSON(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        return ret;
    }
});

export const ProductModel = mongoose.model("Product", ProductSchema);