import express from "express";
import fs from "fs";
import ProductManager from "./productManager.js";
import { Router } from "express";
import productsRouter from "./routers/products.routers.js";
import cartsRouter from "./routers/carts.routers.js";

const app = express();
const router = Router();

const productManager = new ProductManager();

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

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(8080, () => {
    console.log("Server listening on port 8080");
});