import {Router} from "express";

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

router.get("/profile",(req,res)=>{
    const user = req.session.user;


    if(!user){

        res.redirect("/login")
        
    } else {
        const first_name = user[0].first_name;
        const last_name = user[0].last_name;
        const age = user[0].age;
        const email = user[0].email;

        console.log(user)
        res.render("profile",{
            first_name,
            last_name,
            age,
            email,
        })
    }
})

export {router as WebRouter};

