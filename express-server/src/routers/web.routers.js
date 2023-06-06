import {Router} from "express";
import { methodOfAuthentication } from "./authentication.routers.js";
import { authenticateToken } from "../utils.js";

const router = Router();

router.get("/",(req,res)=>{
    res.render("home")
})

router.get("/login",(req,res)=>{
    // req.session.user = "testUser";
    res.render("login")
})

router.get("/signup",(req,res)=>{
    res.render("signup",{
        
    })
})

if (methodOfAuthentication == "authPassport"){

    router.get("/profile", async (req,res)=>{
        const user = await req.session.user;
        // console.log(user)

        if(!user){

            res.redirect("/login")
            
        } else {
            const first_name = user.first_name;
            const last_name = user.last_name;
            const age = user.age;
            const email = user.email;

            // console.log(user)
            res.render("profile",{
                first_name,
                last_name,
                age,
                email,
            })
        }
    })


    router.get("/current", async (req,res)=>{
        const user = await req.session.user;
        // console.log(user)

        if(!user){

            res.redirect("/login")
            
        } else {
            const first_name = user.first_name;
            const last_name = user.last_name;
            const age = user.age;
            const email = user.email;

            // console.log(user)
            res.render("current",{
                first_name,
                last_name,
                age,
                email,
            })
        }
    })

    router.get("/logout",(req,res)=>{
        req.session.destroy((e) => {
            if (e) {
              return console.error('Error destroying session:', e);
            } else {
            res.redirect('/login');
            }
        });
    });
}

if (methodOfAuthentication == "authJWT"){
    router.get("/current", authenticateToken, async (req,res)=>{
        // console.log(user)

        if(!user){

            res.redirect("/login")
            
        } else {
            const first_name = user.first_name;
            const last_name = user.last_name;
            const age = user.age;
            const email = user.email;

            // console.log(user)
            res.render("current",{
                first_name,
                last_name,
                age,
                email,
            })
        }
    })

    router.get("/profile", (req,res)=>{
        // res.json({message:"Profile Data"})
        // res.json({message:req.user})
        res.json({message:accessToken})
    })
}

export {router as WebRouter};

