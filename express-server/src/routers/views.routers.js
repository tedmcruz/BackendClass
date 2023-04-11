import {Router, json} from "express";
// import productManagerRouter from "./productManager.routers.js";
import { ProductManager } from "../dao/index.js";
import productModel from "../dao/models/productModel.js";
// import express from "express";

const productsViewsRouter = Router();
const productManager = new ProductManager();
productsViewsRouter.use(json());

productsViewsRouter.get("/home", async (req,res) =>{

    if(req.session.user){
        res.redirect("/products")
    } else {
        res.send("Enter Session")
    }
});

export default productsViewsRouter;