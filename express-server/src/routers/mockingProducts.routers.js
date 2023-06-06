import { Router } from "express";
import { generateProduct } from "../utils.js";

const router = Router();

router.get("/mockingProducts", async (req,res)=>{
    console.log("test mocking")
    let numberOfProducts = 100;
    let products = []
    for(let i=0; i<numberOfProducts;i++){
        products.push(generateProduct());
    }
    console.log(products);
    res.send({status:"SUCCESS",payload:products})
})

export {router as MockingProductsRouter};