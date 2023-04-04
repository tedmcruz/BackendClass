import productModel from "../models/productModel.js";

export default class DbProductManager {

    constructor(path){
        this.path = path;
    }

    // Get Products

    async getProducts(limit) {
        try{
        const products = await productModel.find().lean();
        if (!limit){
            return {result:"success", payload:products};
        }
        const productsLimit = products.slice(0, limit);
        return {result:"success", payload:productsLimit};
        }catch (e) {
            return {result:"error", payload: e}
        }
    }

    // Get Product by ID

    async getProductById(pid){
       
        try{
            const searchedProduct = await productModel.find({_id:pid}).lean();
            console.log(searchedProduct);
            return searchedProduct;
        } catch (e){
            return {result:"error",payload: e}
        }
        
    }
    
    // Add Product

    async addProduct(title, description, code, price, stock, category, thumbnails){
        try{
            if(!title || !description || !code || !price){
                return {result:"error",payload:"Missing fields"}
            } 
            const addProduct = await productModel.create({title, description, code, price, stock, category,thumbnails});
            return {result:"success", payload:addProduct};
            
        }catch (e){
            return{result:"error", payload:e};
        }
    }
    
    // Update/Modify Product

    async updateProduct(pid, title, description, code, price, stock, category,thumbnails){
        try{
            if(!title || !description || !code || !price){
                return ({result:"error",payload:"Missing fields"})
            } 
            const updateProduct = await productModel.findOneAndUpdate(
                {_id: pid},
                {title, description,code,price},
                {new: true},
            )
            return {result:"success", payload:updateProduct};
        } catch (e) {
            return {result:"error",payload:e}
        }
    }

    // Delete Product

    async deleteProduct(pid){
        try{
            const deleteProduct = await productModel.deleteOne(
                { _id: pid}
            );

            return ({result:"success", payload:deleteProduct});
        }catch (e){
            return ({result:"error", payload:e});
        }
    }
}