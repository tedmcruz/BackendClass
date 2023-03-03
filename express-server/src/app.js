import express from "express";
/* // fs IS USED IN OPTION 2 TO CREATE PRODUCTS VARIABLE 
import fs from "fs";
*/ 
// import ProductManager from "./productManager.js";
import { Router } from "express";
import productsRouter from "./routers/products.routers.js";
import cartsRouter from "./routers/carts.routers.js";

/* // OPTION 1 TO CREATE PRODUCTS VARIABLE = USING EXTERNAL CODE
import { createRequire } from "module";
const require = createRequire(import.meta.url); // construct the require method
const products =  require("./Products.json") // use the require method
*/

/* // OPTION 2 TO CREATE PRODUCTS VARIABLE = ASSIGN THROUGH DIRECT PULL FORM "Prodcuts.json" FILE
const products = JSON.parse(await fs.promises.readFile("./Products.json","utf-8"));
*/

/* // OPTION 3 TO CREATE PRODUCTS VARIABLE = ASSIGN PULLING FROM "productManager.js" FILE
const productManager = new ProductManager("./Products.json");
const products = await productManager.getProducts();
*/

// const productManager = new ProductManager("./Products.json");
// const products = await productManager.getProducts();

const app = express();
const router = Router();

/* // CONST PRODUCTMANAGER AND PRODUCTS TP TEST SERVER 

    const productManager = new ProductManager();

    let products = [
        {id:"1",name:"producto1",description:"description",price:"10",thumbnail:"thumbnail",code:"100",stock:"1000"},
        {id:"2",name:"producto2",description:"description",price:"20",thumbnail:"thumbnail",code:"200",stock:"2000"},
        {id:"3",name:"producto3",description:"description",price:"30",thumbnail:"thumbnail",code:"300",stock:"3000"}
    ]
*/

app.get("/products", (req,res)=>{
    const {limit} = req.query;
    if (!limit){
        return res.send(products);
    }
    const productsLimit = products.slice(0, limit);
    /* // ALTERNATIVE TO LIMIT OPTIONS
    // res.send(products.filter((p)=>p.id <= limit)); // IF AN ID IS DELETED ON THE MIDDLE, THIS OPTION WILL NOT GIVE THE DESIRED RESULTS.
    */
    res.send(productsLimit);
    // res.end();
})

app.get("/products/:pid", (req,res)=>{
    /* WAYS TO ASSIGN VALUE TO PROPERTIES
    const { id } = req.params 
    const id = req.params.id
    */ 
   
    const { pid } = req.params;
    let productById = products.find(p => p.id === pid);
    // console.log(productById);
    res.send(productById);
    // res.end();    
});

app.get("/carts", (req,res)=>{
    const {limit} = req.query;
    if (!limit){
        return res.send(carts);
    }
    const cartsLimit = carts.slice(0, limit);

    res.send(cartsLimit);
})

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(8080, () => {
    console.log("Server listening on port 8080");
});