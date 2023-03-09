import express from "express";
import productsManagerRouter from "../routers/productManager.routers.js";
import cartsManagerRouter from "../routers/cartManager.routers.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";

const app = express();
app.use(express.json());


app.engine('handlebars',handlebars.engine());

app.set('views',__dirname+"../../views");

app.set('view engine','handlebars');

app.use(express.static(__dirname + "../../public"));

app.get('/',(req,res)=>{
    let testUser = {
        name:"Coder",
        last_name:"House"
    }
    res.render('index',testUser)
})

app.use("/api/products", productsManagerRouter);
app.use("/api/carts", cartsManagerRouter);

app.listen(8080, () => {
    console.log("Server listening on port 8080");
});