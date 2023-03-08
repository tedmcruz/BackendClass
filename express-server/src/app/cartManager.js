import fs from "fs";
import ProductManager from "./productManager.js";

const productManager = new ProductManager();

export default class CartManager {
    // #nextId = 0;
    #path = "../server/Carts.json";
    
    constructor(path){
        path = this.#path;
    }

    // Create ID for Cart

    async createId(){
        if(!carts || carts === []) {
            let cartId = 1
            return cartId;
        } else {
            let cartId = carts.length + 1;
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
        carts = [...carts,newCart];
        await fs.promises.writeFile(this.#path, JSON.stringify(carts))
    }

    // Get Carts

    async getCarts() {
    try {
        const carts = await fs.promises.readFile(this.#path,"utf-8");

        return JSON.parse(carts);
    }   catch (emptyCartsFile) {
        return [];
    }
    }

    //Get Cart by ID

    async getCartById(cartId){
        const carts = await this.getCarts();

        let searchedCart = carts.find(c => c.id === JSON.stringify(cartId));

        if (!searchedCart) {
            throw new Error(`Cart with Cart ID ${cartId} doesn't exist.`)
        }

        console.log(searchedCart);
    }

    async addProduct(title, description, code, price, stock, category, thumbnails){
        const products = await this.getProducts();

        let id = JSON.stringify(products.length +1); // = this.#nextId

        let status = true;

        const newProduct = {
        id,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
        };

        const addedProducts = [...products, newProduct];

        await fs.promises.writeFile(this.#path,JSON.stringify(addedProducts));
    }
    

    async updateProduct(productId,keyToUpdate,dataToUpdate){ //newtitle, newDescription, newPrice, newThumbnails, newCode, newStock
        const products = await this.getProducts();
                
        const updatedProduct = await products.map((p) => 
            p.id === JSON.stringify(productId) ? {...p, [keyToUpdate]:dataToUpdate } : p
            );

        await fs.promises.writeFile(this.#path,JSON.stringify(updatedProduct))
    }

    async deleteProduct(productId){
        const products = await this.getProducts();
        
                
        const updatedProduct = await products.map((p) => 
            p.id === JSON.stringify(productId) ? {...p, ["title"]:"", ["description"]:"",["code"]:"",["price"]:"",["status"]:"",["stock"]:"",["category"]:"",["thumbnails"]:""} : p
            );

        await fs.promises.writeFile(this.#path,JSON.stringify(updatedProduct))
    }
}

// async function main () {
//     const manager = new cartManager("./Products.json");

//     let products = await manager.getProducts();

//     // console.log(products);

//     // await manager.addProduct("title", "description", 20, "thumbnails", 300, 4000);

//     // await manager.getProductById(2);

//     // await manager.updateProduct(1,"title","Mariposa"); //"Joyas", "Oro", 30, "thumbnails", 30, 2000

//     // await manager.deleteProduct(3);

//     products = await manager.getProducts();

//     console.log(products);
// }

// main();