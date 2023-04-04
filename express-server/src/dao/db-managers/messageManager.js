import messageModel from "../models/messageModel.js";

export default class DbMessageManager {

    constructor(path){
        this.path = path;
    }

    // Get Messages

    async getMessages() {

    try{

        const messages = await messageModel.find().lean();
        return {result:"success", payload:messages};

    }catch (e){
        return {result:"error", payload:e};
    }
    }

    // Add Message

    async addMessage(userName, userMessage){

        try{
            if(!userName || !userMessage){
                return {result:"error",payload:"Missing fields"}
            } 
            const addMessage = await messageModel.create({userName,userMessage});
            return {result:"success", payload:addMessage};
            
        }catch (e){
            return{result:"error", payload:e};
        }
    }
}