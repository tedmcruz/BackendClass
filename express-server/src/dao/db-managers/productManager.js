import fs from "fs";
// import mongoose from "mongoose";
import productModel from "../models/productModel.js";

export default class DbProductManager {
    // #nextId = 0;
    #path = "./src/server/Products.json";

    constructor(path){
        // path = this.#path;
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
            return {result:"error in productManager", payload: e}
        }
    }

    // Get Product by ID

    async getProductById(productId){
        const products = await this.getProducts();
       
        let searchedProduct = products.find(p => p.id === productId);

        if (!searchedProduct) {
            return `Product with Product ID ${productId} doesn't exist.`
        }

        return searchedProduct;
    }

    // Add Product

    async addProduct(title, description, code, price, stock, category, thumbnails){
        try{
            const products = await this.getProducts();
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

    // Delete Product detail by leave digital footprint

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