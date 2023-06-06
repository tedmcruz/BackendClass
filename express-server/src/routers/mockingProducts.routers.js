import { Router } from "express";
import { generateProduct } from "../utils.js";

const router = Router();

router.get("/", async (req,res)=>{
    let numberOfProducts = 100;
    let products = []
    for(let i=0; i<numberOfProducts;i++){
        products.push(generateProduct());
    }
    res.send({status:"SUCCESS",payload:products})
})

export {router as MockingProductsRouter};