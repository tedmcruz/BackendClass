import { Console } from "console";
import fs from "fs";
import DbProductManager from "./productManager.js";

const productManager = new DbProductManager();
const products = await productManager.getProducts();

export default class DbCartManager {
    // #nextId = 0;
    #path = "./src/server/Carts.json";
    
    constructor(path){
        this.path = path;
    }

    // Create ID for Cart

    async createId(){
        let carts = await this.getCarts();
        if(!carts || carts === []) {
            let cartId = JSON.stringify(1)
            return cartId;
        } else {
            let cartId = JSON.stringify(carts.length + 1);
            return cartId;
        }
    } 

    // Create Cart

    async createCart(){
        let carts = await this.getCarts();
        const newCart = {
            cartId: await this.createId(),
            products:[]
        }

        if (carts===[]){
            carts = [newCart]
        } else{
            carts = [...carts,newCart];
        }

        await fs.promises.writeFile(this.#path,JSON.stringify(carts))
        return carts;
    }

    // Get Carts

    async getCarts() {
    try {
        let carts = await fs.promises.readFile(this.#path,"utf-8");
        carts = JSON.parse(carts);
        return carts;
    }   catch (emptyCartsFile) {
        return [];
    }
    }

    // Get Cart by ID

    async getCartById(cartId){
        const carts = await this.getCarts();

        let searchedCart = carts.find((c) => c.cartId === cartId);

        if (!searchedCart) {
            return `Cart with Cart ID ${cartId} doesn't exist.`
        }

        return searchedCart;
    }

    // Add Product to Cart

    async addProductToCart(cartId,productId,quantity){
        
        const products = await productManager.getProducts();
        let productById = products.find((p)=> p.id === productId);

        let carts = await this.getCarts();
        let cartById = carts.find((c)=> c.cartId === cartId);

        let allProductsByCartId = cartById.products;
        let productByCartId = cartById.products.find(p => p.id === productId);

        let oldProductQuantityInCart;
        let newProductQuantityInCart;
        
        if(productByCartId===undefined){
                oldProductQuantityInCart = 0;
        }else{
                oldProductQuantityInCart = productByCartId['quantity'];
        }

        if(productByCartId === []){
                newProductQuantityInCart = 0;
        } else if(productByCartId===undefined||productByCartId===[]||productByCartId===null){
                newProductQuantityInCart = quantity;
        } else if (oldProductQuantityInCart === undefined){
                newProductQuantityInCart = quantity;
        } else {
                newProductQuantityInCart = oldProductQuantityInCart+quantity;
        } 

        let id = productId;
        let code = productById.code;
        quantity = newProductQuantityInCart;
        let updatedProduct;

        const productToAdd = {
        id,
        code,
        quantity
        };

        if (productByCartId===undefined||productByCartId===[]){
            // let fullProductList = [...allProductsByCartId,productToAdd];
            // updatedProduct = fullProductList;
            updatedProduct = [...allProductsByCartId,productToAdd];
        } else {
            updatedProduct = allProductsByCartId.map((p)=>
                p.id === productId ? productToAdd : p)
        }

        const newCart = {["cartId"]:cartId,["products"]:updatedProduct};

        const updatedCart = carts.map((c) => 
                c.cartId === cartId ? newCart : c
                );

        await fs.promises.writeFile(this.#path,JSON.stringify(updatedCart));

        return updatedCart;
    }
}