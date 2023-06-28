import {Router} from "express";
import { methodOfAuthentication } from "./authentication.routers.js";
import { authenticateToken } from "../utils.js";
import nodemailer from "nodemailer";

const router = Router();

router.get("/testEmail",(req,res)=>{
    res.render("mail",{
        
    })
})

router.get("/resetPassword",(req,res)=>{
    res.render("mail",{
        
    })
})

export {router as MailRouter};