const socket = io();

// console.log("Greetings from products template");
socket.emit("message","Greetings from products template through websocket");

socket.on("message", (data) => {
    console.log(data);
});

// socket.emit("products",products);

const productTitleInput = document.getElementById("productTitle");
productTitleInput.addEventListener("input", (ev) => {
    socket.emit("input-changed", ev.target.value)
});

const productDescriptionInput = document.getElementById("productDescription") ;
productDescriptionInput.addEventListener("input", (ev) => {
    socket.emit("input-changed",ev.target.value)
});

const productCodeInput = document.getElementById("productCode") ;
productCodeInput.addEventListener("input", (ev) => {
    socket.emit("input-changed",ev.target.value)
});

const productPriceInput = document.getElementById("productPrice") ;
productPriceInput.addEventListener("input", (ev) => {
    socket.emit("input-changed",ev.target.value)
});

// export {titleProdcuctInput,descriptionProdcuctInput,codeProdcuctInput,priceProdcuctInput};