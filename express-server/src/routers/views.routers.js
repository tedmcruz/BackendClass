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

productsViewsRouter.get('/products', async (req,res)=>{
    const user = req.session.user;

    if (user){

        const {limit, page, sortByPrice, sortByTitle, title, code, price} = req.query;

        const query = {};

        if (title) {
            query.title = { $regex: title, $options: "i" };
        }
        
        if (code) {
            query.code = code;
        }

        if (price) {
            query.price = price;
        }
        
        const first_name = user[0].first_name;
        const last_name = user[0].last_name;
        const age = user[0].age;
        const email = user[0].email;
        console.log(first_name)

        // const user = {
        //     firstName:"Coder",
        //     lastName:"House",
        //     role:"admin",
        // } 

        const products = await productModel.paginate(
            query,
            {
                limit: limit ?? 10,
                lean: true,
                page: page ?? 1,
                sort: sortByPrice === "asc" ? { price: 1, _id:-1} : 
                        sortByPrice === "desc" ? { price: -1 , _id:-1} : 
                        sortByTitle === "asc" ? { title: 1, _id:-1} : 
                        sortByTitle === "desc" ? { title: -1 , _id:-1} : 
                        {createdAt: -1, _id:-1} ,
                skip: limit,
            }
        )

        res.render("products",{
                            user,
                            products,
                            first_name,
                            last_name,
                            age,
                            email,
                            limit, 
                            sortByPrice, 
                            sortByTitle, 
                            title, 
                            code, 
                            price,
                            // isAdmin: user.role === "admin",
                            style: "index.css"
                            }
        )
    } else {
        res.redirect("/login")
    }
})

export default productsViewsRouter;