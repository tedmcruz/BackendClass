import {Router, json} from "express";
// import ProductManager from "../app/productManager.js";
import {ProductManager} from "../dao/index.js";

const productManagerRouter = Router();
const productManager = new ProductManager;
productManagerRouter.use(json());

productManagerRouter.get("/", async (req,res) =>{
    await productManager.getProducts();
    const products = await productManager.getProducts();
    const {limit} = req.query;
    if (!limit){
        return res.send(products);
    }
    const productsLimit = products.slice(0, limit);
    res.send(productsLimit);
});

productManagerRouter.get("/:pid", async (req,res)=>{
    const { pid } = req.params;
    const productById = await productManager.getProductById(pid);
    res.send(productById);
});

productManagerRouter.post("/",async (req,res) =>{

    let thumbnails = [];
    const {title, description, code, price, stock, category} = req.body;
    const addProduct = await productManager.addProduct(title, description, code, price, stock, category, thumbnails);
    res.send(addProduct);
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