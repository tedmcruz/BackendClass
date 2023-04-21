import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/userModel.js";
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use(
        "register",
        new LocalStrategy(
            { passReqToCallback: true, usernameField: "email"},

            async (req, username, password, done) => {
                const {first_name, last_name, email, age} = req.body;

                try{
                    const user = await userModel.findOne({email:username});

                    if (user) {
                        console.log("Provided user exists");
                        return done(null, false);
                    }

                    const newUser = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: createHash(password),
                    };

                    const createdUser = await userModel.create(newUser);

                    return done(null,createdUser);
                } catch (e) {
                    return done(e);
                }
            }
        )
    )

    
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);

        done(null, user);
    })

    passport.use(
        "login",
        new LocalStrategy(
            { usernameField: "email"},

            async ( username, password, done) => {

                try{
                    const user = await userModel.findOne({email:username});

                    if (!user) {
                        console.log(`Provided user ${username} doesnot exists`);

                        return done(null, false);
                    }

                    if (!isValidPassword(user,password)){
                        
                        return done(null, false);
                    }

                    return done(null,user);

                } catch (e) {
                    return done(e);
                }
            }
        )
    )
}

export default initializePassport();

