import {Router, json} from "express";

let products = [];
let id = 0;

const productsRouter = Router();
productsRouter.use(json());

productsRouter.get("/",(req,res) =>{
    const {limit} = req.query;
    if (!limit){
        return res.send(products);
    }
    const productsLimit = products.slice(0, limit);

    res.send(productsLimit);
});

productsRouter.get("/:pid", (req,res)=>{
    const { pid } = req.params;
    let productById = products.find(p => p.id === pid);
    // console.log(productById);
    res.send(productById);
});


productsRouter.post("/",(req,res) =>{

    id = JSON.parse(id) + 1;
    id = JSON.stringify(id);
    let status = true;
    let thumbnails = [];

    const {title, description, code, price, stock, category} = req.body;

    const newProduct = {id, title, description, code, price, status, stock, category, thumbnails};

    products = [...products, newProduct];

    res.send(newProduct);
});

productsRouter.put("/:pid", (req,res)=>{
    
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

productsRouter.delete("/:pid", (req,res)=>{
    
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
    // console.log(productById);
    const updatedProduct = {id, title, description, code, price, status, stock, category, thumbnails};

    const updatedProductsById = products.map((p) => 
    p.id === pid ? updatedProduct : p
    );

    products = updatedProductsById;
    
    res.send(updatedProductsById);
});

export default productsRouter;