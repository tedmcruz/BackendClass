import {Router, json} from "express";

let carts = [];
let products = [
    {id:1,title:"Jabon", description:"Jabon liquido para manos",code:"101"},
    {id:2,title:"Shampoo", description:"Shampoo liquido para cabeza",code:"202"}
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

cartsRouter.post("/:cid/product/:pid",(req,res) =>{

    const {cid} = req.params;
    let cartById = carts.find(c => c.id === cid);

    const {pid} = req.params;

    let productById = products.find(p => p.id === JSON.stringify(pid));
    const {quantity} = req.body;



    // const updatedCart = products.map((p) => 
    //         p.id === JSON.stringify(pid) ? {...p, pid, quantity} : p
    //         );

    const newProductsToCart = {productById,quantity};

    carts = [...carts, newProductsToCart];

    console.log(productById);

    res.send(newProductsToCart);
});

cartsRouter.put("/:cid", (req,res)=>{
    
    const { cid } = req.params;
    let id = cid;
    let status = true;
    let thumbnails = [];

    const {title, description, code, price, stock, category} = req.body;

    const updatedProduct = {id, title, description, code, price, status, stock, category, thumbnails};

    const updatedProductsById = products.map((p) => 
    p.id === pid ? updatedProduct : p
    );

    products = updatedProductsById;
    
    res.send(updatedProductsById);
});

cartsRouter.delete("/:pid", (req,res)=>{
    
    const { pid } = req.params;
    let productById = products.find(p => p.id === pid);
    let id = pid;
    let title = `${productById.title} was the title of the product with this ID`;
    let description ="";
    let code = `${productById.code} was the code of the product with this ID`;
    let price = "";
    let status = "";
    let stock ="";
    let category ="";
    let thumbnails = "";
    // console.log(productById);
    const updatedProduct = {id, title, description, code, price, status, stock, category, thumbnails};

    const updatedProductsById = products.map((p) => 
    p.id === pid ? updatedProduct : p
    );

    products = updatedProductsById;
    
    res.send(updatedProductsById);
});

export default cartsRouter;