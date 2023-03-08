import {Router, json} from "express";
import CartManager from "../app/cartManager";

let carts = [];
let products = [
    {id:"1",title:"Jabon", description:"Jabon liquido para manos",code:"101"},
    {id:"2",title:"Shampoo", description:"Shampoo liquido para cabeza",code:"202"}
];

let id = 0;

const cartManagerRouter = Router();
cartManagerRouter.use(json());

cartManagerRouter.get("/",(req,res) =>{
    const {limit} = req.query;
    if (!limit){
        return res.send(carts);
    }
    const cartsLimit = carts.slice(0, limit);

    res.send(cartsLimit);
});

cartManagerRouter.get("/:cid", (req,res)=>{
    const { cid } = req.params;
    let cartById = carts.find(c => c.id === cid);
    res.send(cartById);
});


cartManagerRouter.post("/",(req,res) =>{

    id = JSON.parse(id) + 1;
    id = JSON.stringify(id);

    const newCart = {id, products};

    carts = [...carts, newCart];

    res.send(newCart);
});

cartManagerRouter.post("/:cid/product/:pid", (req,res) =>{

    const {cid} = req.params;
    let cartId = cid;
    const {pid} = req.params;

    let productById = products.find(p => p.id === pid);
    let idOfProductToAdd = productById.id;
    const {quantity} = req.body;


    let filteredCart = carts.find(c => c.id === cid);
    let filteredProducts = filteredCart.products;
    let filteredIndividualProduct = filteredProducts.find(p => p.id === pid);
    
    let filteredQuantity;

    if (!filteredIndividualProduct.productsInCart){
        filteredQuantity=quantity;
    } else {
        let filteredObject=filteredIndividualProduct.productsInCart;
        filteredQuantity=filteredObject.quantity+quantity;
    }

    const productsInCart = {["id"]:idOfProductToAdd,["quantity"]:filteredQuantity};

    let updatedProduct = filteredProducts.map((p) => 
            p.id === pid ? productsInCart : p
            );

    const newCart = {["id"]:cartId,["products"]:updatedProduct};

    const updatedCart = carts.map((c) => 
            c.id === cid ? newCart : c
            );

    carts = updatedCart;

    res.send(updatedCart);
});

export default cartManagerRouter;