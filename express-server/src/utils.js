import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const PRIVATE_KEY = "jwt-private-secret-key"

const generateToken = (user) => {
    const token = jwt.sign(user, PRIVATE_KEY,{
        expiresIn:"24h",
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

export const createHash = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (email, password) =>
    bcrypt.compareSync(password, email.password);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export { __filename, __dirname, generateToken, authenticateToken };