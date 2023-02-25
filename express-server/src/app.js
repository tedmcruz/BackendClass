import express from "express";
import fs from "fs";
import ProductManager from "./productManager.js";
// // import products from "./Products.json";
import { createRequire } from "module";
const require = createRequire(import.meta.url); // construct the require method

const products =  require("./Products.json") // use the require method

// const products = await fs.promises.readFile("./Products.json","utf-8");
const app = express();

// const productManager = new ProductManager();

// [
//     {id:"1",name:"producto1",description:"description",price:"10",thumbnail:"thumbnail",code:"100",stock:"1000"},
//     {id:"2",name:"producto2",description:"description",price:"20",thumbnail:"thumbnail",code:"200",stock:"2000"},
//     {id:"3",name:"producto3",description:"description",price:"30",thumbnail:"thumbnail",code:"300",stock:"3000"}
// ]

app.get("/products", (req,res)=>{
    const {limit} = req.query;
    if (!limit){
        return res.send(products);
    }

    res.send(products.filter((p)=>p.id <= limit));
    res.end();
})

app.get("/products/:id", (req,res)=>{
    const { id } = req.params; // (  const { id } = req.params  ) === (  const id = req.params.id  )

    let productById = products.find(p => p.id === id);
    // productById = JSON.stringify(productById);
    // res.send(`Cliente asked for id = ${id}`)
    console.log(productById);
    res.send(productById);
    res.end();    
});

app.listen(8080, () => {
    console.log("Server listening on port 8080");
});