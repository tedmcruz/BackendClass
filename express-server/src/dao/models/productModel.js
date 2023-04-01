import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    code: {
        type: String,
        unique: true,
    },
    price: Number,
    status: Boolean,
    stock: Number,
    thumbnails: Array
});

const productModel = mongoose.model("products", productSchema);

export default productModel;