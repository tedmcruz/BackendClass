import {Router} from "express";
import { methodOfAuthentication } from "./authentication.routers.js";
import { authenticateToken } from "../utils.js";
import nodemailer from "nodemailer";

const router = Router();
const transport = nodemailer.createTransport({
    service:"gamil",
    port:587,
    auth:{
        user:"do.not.reply.passcode.reset@gmail.com",
        pass:"zqozmihizevlyiml"
    }
})

router.get("/testEmail",async(req,res)=>{
    let result = await transport.sendMail({
        from:"Coder Tests <do.not.reply.passcode.reset@gmail.com>",
        to:"tedcruz@live.com",
        subject:"Test Email",
        html:`
        <div>
            <h1> This is a Test! </h1>
        </div>
        `,
        attachments:[]
    })
})

router.get("/resetPassword",(req,res)=>{
    res.render("mail",{
        
    })
})

export {router as MailRouter};