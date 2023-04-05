import {Router, json} from "express";
import {ProductManager} from "../dao/index.js";
import productModel from "../dao/models/productModel.js";

const productByIdRouter = Router();
const productManager = new ProductManager;
productByIdRouter.use(json());

// productByIdRouter.get("/", async (req,res) =>{
//     const {limit, page, sortByPrice, sortByTitle, title, code, price} = req.query;

//     const query = {};

//     try{

//     if (title) {
//         query.title = { $regex: title, $options: "i" };
//     }
      
//     if (code) {
//         query.code = code;
//     }

//     if (price) {
//         query.price = price;
//     }

//     const products = await productModel.paginate(
//         query,
//         {
//             limit: limit ?? 10,
//             lean: true,
//             page: page ?? 1,
//             sort: sortByPrice === "asc" ? { price: 1} : 
//                     sortByPrice === "desc" ? { price: -1 } : 
//                     sortByTitle === "asc" ? { title: 1} : 
//                     sortByTitle === "desc" ? { title: -1 } : 
//                     {createdAt:0} ,
//         }
//     )

//     res.send({status:"success",payload:products})
    
//     } catch (e) {
//         res.send({status:"error",payload:e})
//     }

//     // const {limit} = req.query;
//     // try{
//     // const products = await productManager.getProducts(limit);
//     // res.send(products.payload);
//     // } catch (e){
//     //     res.status(500).send({result:"error", payload:e});
//     // }
// });

productByIdRouter.get("/products/:pid", async (req,res)=>{

    try{    
        const { pid } = req.params;
        const productById = await productManager.getProductById(pid);
        
        res.render("productById",{productById});
    } catch (e){
        res.send({result:"error",payload:e})
    }
});

// productByIdRouter.post("/",async (req,res) =>{
//     let thumbnails = [];
//     const {title, description, code, price, stock, category} = req.body;

//     try{
//         const addProduct = await productManager.addProduct(title, description, code, price, stock, category,thumbnails);
//         res.send(addProduct.payload)

//     }catch (e){
//         res.status(500).send({result:"error", payload:e});
//     }
// });

// productByIdRouter.put("/:pid", async (req,res)=>{
    
//     const { pid } = req.params;
//     let thumbnails = [];
//     const {title, description, code, price, stock, category} = req.body;
    
//     try{
//         const updateProduct = await productManager.updateProduct(pid, title, description, code, price, stock, category,thumbnails)
//         res.send(updateProduct.payload);
        
//     }catch (e){
//         res.status(500).send({result:"error", payload:e});
//     }
// });

// productByIdRouter.delete("/:pid", async (req,res)=>{
    
//     const { pid } = req.params;

//     try{
//         const deleteProduct = await productManager.deleteProduct(pid);
//         res.send(deleteProduct);
//     }catch (e){
//         res.status(500).send({result:"error", payload:e});
//     }
// });

export default productByIdRouter;