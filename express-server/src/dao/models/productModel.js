import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model("products", productSchema);

export default productModel;