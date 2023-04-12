import {Router} from "express";
import userModel from "../dao/models/userModel.js";
import { UserManager } from "../dao/index.js";


const router = Router();
const usermanager = new UserManager();

router.post("/signup", async (req,res)=>{

    const {email, password, first_name, last_name, age} = req.body;

    try{
        if(!email || !password || !first_name || !last_name || !age){
            res.send("Missing Fields")
        } else{

        const newUser = await usermanager.createUser(email,password,first_name, last_name, age);
        
        req.session.email=newUser.email;
        // res.send("User logged in")
        console.log (newUser)
        res.redirect("/profile")
        }
    } catch (e){
        console.log(e);
    }
})

router.post("/login",async (req,res) =>{
    const {email,password} = req.body;
    let authentication;

    try{
        if(!email||!password){
            res.send("Missing Fields")
        } else {
            const loginUser = await usermanager.getUserByEmailAndPassword(email,password);
            // let printEmail = loginUser[0].email
            // console.log(loginUser[0].email)
            if(loginUser.length===0){
                authentication = false;
                // alert("Combination of user and passwrod error.")
                res.render("login",{
                    isAuthenticated:authentication,
                })
            } else {
                // req.session.email = loginUser[0].email;
                req.session.user = loginUser;

                // res.cookie('session_id', `${req.session.id}|${email}`, { maxAge: 3600000 });
                res.redirect("/products")
            }
        }
    }catch (e){
        res.status(500).send({result:"error", payload:e});
    }
});

export {router as AuthenticationRouter};