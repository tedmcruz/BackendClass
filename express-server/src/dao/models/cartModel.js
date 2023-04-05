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
    // FOR USE WITH POPULATE - PART 1 START

    // products:{
    //     type:[
    //         {
    //             product:
    //                 {
    //                 type: mongoose.Schema.Types.ObjectId,
    //                 ref: "products"
    //                 },
    //         },
    //     ],
        
    //     default:[],
    // },

    // FOR USE WITH POPULATE - PART 1 END

    // FOR USE WITHOUT POPULATE - PART 1 START
   
    products: {
        type: Array,
        default: [],
    },
   
    // FOR USE WITHOUT POPULATE - PART 1 END
});

// FOR USE WITH POPULATE - PART 2 START

// cartSchema.pre("findOne", function (){
//     this.populate("products.product")
// });

// FOR USE WITH POPULATE - PART 2 END

cartSchema.plugin(mongoosePaginate);

const cartModel = mongoose.model("carts", cartSchema);

export default cartModel;