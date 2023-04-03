import {Router, json} from "express";
// import ProductManager from "../app/productManager.js";
import {MessageManager, dbFileConfiguration} from "../dao/index.js";
import messageModel from "../dao/models/messageModel.js";

const messageManagerRouter = Router();
const messageManager = new MessageManager;
messageManagerRouter.use(json());
const fileConfiguration = dbFileConfiguration.persistenceType;

messageManagerRouter.get("/chat", async (req,res) =>{
    const messages = await messageManager.getMessages();
    const messagesPayload=messages.payload;
    // messages = messages.payload
    // messages = JSON.stringify(messages.payload)
    // messages = messages.userName;
    // console.log(messagesPayload)
    // let userName, userMessage = req.body;
    const user = {
        firstName:"Coder",
        lastName:"House",
        role:"admin",
    };

    res.render("chat",{
        user,
        messagesPayload,
        // messages,
        isAdmin: user.role === "admin",
        style: "index.css",
    });
});

messageManagerRouter.post("/",async (req,res) =>{
    // const {userName, userMessage} = req.body;

    // const addMessage = await messageManager.addMessage(userName,userMessage);

    // return addMessage;

    // try{
    //     if (fileConfiguration === "db"){
    //         if(!userName || !userMessage){
    //             return res.status(400).send({result:"error",payload:"Missing fields"})
    //         } 
    //         const addMessage = await messageModel.create({userName, userMessage});
            
    //         res.status(201).send({result:"success", payload:addMessage});
    //     } else if (fileConfiguration === "file"){
    //         const addMessage = await messageManager.addMessage(userName, userMessage);
    //         res.send(addMessage);
    //     }
    // }catch (e){
    //     res.status(500).send({result:"error", payload:e});
    // }
});

export default messageManagerRouter;