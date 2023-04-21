import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";

export const createHash = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (email, password) =>
    bcrypt.compareSync(password, email.password);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// export default __dirname;
export { __filename, __dirname };