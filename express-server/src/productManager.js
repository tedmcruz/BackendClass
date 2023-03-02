import fs from "fs";

export default class ProductManager {
    // #nextId = 0;
    #path;
    //  = "./Products.json"; //#path is used to make a private path that is not accessible outside of the class


    constructor(path){
        this.#path = path
    }

    async getProducts() {
    try {
        const products = await fs.promises.readFile(this.#path,"utf-8");

        return JSON.parse(products);
    }   catch (emptyProductsFile) {
        return [];
    }
    }

    async getProductById(productId){
        const products = await this.getProducts();

        let searchedProduct = products.find(p => p.id === JSON.stringify(productId));

        if (!searchedProduct) {
            throw new Error(`Product with Product ID ${productId} doesn't exist.`)
        }

        console.log(searchedProduct);
        // if (searchedProduct.id === id){
        //     return searchedProduct = products.filter(searchedProduct => searchedProduct.id===searchedId)
        // }
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

        // this.#nextId += 1;
    }
    

    async updateProduct(productId,keyToUpdate,dataToUpdate){ //newtitle, newDescription, newPrice, newThumbnails, newCode, newStock
        const products = await this.getProducts();
                
        const updatedProduct = await products.map((p) => 
            p.id === JSON.stringify(productId) ? {...p, [keyToUpdate]:dataToUpdate } : p
            );

        await fs.promises.writeFile(this.#path,JSON.stringify(updatedProduct))

        
        // let productToModifyById = products.find(p => p.id === productId);

        // if (!productToModifyById){
        //     throw new Error(`Product ID ${productId} not found.`)
        // }

        // const updatedProduct = {
        //     ...productToModifyById,
        //     title : newtitle, 
        //     description : newDescription, 
        //     price : newPrice, 
        //     thumbnails : newThumbnails, 
        //     code : newCode, 
        //     stock : newStock 
        // };
        // console.log(updatedProduct);
        
    }

    async deleteProduct(productId){
        const products = await this.getProducts();
        
                
        const updatedProduct = await products.map((p) => 
            p.id === JSON.stringify(productId) ? {...p, ["title"]:"", ["description"]:"",["code"]:"",["price"]:"",["status"]:"",["stock"]:"",["category"]:"",["thumbnails"]:""} : p
            );

        await fs.promises.writeFile(this.#path,JSON.stringify(updatedProduct))
    }
}


async function main () {
    const manager = new ProductManager("./Products.json");

    let products = await manager.getProducts();

    // console.log(products);

    // await manager.addProduct("title", "description", 20, "thumbnails", 300, 4000);

    // await manager.getProductById(2);

    // await manager.updateProduct(1,"title","Mariposa"); //"Joyas", "Oro", 30, "thumbnails", 30, 2000

    // await manager.deleteProduct(3);

    products = await manager.getProducts();

    console.log(products);
}

main();