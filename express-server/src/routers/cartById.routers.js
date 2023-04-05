import {Router, json} from "express";
import {CartManager} from "../dao/index.js";
import cartModel from "../dao/models/productModel.js";

const cartByIdRouter = Router();
const cartManager = new CartManager;
cartByIdRouter.use(json());

cartByIdRouter.get("/carts/:cid", async (req,res)=>{

    try{    
        const { cid } = req.params;
        const cartById = await cartManager.getCartById(cid);
        
        const productsJson = cartById[0].products;
        console.log(productsJson)
        
        res.render("cartById",{cartById,productsJson,});
    } catch (e){
        res.send({result:"error",payload:e})
    }
});

export default cartByIdRouter;