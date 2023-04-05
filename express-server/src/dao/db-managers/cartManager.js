import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

export default class DbCartManager {
    
    constructor(path){
        this.path = path;
    }

    // Get Carts

    async getCarts(limit) {
        try{
            const carts = await cartModel.find().lean();
            if (!limit){
                return {result:"success", payload:carts};
            }
            const cartsLimit = carts.slice(0, limit);
            return {result:"success", payload:cartsLimit};
        }catch (e) {
            return {result:"error", payload: e}
        }
    }
    
    // Get Cart by ID

    async getCartById(cid){
        try{
            const searchedCart = await cartModel.find({_id:cid}).lean();
            console.log(searchedCart);
            return searchedCart;
        } catch (e){
            return {result:"error",payload: e}
        }
    }

    // Create Cart

    async createCart(cartId,title,products){
        try{
            if(!cartId){
                return {result:"error",payload:"Missing fields"}
            } 
            const createCart = await cartModel.create({cartId,title,products});
            return ({result:"success", payload:createCart});

        }catch (e){
            return{result:"error", payload:e};
        }
    }

    // Add Product to Cart

    async addProductToCart(cartId,productId,quantity){

        try{
            const addProductToCart = await cartModel.findById(cartId);

            const product = await productModel.findById(productId);
                if (!product) {
                return { result: "error", payload: "Product not found in database" };
                }

            const existingProduct = addProductToCart.products.find(product => product._id === productId);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                addProductToCart.products.push({_id:productId,quantity});
            }
            
            await addProductToCart.save();

            return ({result:"success", payload:addProductToCart});
        } catch (e){
            return ({result:"error", payload:e}); 
        }
    }

    // Delete Product From Cart

    async deleteProductFromCart(cartId,productId){
        console.log("deleteProductFromCart")
        try{
            const updatedCart = await cartModel.findOneAndUpdate(
                { _id: cartId },
                { $pull: { products: { _id:productId } } },
                { new: true }
            );
            return ({result:"success", payload:updatedCart});
        } catch (e){
            return ({result:"error", payload:e}); 
        }
    }

    // Update Products in Cart to new Format

    // async updateCart(cartId){
    //     try{
    //         if(!title || !description || !code || !price){
    //             return ({result:"error",payload:"Missing fields"})
    //         } 
    //         const updateProduct = await productModel.findOneAndUpdate(
    //             {_id: pid},
    //             {title, description,code,price},
    //             {new: true},
    //         )
    //         return {result:"success", payload:updateProduct};
    //     } catch (e) {
    //         return {result:"error",payload:e}
    //     }
    // }

    // Update Product Quantity in Cart

    async updateProductQuantityInCart(cartId, productId, productQuantity){
        try{
            if(!cartId || !productId || !productQuantity){
                return ({result:"error",payload:"Missing fields"})
            } 
            const updatedCart = await cartModel.findOneAndUpdate(
                { _id: cartId, "products._id": productId },
                { $set: { "products.$.quantity": productQuantity } },
                { new: true }
              );
            return ({result:"success", payload:updatedCart});
        } catch (e) {
            return {result:"error",payload:e}
        }
    }

    // Delete All Products in Cart

    async deleteAllProductsFromCart(cartId){
        console.log("deleteAllProductFromCart")
        try{
            if(!cartId){
                return ({result:"error",payload:"Missing fields"})
            } 
            console.log(cartId)
            const deleteAllProductsFromCart = await cartModel.findOneAndUpdate(
                { _id: cartId },
                { products:[]},
                { new: true }
            );
            console.log(deleteAllProductsFromCart)
            return ({result:"success", payload:deleteAllProductsFromCart});
        } catch (e) {
            return {result:"error",payload:"error dentro"}
        }
    }
}