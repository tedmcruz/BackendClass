import express, { urlencoded } from "express";
import productsManagerRouter from "./routers/productManager.routers.js";
import cartsManagerRouter from "./routers/cartManager.routers.js";
import productsViewsRouter from "./routers/views.routers.js";
import realTimeProductsViewsRouter from "./routers/realTimeProductViews.routers.js";
import messageManagerRouter from "./routers/messageManager.routers.js";
import {Server} from "socket.io";
import {engine} from "express-handlebars";
import { __filename , __dirname } from "./utils.js";
import {MessageManager, ProductManager,CartManager, UserManager} from "./dao/index.js";
import mongoose from "mongoose";
import productModel from "./dao/models/productModel.js";
import productByIdRouter from "./routers/productById.routers.js";
import cartByIdRouter from "./routers/cartById.routers.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import { AuthenticationRouter, methodOfAuthentication } from "./routers/authentication.routers.js";
import { WebRouter } from "./routers/web.routers.js";
import { MockingProductsRouter } from "./routers/mockingProducts.routers.js";
import path from "path"; // used to make the slash on the url with the same orientation as the with the same "\" instead of "/" . Use => path.join(__dirname,"/pathName") . To use in app => app.set('viewsName', path.join(__dirname,"/pathName"))
import passport from "passport";
import initializePassport from "./config/passport.config.js"
import errorHandler from "./middlewares/errors/index.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const PORT = process.env.PORT||8080;

const httpServer = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
mongoose
    .connect("mongodb+srv://tedcruz:mypassword@coderhousebackend.jz1sdwn.mongodb.net/ecommerce?retryWrites=true&w=majority")
    .then((conn) => {
        console.log("Connected to Data Base.")
    });
const socketServer = new Server(httpServer);
const productManager = new ProductManager();
const messageManager = new MessageManager();
const cartManager = new CartManager();
const products = [];

app.engine('handlebars',engine());
app.set('view engine','handlebars');
app.set('views',path.join(__dirname+"/views"));

app.use(express.static(__dirname + "/public"));

if (methodOfAuthentication==="authPassport"){
    app.use(
        session({
            store: new MongoStore({
                mongoUrl:"mongodb+srv://tedcruz:mypassword@coderhousebackend.jz1sdwn.mongodb.net/ecommerce?retryWrites=true&w=majority",
                //ttl:60,
            }),
            secret:"secretPassword",
            resave: true,
            saveUninitialized: true,
        })
    );

    initializePassport();
    app.use(passport.initialize());
    app.use(passport.session());


    app.get("/private",(req,res)=>{
        if (req.session.email){
        console.log(req.session);
        res.send("Private session started");
    } else {
        res.send("You do not have access")
    }
    });
}

if (methodOfAuthentication==="authJWT"){
    let users=[];
}
app.use ("/", productsViewsRouter)
app.use ("/", realTimeProductsViewsRouter)
app.use ("/", messageManagerRouter)
app.use ("/", productByIdRouter)
app.use ("/", cartByIdRouter)


app.use("/api/products", productsManagerRouter);
app.use("/api/carts", cartsManagerRouter);
app.use("/api/chat", messageManagerRouter);
app.use("/api/sessions",AuthenticationRouter);
app.use("/api/sessions",WebRouter);
app.use("/mockingProducts",MockingProductsRouter);
// app.use(WebRouter);
// app.use(AuthenticationRouter);
app.use(errorHandler);

// app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`))

socketServer.on("connection",socket => {
    console.log("New cliente connected");
    
    socket.on("message",data=> {
        console.log(data);
    })
    
    socket.on("singleProductPage-addProduct", async (cartId,productId,quantity)=>{
        console.log("Server received product to add to cart")
        const addedProduct = await cartManager.addProductToCart(cartId,productId,quantity);
        console.log(addedProduct);
    })
    // setInterval(() => {
    //     socket.emit("input", "Updating Data");
    // }, 1000);

    socket.on("input-changed", (data) => {
        console.log(data);
        socketServer.emit("input-changed",data);
    });

    socket.on("input-product",async (title,description,code,price) => {
        console.log(title,description,code,price)
        productManager.addProduct(title,description,code,price);
        let products = await productManager.getProducts();
        socket.emit("input-product",JSON.stringify(products))
    });

    socket.on("input-message-changed", (data) => {
        socket.emit("input-message-changed",data);
    });

    socket.on("input-message",async (userName,userMessage) => {
        const addMessage = await messageManager.addMessage(userName,userMessage);
        socketServer.emit("create-message",{userName,userMessage})
    });
});