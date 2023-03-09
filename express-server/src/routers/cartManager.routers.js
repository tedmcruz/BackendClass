import {Router, json} from "express";
import CartManager from "../app/cartManager.js";

const cartManagerRouter = Router();
const cartManager = new CartManager;
cartManagerRouter.use(json());

cartManagerRouter.get("/", async (req,res) =>{
    await cartManager.getCarts();
    const carts = await cartManager.getCarts();
    const {limit} = req.query;
    if (!limit){
        return res.send(carts);
    }
    const cartsLimit = carts.slice(0, limit);

    res.send(cartsLimit);
});

cartManagerRouter.get("/:cid", async (req,res)=>{
    const { cid } = req.params;
    let cartById = await cartManager.getCartById(cid);
    res.send(cartById);
});


cartManagerRouter.post("/", async (req,res) =>{

    const createCart = await cartManager.createCart();
    res.send(createCart);
});

cartManagerRouter.post("/:cid/product/:pid", async (req,res) =>{

    const {cid} = req.params;
    // let cartId = cid;
    const {pid} = req.params;

    // let productById = products.find(p => p.id === pid);
    // let idOfProductToAdd = productById.id;
    const {quantity} = req.body;

    const addProductToCart = await cartManager.addProductToCart(cid,pid,quantity);


    // let filteredCart = carts.find(c => c.id === cid);
    // let filteredProducts = filteredCart.products;
    // let filteredIndividualProduct = filteredProducts.find(p => p.id === pid);
    
    // let filteredQuantity;

    // if (!filteredIndividualProduct.productsInCart){
    //     filteredQuantity=quantity;
    // } else {
    //     let filteredObject=filteredIndividualProduct.productsInCart;
    //     filteredQuantity=filteredObject.quantity+quantity;
    // }

    // const productsInCart = {["id"]:idOfProductToAdd,["quantity"]:filteredQuantity};

    // let updatedProduct = filteredProducts.map((p) => 
    //         p.id === pid ? productsInCart : p
    //         );

    // const newCart = {["id"]:cartId,["products"]:updatedProduct};

    // const newCart = {["id"]:cartId,["products"]:addProductToCart};

    // const updatedCart = carts.map((c) => 
    //         c.id === cid ? newCart : c
    //         );

    // carts = updatedCart;

    // res.send(updatedCart);
    res.send(addProductToCart);
});

export default cartManagerRouter;