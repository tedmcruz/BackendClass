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

router.get("/profile", async (req,res)=>{
    const user = await req.session.user;
    console.log(user)

    if(!user){

        res.redirect("/login")
        
    } else {
        const first_name = user.first_name;
        const last_name = user.last_name;
        const age = user.age;
        const email = user.email;

        console.log(user)
        res.render("profile",{
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

export {router as WebRouter};

