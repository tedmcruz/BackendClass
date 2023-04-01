import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: {
        type: String
        },
    title: {
        type: String,
        required: true,
        },
    description: {
        type: String,
        required: true,
        },
    code: {
        type: String,
        unique: true,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        },
    status: {
        type: Boolean,
        },
    stock: {
        type: Number,
        },
    thumbnails: Array
});

const productModel = mongoose.model("products", productSchema);

export default productModel;