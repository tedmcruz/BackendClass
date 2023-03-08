import {Router, json} from "express";
import ProductManager from "../app/productManager.js";

// let products = [];
let id = 0;

const productManagerRouter = Router();
const productManager = new ProductManager;
productManagerRouter.use(json());

productManagerRouter.get("/", async (req,res) =>{
    const products = await productManager.getProducts();
    res.send(products);
    console.log(products);
});

productManagerRouter.get("/:pid", async (req,res)=>{
    const { pid } = req.params;
    let productById = products.find(p => p.id === pid);
    res.send(productById);
});


productManagerRouter.post("/",async (req,res) =>{

    id = JSON.parse(id) + 1;
    id = JSON.stringify(id);
    let status = true;
    let thumbnails = [];

    const {title, description, code, price, stock, category} = req.body;

    const newProduct = {id, title, description, code, price, status, stock, category, thumbnails};

    products = [...products, newProduct];

    res.send(newProduct);
});

productManagerRouter.put("/:pid", async (req,res)=>{
    
    const { pid } = req.params;
    let id = pid;
    let status = true;
    let thumbnails = [];

    const {title, description, code, price, stock, category} = req.body;

    const updatedProduct = {id, title, description, code, price, status, stock, category, thumbnails};

    const updatedProductsById = products.map((p) => 
    p.id === pid ? updatedProduct : p
    );

    products = updatedProductsById;
    
    res.send(updatedProductsById);
});

productManagerRouter.delete("/:pid", async (req,res)=>{
    
    const { pid } = req.params;
    let productById = products.find(p => p.id === pid);
    let id = pid;
    let title = `${productById.title} was the title of the product with this ID`;
    let description ="";
    let code = `${productById.code} was the code of the product with this ID`;
    let price = "";
    let status = "";
    let stock ="";
    let category ="";
    let thumbnails = "";

    const updatedProduct = {id, title, description, code, price, status, stock, category, thumbnails};

    const updatedProductsById = products.map((p) => 
    p.id === pid ? updatedProduct : p
    );

    products = updatedProductsById;
    
    res.send(updatedProductsById);
});

export default productManagerRouter;