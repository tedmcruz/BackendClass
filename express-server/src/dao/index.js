import FileProductManager from "./file-managers/productManager.js";
import DbProductManager from "./db-managers/productManager.js";
import FileCartManager from "./file-managers/cartManager.js";
import DbCartManager from "./db-managers/cartManager.js";
import DbMessageManager from "./db-managers/messageManager.js";

const dbFileConfiguration = {
    persistenceType: "db",
};

let ProductManager, CartManager, MessageManager;

if (dbFileConfiguration.persistenceType === "db") {
    ProductManager = DbProductManager;
    CartManager = DbCartManager;
    MessageManager = DbMessageManager;
} else if (dbFileConfiguration.persistenceType === "file"){
    ProductManager = FileProductManager;
    CartManager = FileCartManager;
} else {
    throw new Error("Unknown Persisteence type");
}

export { ProductManager, CartManager, MessageManager, dbFileConfiguration };