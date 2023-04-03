import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        },
    userMessage: {
        type: String,
        required: true,
        },
        
});

const messageModel = mongoose.model("messages", messageSchema);

export default messageModel;