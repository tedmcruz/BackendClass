import passport from "passport";
import local from "passport-local";
import GithubStrategy from "passport-github2";
import userModel from "../dao/models/userModel.js";
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use(
        "signup",
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
                        role : "user",
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

                    if (!isValidPassword(user,password)) return done(null, false);

                    return done(null,user);

                } catch (e) {
                    return done(e);
                }
            }
        )
    )

    passport.use(
        "github",
        new GithubStrategy(
            { 
                clientID: "Iv1.93a28ce73041325f",
                clientSecret: "1fcd9d9b4a7b73790d797a8defaeec1940d26f6e",
                callbackURL: "http://localhost:8080/api/sessions/github-callback",            
            },

            async (accessToken, refreshToken, profile, done) => {
                
                try{
                    console.log(profile)
                    const user = await userModel.findOne({email:profile._json.email});
                    let role;

                    if(profile._json.email==="tedcruz@live.com"){
                        role = "admin"
                    } else {
                        role = "user"
                    }

                    if (!user) {
                        const newUser = {
                            first_name: profile._json.name,
                            last_name: null,
                            email:profile._json.email,
                            age:null,
                            role : role,
                            // password: null,
                        };

                        const createdUser = await userModel.create(newUser);

                        return done(null,createdUser);
                    } else {
                        return done(null, user)
                    }

                } catch (e) {
                    return done(e);
                }
            }
        )
    )
}

export default initializePassport;

