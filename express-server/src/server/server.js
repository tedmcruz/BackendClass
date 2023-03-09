import express from "express";
import productsManagerRouter from "../routers/productManager.routers.js";
import cartsManagerRouter from "../routers/cartManager.routers.js";
// import { dirname } from "path";

const app = express();

app.use(express.json());
// app.use(express.static(dirname + "../../public"));

app.use("/api/products", productsManagerRouter);
app.use("/api/carts", cartsManagerRouter);

app.listen(8080, () => {
    console.log("Server listening on port 8080");
});