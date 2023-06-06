import {Router, json} from "express";
// import productManagerRouter from "./productManager.routers.js";
import { ProductManager } from "../dao/index.js";
import productModel from "../dao/models/productModel.js";
import { methodOfAuthentication } from "./authentication.routers.js";
// import express from "express";

const productsViewsRouter = Router();

if (methodOfAuthentication ==="authPassport"){

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
        const user = await req.session.user;
        console.log(user)

        if (user){

            const {title, code, price} = req.query;
            let {limit, page, sortByPrice, sortByTitle} = req.query;

            const query = {};
            let sortCriteria, sortPriceOrder, sortTitleOrder;

            if (title) {
                query.title = { $regex: title, $options: "i" };
            }
            
            if (code) {
                query.code = code;
            }

            if (price) {
                query.price = price;
            }
            
            if (!limit){
                limit = 10
            }

            if (!page){
                page = 1
            }

            if (sortByPrice==="asc"){sortCriteria = { price: 1, _id:-1}} 
            else if (sortByPrice==="desc"){sortCriteria = { price: -1, _id:-1}} 
            else if (sortByTitle==="asc"){sortCriteria = { title: 1, _id:-1}} 
            else if (sortByTitle==="desc"){sortCriteria = { title: -1, _id:-1}}
            else {sortCriteria = {createdAt: -1, _id:-1}}

            const first_name = user.first_name;
            const last_name = user.last_name;
            const age = user.age;
            const email = user.email;

            // const user = {
            //     firstName:"Coder",
            //     lastName:"House",
            //     role:"admin",
            // } 

            const products = await productModel.paginate(
                query,
                {
                    limit: limit,
                    lean: true,
                    page: page,
                    sort: sortCriteria,
                    // sortByPrice === "asc" ? { price: 1, _id:-1} : 
                    //         sortByPrice === "desc" ? { price: -1 , _id:-1} : 
                    //         sortByTitle === "asc" ? { title: 1, _id:-1} : 
                    //         sortByTitle === "desc" ? { title: -1 , _id:-1} : 
                    //         {createdAt: -1, _id:-1} ,
                    // skip: limit,
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
                                isSortByPrice:sortCriteria.price>-2,
                                isSortByTitle:sortCriteria.title>-2, 
                                sortCriteria,
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
}

if (methodOfAuthentication === "authJWT") {

}


    export default productsViewsRouter;