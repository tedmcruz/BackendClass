import {Router, json} from "express";

let carts = [];
let products = [
    {id:"1",title:"Jabon", description:"Jabon liquido para manos",code:"101"},
    {id:"2",title:"Shampoo", description:"Shampoo liquido para cabeza",code:"202"}
];

// {title:"", description:"",code:"",price:"",status:"",stock:"",category:"",thumbnails:""}

let id = 0;

const cartsRouter = Router();
cartsRouter.use(json());

cartsRouter.get("/",(req,res) =>{
    const {limit} = req.query;
    if (!limit){
        return res.send(carts);
    }
    const cartsLimit = carts.slice(0, limit);

    res.send(cartsLimit);
});

cartsRouter.get("/:cid", (req,res)=>{
    const { cid } = req.params;
    let cartById = carts.find(c => c.id === cid);
    // console.log(cartById);
    res.send(cartById);
});


cartsRouter.post("/",(req,res) =>{

    id = JSON.parse(id) + 1;
    id = JSON.stringify(id);

    const newCart = {id, products};

    carts = [...carts, newCart];

    res.send(newCart);
});

cartsRouter.post("/:cid/product/:pid", (req,res) =>{

    const {cid} = req.params;
    // let cartById = carts.find(c => c.id === cid);
    let id = cid;

    const {pid} = req.params;

    let productById = products.find(p => p.id === pid);
    let idOfAddedProduct = productById.id;
    const {quantity} = req.body;

    const newProductsToCart = {idOfAddedProduct,quantity};

    const updatedProduct = products.map((p) => 
            p.id === pid ? {...p, newProductsToCart} : p
            );
    products = updatedProduct;
    const newCart = {id,products};

    const updatedCart = carts.map((c) => 
            c.id === cid ? newCart : c
            );

    // carts = [...carts, updatedCart];
    

    carts = updatedCart;

    // console.log(productById);

    res.send(updatedCart);
});

export default cartsRouter;