import express from "express";
import fs from "fs";
import ProductManager from "./productManager.js";
import CartManager from "./cartManager.js";
import { Router, json } from "express";
import productsManagerRouter from "./routers/products.routers.js";
import cartsManagerRouter from "./routers/carts.routers.js";
import { dirname } from "path";

const app = express();

app.use(express.json());
app.use(express.static(dirname + "../../public"));


// const router = Router();

// const productManager = new ProductManager();
// const cartManager = new CartManager();

app.get("/products", (req,res)=>{
    const {limit} = req.query;
    if (!limit){
        return res.send(products);
    }
    const productsLimit = products.slice(0, limit);
    res.send(productsLimit);
})

app.get("/products/:pid", (req,res)=>{
    const { pid } = req.params;
    let productById = products.find(p => p.id === pid);
    res.send(productById);
});

app.get("/carts", (req,res)=>{
    const {limit} = req.query;
    if (!limit){
        return res.send(carts);
    }
    const cartsLimit = carts.slice(0, limit);

    res.send(cartsLimit);
})

app.use("/api/products", productsManagerRouter);
app.use("/api/carts", cartsManagerRouter);

app.listen(8080, () => {
    console.log("Server listening on port 8080");
});