import {Router, json} from "express";
import {CartManager} from "../dao/index.js";

const cartManagerRouter = Router();
const cartManager = new CartManager;
cartManagerRouter.use(json());

cartManagerRouter.get("/", async (req,res) =>{
    const {limit} = req.query;
    try{
    const carts = await cartManager.getCarts(limit);
    res.send(carts.payload);
    } catch (e){
        res.status(500).send({result:"error", payload:e});
    }
});

cartManagerRouter.get("/:cid", async (req,res)=>{
    try{    
        const { cid } = req.params;
        const cartById = await cartManager.getCartById(cid);
        res.send(cartById);
    } catch (e){
        res.send({result:"error",payload:e})
    }
});


cartManagerRouter.post("/", async (req,res) =>{
    const {cartId,title,products}= req.body;

    try{
        const createCart = await cartManager.createCart(cartId,title,products);
        res.send(createCart.payload)
    } catch (e){
        res.status(500).send({result:"error", payload:e});
    }
});

cartManagerRouter.post("/:cid/product/:pid", async (req,res) =>{

    const {cid, pid} = req.params;
    const {quantity} = req.body;

    try{
            const addProductToCart = await cartManager.addProductToCart(cid,pid,quantity);
            res.status(201).send({result:"success", payload:addProductToCart});
    }catch (e){
        res.status(500).send({result:"error", payload:e});
    }
});

export default cartManagerRouter;