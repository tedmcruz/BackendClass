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
        res.render("cartById",{cartById});
    } catch (e){
        res.send({result:"error",payload:e})
    }
});

export default cartByIdRouter;