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
import { AuthenticationRouter } from "./routers/authentication.routers.js";
import { WebRouter } from "./routers/web.routers.js";
import path from "path"; // used to make the slash on the url with the same orientation as the with the same "\" instead of "/" . Use => path.join(__dirname,"/pathName") . To use in app => app.set('viewsName', path.join(__dirname,"/pathName"))

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

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
const cartManager = new CartManager();
const products = [];

app.engine('handlebars',engine());
app.set('view engine','handlebars');
app.set('views',path.join(__dirname+"/views"));

app.use(express.static(__dirname + "/public"));

// app.get('/',(req,res)=>{
//     let testUser = {
//         name:"Coder",
//         last_name:"House"
//     }
//     res.render('index',testUser)
// })

app.use(session({
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://tedcruz:mypassword@coderhousebackend.jz1sdwn.mongodb.net/ecommerce?retryWrites=true&w=majority",
        //ttl:60,
    }),
    secret:"secretPassword",
    resave: true,
    saveUninitialized: true,
}));

// app.get("/login",(req,res)=>{
//     req.session.user = "testUser";
//     res.send("Session started");
// });

app.get("/private",(req,res)=>{
    if (req.session.email){
    console.log(req.session);
    res.send("Private session started");
} else {
    res.send("You do not have access")
}
});

// app.get('/products', async (req,res)=>{

//     const {limit, page, sortByPrice, sortByTitle, title, code, price} = req.query;

//     const query = {};

//     if (title) {
//         query.title = { $regex: title, $options: "i" };
//     }
      
//     if (code) {
//         query.code = code;
//     }

//     if (price) {
//         query.price = price;
//     }

//     const user = {
//         firstName:"Coder",
//         lastName:"House",
//         role:"admin",
//     }

//     const products = await productModel.paginate(
//         query,
//         {
//             limit: limit ?? 10,
//             lean: true,
//             page: page ?? 1,
//             sort: sortByPrice === "asc" ? { price: 1} : 
//                     sortByPrice === "desc" ? { price: -1 } : 
//                     sortByTitle === "asc" ? { title: 1} : 
//                     sortByTitle === "desc" ? { title: -1 } : 
//                     {createdAt:1} ,
//             skip: limit,
//         }
//     )

//     res.render("products",{
//                         user,
//                         products,
//                         limit, 
//                         sortByPrice, 
//                         sortByTitle, 
//                         title, 
//                         code, 
//                         price,
//                         isAdmin: user.role === "admin",
//                         style: "index.css"
//                         }
//     )
// })

// app.get('/products/:pid', async (req,res)=>{

//     const {pid} = req.param;

//     const product = await productModel.paginate(
//         pid,
//         {
//             lean: true,
//         }
//     )

//     res.render("products/:pid",{
//                         product,
//                         style: "index.css"
//                         }
//     )
// })

app.use ("/", productsViewsRouter)
app.use ("/", realTimeProductsViewsRouter)
app.use ("/", messageManagerRouter)
app.use ("/", productByIdRouter)
app.use ("/", cartByIdRouter)


app.use("/api/products", productsManagerRouter);
app.use("/api/carts", cartsManagerRouter);
app.use("/api/chat", messageManagerRouter);
app.use("/api/sessions",AuthenticationRouter)
app.use(WebRouter);

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