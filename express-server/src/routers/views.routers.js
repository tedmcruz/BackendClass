import {Router, json} from "express";
// import productManagerRouter from "./productManager.routers.js";
import ProductManager from "../app/productManager.js";
// import express from "express";

const productsViewsRouter = Router();
const productManager = new ProductManager();
productsViewsRouter.use(json());

productsViewsRouter.get("/home", async (req,res) =>{
    const products = await productManager.getProducts();

    const user = {
        firstName:"Coder",
        lastName:"House",
        role:"admin",
    };
    res.render("home",{
        user,
        products,
        isAdmin: user.role === "admin",
        style: "index.css",
    });
});

export default productsViewsRouter;