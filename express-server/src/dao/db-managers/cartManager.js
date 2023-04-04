import cartModel from "../models/cartModel.js";

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
            addProductToCart.products.push({productId,quantity});
            addProductToCart.save();
            return ({result:"success", payload:addProductToCart});
        } catch (e){
            return ({result:"error", payload:e}); 
        }
    }
}