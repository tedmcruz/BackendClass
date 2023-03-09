import fs from "fs";
import ProductManager from "./productManager.js";

const productManager = new ProductManager();
const products = await productManager.getProducts();

export default class CartManager {
    // #nextId = 0;
    #path = "./src/server/Carts.json";
    
    constructor(path){
        this.#path = path;
    }

    // Create ID for Cart

    async createId(){
        let carts = await this.getCarts();
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

        let searchedCart = carts.find(c => c.id === cartId);

        if (!searchedCart) {
            return `Cart with Cart ID ${cartId} doesn't exist.`
        }

        return searchedCart;
    }

    // Add Product to Cart

    async addProductToCart(title, description, code, price, stock, category, thumbnails){
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