import {Router} from "express";
import userModel from "../dao/models/userModel.js";
import { UserManager } from "../dao/index.js";
import passport from "passport";


const router = Router();
const usermanager = new UserManager();

router.post(
    "/signup", 
    passport.authenticate("signup",{
        failureRedirect: "/api/sessions/signup-failed"
    }),

    async (req,res)=>{


    // const {email, password, first_name, last_name, age} = req.body;

    // try{
    //     if(!email || !password || !first_name || !last_name || !age){
    //         res.send("Missing Fields")
    //     } else{

    //     const newUser = await usermanager.createUser(email,password,first_name, last_name, age);
        
    //     req.session.email=newUser.email;
    //     // res.send("User logged in")
    //     console.log (newUser)
        res.redirect("/profile")
    //     }
    // } catch (e){
    //     console.log(e);
    // }
})

router.post("/signup-failed",async (req,res) =>{
    console.log("Registration Failed");

    res.status(500).send({error: "Registration Failed"});
})

router.post(
    "/login",
    passport.authenticate("login",{
        failureRedirect: "/api/sessions/login-failed"
    }),
    
    async (req,res) =>{
        if (!req, user){
            return res.status(401).send({error:"Invalid credentials"})
        }
        req.session.userId = req.user._id;

        res.redirect("/profile");

    // const {email,password} = req.body;
    // let authentication;

    // try{
    //     if(!email||!password){
    //         res.send("Missing Fields")
    //     } else {

    //         const loginUser = await usermanager.getUserByEmailAndPassword(email,password);
    //         // console.log(loginUser)
    //         // let printEmail = loginUser[0].email
    //         // console.log(loginUser[0].email)
    //         if(loginUser.length===0 || loginUser.result === 'error'){
    //             authentication = false;
    //             // alert("Combination of user and passwrod error.")
    //             res.render("login",{
    //                 isAuthenticated:authentication,
    //             })
    //         } else {
    //             // req.session.email = loginUser[0].email;
    //             req.session.user = loginUser;

    //             // res.cookie('session_id', `${req.session.id}|${email}`, { maxAge: 3600000 });
    //             res.redirect("/products")
    //         }
    //     }
    // }catch (e){
    //     res.status(500).send({result:"error", payload:e});
    // }
});

router.post("/login-failed",async (req,res) =>{
    console.log("Login Failed");

    res.status(500).send({error: "Login Failed"});
})

export {router as AuthenticationRouter};