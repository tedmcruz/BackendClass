import {Router, json} from "express";
import {CartManager} from "../dao/index.js";

const cartManagerRouter = Router();
const cartManager = new CartManager;
cartManagerRouter.use(json());

// Get Carts

cartManagerRouter.get("/", async (req,res) =>{
    const {limit} = req.query;
    try{
    const carts = await cartManager.getCarts(limit);
    res.send(carts.payload);
    } catch (e){
        res.status(500).send({result:"error", payload:e});
    }
});

// Get Cart by ID

cartManagerRouter.get("/:cid", async (req,res)=>{
    try{    
        const { cid } = req.params;
        const cartById = await cartManager.getCartById(cid);
        res.send(cartById);
    } catch (e){
        res.send({result:"error",payload:e})
    }
});

// Create Cart

cartManagerRouter.post("/", async (req,res) =>{
    const {cartId,title,products}= req.body;

    try{
        const createCart = await cartManager.createCart(cartId,title,products);
        res.send(createCart.payload)
    } catch (e){
        res.status(500).send({result:"error", payload:e});
    }
});

// Add Product to Cart

cartManagerRouter.post("/:cid/product/:pid", async (req,res) =>{

    const {cid, pid} = req.params;
    const {quantity} = req.body;

    try{
            const addProductToCart = await cartManager.addProductToCart(cid,pid,quantity);
            res.status(201).send(addProductToCart.payload);
    }catch (e){
        res.status(500).send({result:"error", payload:e});
    }
});

// Delete Product From Cart

cartManagerRouter.delete("/:cid/product/:pid", async (req,res) =>{

    const {cid, pid} = req.params;

    try{
        const updatedCart = await cartManager.deleteProductFromCart(cid,pid);
        res.status(201).send(updatedCart.payload);
    }catch (e){
        res.status(500).send({result:"error", payload:e});
    }
});

// Update Cart with Product in new Format

// cartManagerRouter.put("/:cid", async (req,res)=>{
    
//     const { cid } = req.params;
//     const {title, description, code, price, stock, category} = req.body;
    
//     try{
//         const updateProduct = await productManager.updateProduct(pid, title, description, code, price, stock, category,thumbnails)
//         res.send(updateProduct.payload);
        
//     }catch (e){
//         res.status(500).send({result:"error", payload:e});
//     }
// });

// Update Product Quantity in Cart

cartManagerRouter.put("/:cid/product/:pid", async (req,res)=>{
    
    const { cid, pid } = req.params;
    const {quantity} = req.body;
    
    try{
        const updatedCart = await cartManager.updateProductQuantityInCart(cid, pid, quantity)
        res.send(updatedCart.payload);
        
    }catch (e){
        res.status(500).send({result:"error", payload:e});
    }
});

// Delete All Products in Cart

cartManagerRouter.delete("/:cid", async (req,res)=>{
    
    const { cid } = req.params;
    
    try{
        const deletedCart = await cartManager.deleteAllProductsFromCart(cid)
        res.send(deletedCart.payload);
        
    }catch (e){
        res.status(500).send({result:"error", payload:e});
    }
});

export default cartManagerRouter;