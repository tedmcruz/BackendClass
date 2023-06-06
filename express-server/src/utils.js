import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {faker} from "@faker-js/faker"

//BCRYPT

export const createHash = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (email, password) =>
    bcrypt.compareSync(password, email.password);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//JWT

const PRIVATE_KEY = "jwt-private-secret-key";

const generateToken = (user) => {
    const token = jwt.sign(user, PRIVATE_KEY,{
        expiresIn:"180s",
    });
    return token;
};

const authenticateToken = (req,res,next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token,PRIVATE_KEY,(err,payload) =>{
        if (err) return res.sendStatus(403);
        req.user=payload;

        next();
    });
};

//FAKER

// faker.locale = "en_US";

const generateProduct = () => {
    console.log("generateProductTest")
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(), 
        description: faker.commerce.productDescription(), 
        code: faker.random.numeric(), 
        price: faker.commerce.price(), 
        stock:faker.random.numeric(1), 
        category:faker.commerce.department(), 
        thumbnails: faker.image.image()
    }
}

export { __filename, __dirname, generateToken, authenticateToken, generateProduct };