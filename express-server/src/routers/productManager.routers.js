import {Router, json} from "express";
// import ProductManager from "../app/productManager.js";
import {ProductManager} from "../dao/index.js";
// import productModel from "../dao/models/productModel.js";

const productManagerRouter = Router();
const productManager = new ProductManager;
productManagerRouter.use(json());

productManagerRouter.get("/", async (req,res) =>{
    const {limit} = req.query;
    try{
    const products = await productManager.getProducts(limit);
    console.log(products.payload)
    res.send(products.payload);
    } catch (e){
        res.status(500).send({result:"error", payload:e});
    }
});

productManagerRouter.get("/:pid", async (req,res)=>{
    try{    
        const { pid } = req.params;
        const productById = await productManager.getProductById(pid);
        res.send(productById);
    } catch (e){
        res.send({result:"error",payload:e})
    }
});

productManagerRouter.post("/",async (req,res) =>{
    let thumbnails = [];
    const {title, description, code, price, stock, category} = req.body;

    try{
        const addProduct = await productManager.addProduct(title, description, code, price, stock, category,thumbnails);
        res.send(addProduct.payload)

    }catch (e){
        res.status(500).send({result:"error", payload:e});
    }
});

productManagerRouter.put("/:pid", async (req,res)=>{
    
    const { pid } = req.params;
    let thumbnails = [];
    const {title, description, code, price, stock, category} = req.body;
    
    try{
        const updateProduct = await productManager.updateProduct(pid, title, description, code, price, stock, category,thumbnails)
        res.send(updateProduct.payload);
        
    }catch (e){
        res.status(500).send({result:"error", payload:e});
    }
});

productManagerRouter.delete("/:pid", async (req,res)=>{
    
    const { pid } = req.params;

    try{
        const deleteProduct = await productManager.deleteProduct(pid);
        res.send(deleteProduct);
    }catch (e){
        res.status(500).send({result:"error", payload:e});
    }
});

export default productManagerRouter;