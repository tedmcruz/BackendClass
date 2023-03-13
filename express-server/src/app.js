import express from "express";
import productsManagerRouter from "./routers/productManager.routers.js";
import cartsManagerRouter from "./routers/cartManager.routers.js";
import viewsRouter from "./routers/backupviews.routers.js";
import productsViewsRouter from "./routers/views.routers.js";
import handlebars from "express-handlebars";
// import {engine} from "express-handlebars";
import __dirname from "./utils.js";

const app = express();
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

app.use("/api/products", productsManagerRouter);
app.use("/api/carts", cartsManagerRouter);

app.listen(8080, () => {
    console.log("Server listening on port 8080");
});