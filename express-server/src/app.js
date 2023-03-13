import express from "express";
import productsManagerRouter from "./routers/productManager.routers.js";
import cartsManagerRouter from "./routers/cartManager.routers.js";
import viewsRouter from "./routers/backupviews.routers.js";
import productsViewsRouter from "./routers/views.routers.js";
import realTimeProductsViewsRouter from "./routers/realTimeProductViews.routers.js";
import handlebars from "express-handlebars";
import {Server} from "socket.io";
// import {engine} from "express-handlebars";
import __dirname from "./utils.js";

const app = express();
const httpServer = app.listen(8080, () => {
    console.log("Server listening on port 8080");
});

const socketServer = new Server(httpServer);

app.use(express.json());


app.engine('handlebars',handlebars.engine());
// app.engine('handlebars',engine());

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

app.use ("/", viewsRouter);
app.use ("/", productsViewsRouter)
app.use ("/", realTimeProductsViewsRouter)


app.use("/api/products", productsManagerRouter);
app.use("/api/carts", cartsManagerRouter);

socketServer.on("connection",socket =>{
    console.log("New cliente connected")
    socket.on("message",data=>{
        console.log(data);
    })
})