import {Router} from "express";
import userModel from "../dao/models/userModel.js";
import { UserManager } from "../dao/index.js";
import passport from "passport";
import { generateToken, authenticateToken} from "../utils.js";

const methodOfAuthentication = "authPassport"; // use "authJWT" for jwt and "authPassport" for passport
const router = Router();


if (methodOfAuthentication === "authPassport"){
    
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
            if (!req.user){
                return res.status(401).send({error:"Invalid credentials"});
            }

            req.session.user = req.user;
            // req.session.userId = req.user._id;
            // console.log(req.session.userId)

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

    router.get(
        "/github",
        passport.authenticate("github",{scope:["user:email"] }),
        async (req, res) => {

        }
    );

    router.get(
        "/github-callback",
        passport.authenticate("github",{failureRedirect:["/login"] }),
        async (req, res) => {
            req.session.user = req.user;
            
            res.redirect("/");
        }
    );

    router.post("/login-failed",async (req,res) =>{
        console.log("Login Failed");

        res.status(500).send({error: "Login Failed"});
    })
}

if (methodOfAuthentication === "authJWT"){

    router.post("/signup", (req,res)=>{
        const {email, password, first_name, last_name, age} = req.body;
        
        // const userExists = users.some((user) => user.email === email);
        const userExists = users.find((user) => user.email === email);
        if (userExists) return res.status(409).send("user already exists");

        // const newUser = {email, password, first_name, last_name, age};

        // users = [...users, newUser];
        users.push=(req.body);

        // const accessToken = generateToken({...newUser, password:undefined});
        const accessToken = generateToken({email, password, first_name, last_name, age});

        // res.send({satus:"ok", accessToken})
        res.redirect("/profile")
    });

    router.post("/login", (req,res)=>{
        const {email, password} = req.body;

        const user = users.find(
            (user) => user.email === email && user.password === password
        );
        
        if (!user) return res.status(401).send("Invalid credentials");

        const accessToken = generateToken(user);

        // res.send({status:"ok", accessToken});
        res.redirect("/profile")
    })
}

export {router as AuthenticationRouter, methodOfAuthentication};