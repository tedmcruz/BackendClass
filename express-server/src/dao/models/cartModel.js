import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    cartId: {
        type: String,
        required: true,
        unique: true,
        },
    title: {
        type: String
    },
    products: {
        type: Array,
        default: [],
    },
});

const cartModel = mongoose.model("carts", cartSchema);

export default cartModel;