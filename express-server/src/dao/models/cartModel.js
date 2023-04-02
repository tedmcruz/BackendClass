import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    cartId: {
        type: String
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