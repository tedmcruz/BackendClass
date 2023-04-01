import {Router, json} from "express";
// import ProductManager from "../app/productManager.js";
import {ProductManager, dbFileConfiguration} from "../dao/index.js";
import productModel from "../dao/models/productModel.js";

const productManagerRouter = Router();
const productManager = new ProductManager;
productManagerRouter.use(json());
const fileConfiguration = dbFileConfiguration.persistenceType;

productManagerRouter.get("/", async (req,res) =>{
    try{
        if (fileConfiguration === "db"){
            const products = await productModel.find();
            res.send({result:"success", payload:products});
        } else if (fileConfiguration === "file"){
            const products = await productManager.getProducts();
            const {limit} = req.query;
            if (!limit){
                return res.send(products);
            }
            const productsLimit = products.slice(0, limit);
            res.send(productsLimit);
        }
    }catch (e){
        res.status(500).send({result:"error", payload:e});
    }
});

productManagerRouter.get("/:pid", async (req,res)=>{
    const { pid } = req.params;
    const productById = await productManager.getProductById(pid);
    res.send(productById);
});

productManagerRouter.post("/",async (req,res) =>{
    let thumbnails = [];
    const {title, description, code, price, stock, category} = req.body;

    try{
        if (fileConfiguration === "db"){
            if(!title || !description || !code || !price){
                return res.status(400).send({result:"error",payload:"Missing fields"})
            } 
            const addProduct = await productModel.create({title, description, code, price, stock, category,thumbnails});
            
            res.status(201).send({result:"success", payload:addProduct});
        } else if (fileConfiguration === "file"){
            const addProduct = await productManager.addProduct(title, description, code, price, stock, category, thumbnails);
            res.send(addProduct);
        }
    }catch (e){
        res.status(500).send({result:"error", payload:e});
    }
});

productManagerRouter.put("/:pid", async (req,res)=>{
    
    const { pid } = req.params;
    let thumbnails = [];
    const {title, description, code, price, stock, category} = req.body;
    const updateProduct = await productManager.updateProduct(pid, title, description, code, price, stock, category,thumbnails);
    res.send(updateProduct);
});

productManagerRouter.delete("/:pid", async (req,res)=>{
    
    const { pid } = req.params;
    const deleteProduct = await productManager.deleteProduct(pid);
    let updatedProducts = deleteProduct;
    res.send(updatedProducts);
});

export default productManagerRouter;