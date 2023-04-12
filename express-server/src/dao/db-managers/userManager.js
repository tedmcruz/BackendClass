import userModel from "../models/userModel.js";

export default class DbUserManager {

    constructor(path){
        this.path = path;
    }

    // Get Users

    async getUsers(limit) {
        try{
        const users = await userModel.find().lean();
        if (!limit){
            return {result:"success", payload:users};
        }
        const usersLimit = users.slice(0, limit);
        return {result:"success", payload:usersLimit};
        }catch (e) {
            return {result:"error", payload: e}
        }
    }

    // Get User by Email and Password

    async getUserByEmailAndPassword(email,password){
       
        try{
            const searchedUser = await userModel.find({email,password}).lean();
            // console.log(searchedUser);
            return searchedUser;
        } catch (e){
            return {result:"error",payload: e}
        }
        
    }
    
    // Add User

    async createUser(email,password,first_name, last_name, age){
        
        try{
            if(!email || !password || !first_name || !last_name || !age ){
                return {result:"error",payload:"Missing fields"}
            } 

            let role;
                if(email==="adminCoder@coder.com"){
                    role = "admin";
                } else {
                    role = "user";
                }

            const createUser = await userModel.create({email, password,role,first_name, last_name, age});

            return {result:"success", payload:createUser};
            
        }catch (e){
            return{result:"error", payload:e};
        }
    }
    
    // Update/Modify User

    async updateUser(email, password){
        try{
            if(!email || !password ){
                return ({result:"error",payload:"Missing fields"})
            } 
            const updateUser = await userModel.findOneAndUpdate(
                {email},
                {password,role,first_name, lasta_name, age},
                {new: true},
            )
            return {result:"success", payload:updateUser};
        } catch (e) {
            return {result:"error",payload:e}
        }
    }

    // Delete User

    async deleteUser(email){
        try{
            const deleteUser = await userModel.deleteOne(
                {email}
            );

            return ({result:"success", payload:deleteUser});
        }catch (e){
            return ({result:"error", payload:e});
        }
    }
}