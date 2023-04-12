import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        },
    password: {
        type: String,
        required: true,
        },
    role:{
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
        
});

const userModel = mongoose.model("users", userSchema);

export default userModel;