import {Router, json} from "express";
// import CartManager from "../app/cartManager.js";
import {CartManager, dbFileConfiguration} from "../dao/index.js";
import cartModel from "../dao/models/cartModel.js";

const cartManagerRouter = Router();
const cartManager = new CartManager;
cartManagerRouter.use(json());
const fileConfiguration = dbFileConfiguration.persistenceType;

cartManagerRouter.get("/", async (req,res) =>{
    // await cartManager.getCarts();
    const {limit} = req.query;

    try{
        if (fileConfiguration === "db"){
            const carts = await cartModel.find();
            if (!limit){
                return res.send({result:"success", payload:carts});
            }
            const cartsLimit = carts.slice(0, limit);
            res.send({result:"success", payload:cartsLimit});
        } else if (fileConfiguration === "file"){
            const carts = await cartManager.getCarts();
            if (!limit){
                return res.send(carts);
            }
            const cartsLimit = carts.slice(0, limit);
        
            res.send(cartsLimit);
        }
    }catch (e){
        res.status(500).send({result:"error", payload:e});
    }
});

cartManagerRouter.get("/:cid", async (req,res)=>{
    const { cid } = req.params;
    let cartById = await cartManager.getCartById(cid);
    res.send(cartById);
});


cartManagerRouter.post("/", async (req,res) =>{
    const {cartId,title,products}= req.body;
    try{
        if (fileConfiguration === "db"){
            const createCart = await cartModel.create({cartId,title,products});
            res.status(201).send({result:"success", payload:createCart});
        } else if (fileConfiguration === "file"){
            const createCart = await cartManager.createCart();
            res.send(createCart);
        }
    }catch (e){
        res.status(500).send({result:"error", payload:e});
    }
});

cartManagerRouter.post("/:cid/product/:pid", async (req,res) =>{

    const {cid, pid} = req.params;
    const {quantity} = req.body;

    try{
        if (fileConfiguration === "db"){
            const addProductToCart = await cartModel.findById(cid);
            addProductToCart.products.push({pid,quantity});
            addProductToCart.save();
            res.status(201).send({result:"success", payload:addProductToCart});
        } else if (fileConfiguration === "file"){
            const addProductToCart = await cartManager.addProductToCart(cid,pid,quantity);
            res.send(addProductToCart);
        }
    }catch (e){
        res.status(500).send({result:"error", payload:e});
    }
});

export default cartManagerRouter;