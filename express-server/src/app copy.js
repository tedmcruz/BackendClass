import express from "express";

const app = express();

app.get("/saludo", (req,res)=>{
    res.send("Hello world!!!")
});

app.listen(8080, () => {
    console.log("Server listening on port 8080");
});