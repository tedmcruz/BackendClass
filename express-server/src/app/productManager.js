import fs from "fs";

export default class ProductManager {
    // #nextId = 0;
    #path = "../server/Products.json";

    constructor(path){
        // path = this.#path;
        this.path = path;
    }

    async getProducts() {
    try {
        let products = await fs.promises.readFile(this.#path,"utf-8");
        products = JSON.parse(products);
        // const {limit} = req.query;
        // if (!limit){
        //     return products;
        // }
        // const productsLimit = products.slice(0, limit);
    
        // return productsLimit;
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