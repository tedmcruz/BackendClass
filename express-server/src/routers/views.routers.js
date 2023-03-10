import {Router, json} from "express";
// import express from "express";

const viewsRouter = Router();
// const viewsRouter = express.Router();

viewsRouter.get("/foods", (req,res) => {
    const foods = [
        {name: "Apple", price: 15 },
        {name: "Meat", price: 10 },
        {name: "Chicken", price: 25 },
        {name: "Banana", price: 35 },
        {name: "Lettuce", price: 5 },
    ];

    const user = {
        firstName: "Pepe",
        lastName: "Gonzalez",
        role: "admin",
    };

    res.render("foods",{
        foods,
        user,
        isAdmin: user.role === "admin",
        style: "index.css",
    });
});

export default viewsRouter;