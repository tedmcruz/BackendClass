import express from "express";
import productsManagerRouter from "./routers/productManager.routers.js";
import cartsManagerRouter from "./routers/cartManager.routers.js";
import productsViewsRouter from "./routers/views.routers.js";
import realTimeProductsViewsRouter from "./routers/realTimeProductViews.routers.js";
import messageManagerRouter from "./routers/messageManager.routers.js";
// import handlebars from "express-handlebars";
import {Server} from "socket.io";
import {engine} from "express-handlebars";
import { __filename , __dirname } from "./utils.js";
import ProductManager from "./app/productManager.js";
import {MessageManager} from "./dao/index.js";
import mongoose from "mongoose";

const app = express();
const httpServer = app.listen(8080, () => {
    console.log("Server listening on port 8080");
});

mongoose
    .connect("mongodb+srv://tedcruz:mypassword@coderhousebackend.jz1sdwn.mongodb.net/ecommerce?retryWrites=true&w=majority")
    .then((conn) => {
        console.log("Connected to Data Base.")
    });

const socketServer = new Server(httpServer);
const productManager = new ProductManager();
const messageManager = new MessageManager();
const products = [];

app.use(express.json());


// app.engine('handlebars',handlebars.engine());
app.engine('handlebars',engine());

app.set('view engine','handlebars');
app.set('views',__dirname+"/views");

app.use(express.static(__dirname + "/public"));

app.get('/',(req,res)=>{
    let testUser = {
        name:"Coder",
        last_name:"House"
    }
    res.render('index',testUser)
})

app.use ("/", productsViewsRouter)
app.use ("/", realTimeProductsViewsRouter)
app.use ("/", messageManagerRouter)


app.use("/api/products", productsManagerRouter);
app.use("/api/carts", cartsManagerRouter);
app.use("/api/chat", messageManagerRouter);

// app.use("/realTimeProducts", (req, res, next) => {
//     req.socketServer = socketServer;
//     next();
// });

socketServer.on("connection",socket => {
    console.log("New cliente connected");
    
    socket.on("message",data=> {
        console.log(data);
    })
    
    // setInterval(() => {
    //     socket.emit("input", "Updating Data");
    // }, 1000);

    socket.on("input-changed", (data) => {
        console.log(data);
        socketServer.emit("input-changed",data);
    });

    // socket.on("input-title",(data) => {
    //     console.log(data)
    //     productManager.addProduct(data);

    // });

    socket.on("input-product",async (title,description,code,price) => {
        console.log(title,description,code,price)
        productManager.addProduct(title,description,code,price);
        let products = await productManager.getProducts();
        socket.emit("input-product",JSON.stringify(products))
    });

    socket.on("input-message-changed", (data) => {
        // console.log(data);
        socket.emit("input-message-changed",data);
    });

    socket.on("input-message",async (userName,userMessage) => {
        // console.log(userName,userMessage)
        const addMessage = await messageManager.addMessage(userName,userMessage);
        console.log(addMessage)
        const messages = await messageManager.getMessages();
        // console.log(messages.payload)
        // socketServer.emit("input-message",JSON.stringify(messages))
        // socket.emit("create-message",JSON.stringify(messages))
        socketServer.emit("create-message",messages.payload)
    });

    // socket.on("input-description",(title,description,code,price) => {
    //     console.log(title,description,code,price)
    //     productManager.addProduct(title,description,code,price);

    // });

    // socket.on("submit-new-product", (newProduct) =>{
    //     console.log(newProduct);
    // })


    
});

// socketServer.on("addProduct",socket =>{
//     console.log("A new product was added.")
//     socket.emit("products",products=>{
//         console.log(products);
//     })

// })