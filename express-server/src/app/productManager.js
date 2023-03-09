import fs from "fs";
import {Router, json} from "express";

export default class ProductManager {
    // #nextId = 0;
    #path = "./src/server/Products.json";

    constructor(path){
        // path = this.#path;
        this.path = path;
    }

    async getProducts() {
    try {
        let products = await fs.promises.readFile(this.#path,"utf-8");
        products = JSON.parse(products);
        return products;
    }   catch (emptyProductsFile) {
        return [];
    }
    }

    async getProductById(productId){
        const products = await this.getProducts();
       
        let searchedProduct = products.find(p => p.id === productId);

        if (!searchedProduct) {
            return `Product with Product ID ${productId} doesn't exist.`
        }

        return searchedProduct;
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
        return addedProducts;
    }
    

    async updateProduct(productId, title, description, code, price, stock, category, thumbnails){ //,keyToUpdate,dataToUpdate){ //newtitle, newDescription, newPrice, newThumbnails, newCode, newStock
        const products = await this.getProducts();
        let id = productId;
        let status = true;

        let originalProduct = products.find(p => p.id === productId);

        if(title===undefined||title===null){
            title = originalProduct.title
        }
        if(description===undefined||description===null){
            description = originalProduct.description
        }
        if(code===undefined||code===null){
            code = originalProduct.code
        }
        if(price===undefined||price===null){
            price = originalProduct.price
        }
        if(stock===undefined||stock===null){
            stock = originalProduct.stock
        }
        if(category===undefined||category===null){
            category = originalProduct.category
        }
        if(thumbnails===undefined||thumbnails===null){
            thumbnails = originalProduct.thumbnails
        }

        const updatedProduct = {
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
        const updatedProductsById = products.map((p) => 
        p.id === productId ? updatedProduct : p
        );

        await fs.promises.writeFile(this.#path,JSON.stringify(updatedProductsById))
        return updatedProductsById;
    }

    async deleteProduct(productId){
        try{
            const products = await this.getProducts();
            let productById = products.find(p => p.id === productId);
            let id = productId;
            let description ="";
            let price = "";
            let status = "";
            let stock ="";
            let category ="";
            let thumbnails = "";
            
            let title;
            let code;
            if(productById.status===""){
                title = await productById.title;
                code = await productById.code;
            }else {
                title = await `${productById.title} was the title of the product with this ID`;
                code = await `${productById.code} was the code of the product with this ID`;
            }

            const deletedProduct = {id, title, description, code, price, status, stock, category, thumbnails};
            
            const updatedProducts = await products.map((p) => 
                p.id === productId ? deletedProduct : p
                );

            await fs.promises.writeFile(this.#path,JSON.stringify(updatedProducts))
            return updatedProducts;
        } catch (error){
            return (`Error deleting product with ID:${productId}, verify that product exists.`)
        }
    }
}