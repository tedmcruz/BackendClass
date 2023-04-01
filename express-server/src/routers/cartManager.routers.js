import {Router, json} from "express";
// import CartManager from "../app/cartManager.js";
import {CartManager} from "../dao/index.js";

const cartManagerRouter = Router();
const cartManager = new CartManager;
cartManagerRouter.use(json());

cartManagerRouter.get("/", async (req,res) =>{
    await cartManager.getCarts();
    const carts = await cartManager.getCarts();
    const {limit} = req.query;
    if (!limit){
        return res.send(carts);
    }
    const cartsLimit = carts.slice(0, limit);

    res.send(cartsLimit);
});

cartManagerRouter.get("/:cid", async (req,res)=>{
    const { cid } = req.params;
    let cartById = await cartManager.getCartById(cid);
    res.send(cartById);
});


cartManagerRouter.post("/", async (req,res) =>{

    const createCart = await cartManager.createCart();
    res.send(createCart);
});

cartManagerRouter.post("/:cid/product/:pid", async (req,res) =>{

    const {cid} = req.params;
    const {pid} = req.params;
    const {quantity} = req.body;
    const addProductToCart = await cartManager.addProductToCart(cid,pid,quantity);
    res.send(addProductToCart);
});

export default cartManagerRouter;