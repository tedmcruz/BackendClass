import {Router, json} from "express";
// import productManagerRouter from "./productManager.routers.js";
// import {productTitleInput,productDescriptionInput,productCodeInput,productPriceInput} from "../public/js/index.js"
import ProductManager from "../app/productManager.js";
// import express from "express";

const realTimeProductsViewsRouter = Router();
const productManager = new ProductManager();
realTimeProductsViewsRouter.use(json());

realTimeProductsViewsRouter.get("/real-time-products", async (req,res) =>{
    const products = await productManager.getProducts();

    const user = {
        firstName:"Coder",
        lastName:"House",
        role:"admin",
    };
    res.render("real_time_products",{
        user,
        products,
        isAdmin: user.role === "admin",
        style: "index.css",
    });
});

realTimeProductsViewsRouter.post("/real-time-products",async (req,res) =>{

    let thumbnails = [];
    const {title, description, code, price, stock, category} = req.body;
    // const addProduct = await productManager.addProduct(title, description, code, price, stock, category, thumbnails);
    await productManager.addProduct(title, description, code, price, stock, category, thumbnails);
    const user = {
        firstName:"Coder",
        lastName:"House",
        role:"admin",
    };
    // res.send(addProduct);
    let products = await productManager.getProducts();
    products = [...products, ]
    res.render("real_time_products",{
        user,
        products,
        isAdmin: user.role === "admin",
        style: "index.css",
    });
});

export default realTimeProductsViewsRouter;