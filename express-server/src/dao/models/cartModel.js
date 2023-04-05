import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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

cartSchema.plugin(mongoosePaginate);

const cartModel = mongoose.model("carts", cartSchema);

export default cartModel;