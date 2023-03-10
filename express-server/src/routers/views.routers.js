import express from "express";

const router = express.Router();

router.get("/foods", (req,res) => {
    const foods = [
        {name: "Apple", price: 15 },
        {name: "Meat", price: 10 },
        {name: "Chicken", price: 25 },
        {name: "Banana", price: 35 },
        {name: "Lettuce", price: 05 },
    ];

    const user = {
        firstName: "Pepe",
        lastName: "Gonzalez",
        role: "admin",
    };

    res.render("foods",{
        foods,
        iser,
        isAdmin: user.role === "admin",
    });
});

export default router;