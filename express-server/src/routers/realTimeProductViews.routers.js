import {Router, json} from "express";
// import productManagerRouter from "./productManager.routers.js";
import ProductManager from "../app/productManager.js";
// import express from "express";

const realTimeProductsViewsRouter = Router();
const productManager = new ProductManager();
realTimeProductsViewsRouter.use(json());

realTimeProductsViewsRouter.get("/realTimeProducts", async (req,res) =>{
    const products = await productManager.getProducts();

    const user = {
        firstName:"Coder",
        lastName:"House",
        role:"admin",
    };
    res.render("realTimeProducts",{
        user,
        products,
        isAdmin: user.role === "admin",
        style: "index.css",
    });
});

realTimeProductsViewsRouter.post("/realTimeProducts",async (req,res) =>{

    let thumbnails = [];
    const {title, description, code, price, stock, category} = req.body;
    const addProduct = await productManager.addProduct(title, description, code, price, stock, category, thumbnails);
    const user = {
        firstName:"Coder",
        lastName:"House",
        role:"admin",
    };
    res.send(addProduct);
    const products = await productManager.getProducts();
    res.render("realTimeProducts",{
        user,
        products,
        isAdmin: user.role === "admin",
        style: "index.css",
    });
});

export default realTimeProductsViewsRouter;