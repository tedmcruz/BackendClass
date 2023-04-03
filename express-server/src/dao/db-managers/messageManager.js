import fs from "fs";
import { markAsUntransferable } from "worker_threads";
import { dbFileConfiguration } from "../index.js";
import messageModel from "../models/messageModel.js";

export default class DbMessageManager {
    // #nextId = 0;
    #path = "./src/server/Messages.json";

    constructor(path){
        // path = this.#path;
        this.path = path;
    }

    // Get Messages

    async getMessages() {
    
    const fileConfiguration = dbFileConfiguration.persistenceType;
    // console.log(fileConfiguration);
    try{
        if (fileConfiguration === "db"){
            console.log("Before getMessages")
            const messages = await messageModel.find().lean();
            // return messages;
            return {result:"success", payload:messages};

        }
    }catch (e){
        return {result:"error", payload:e};
    }

    // try {
    //     let messages = await fs.promises.readFile(this.#path,"utf-8");
    //     messages = JSON.parse(messages);
    //     return messages;
    // }   catch (emptyMessagesFile) {
    //     return [];
    // }
    }

    // Add Message

    async addMessage(userName, userMessage){
    
    const fileConfiguration = dbFileConfiguration.persistenceType;
    // userName = JSON.stringify(userName)
    // userMessage = JSON.stringify(userMessage)
    // console.log("Before try add message username ="+userName)
    // console.log("Before try add message usermessage ="+userMessage)

        try{
            if (fileConfiguration === "db"){
                if(!userName || !userMessage){
                    return {result:"error",payload:"Missing fields"}
                } 

                // console.log("Before addMessage")
                // messageModel.create({userName,userMessage});
                const addMessage = await messageModel.create({userName,userMessage});
                // console.log("After addMessage")
                return {result:"success", payload:addMessage};
            }
        }catch (e){
            return{result:"error", payload:e};
        }

        // const messages = await this.getMessages();

        // let id = JSON.stringify(messages.length +1); // = this.#nextId
        // let status = true;

        // const newMessage = {
        // id,
        // userName,
        // userMessage,
        // status
        // };

        // const addedMessages = [...messages, newMessage];
        // await fs.promises.writeFile(this.#path,JSON.stringify(addedMessages));
        // return addedMessages;
    }
}