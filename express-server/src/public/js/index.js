const socket = io();

// console.log("Greetings from products template");
socket.emit("message","Greetings from products template through websocket");

socket.on("message", (data) => {
    console.log(data);
});

// socket.emit("products",products);

const productTitleInput = document.getElementById(productTitle);
productTitleInput.addEventListener("input", (ev) => {
    socket.emit("input-changed", ev.target.value)
});

// const productDescriptionInput = document.getElementsByClassName(productDescription) ;
// productDescriptionInput.addEventListener("input", (ev) => {
//     socket.emit("input-changed",ev.target.value)
// });

// const productCodeInput = document.getElementsByClassName(productCode) ;
// productCodeInput.addEventListener("input", (ev) => {
//     socket.emit("input-changed",ev.target.value)
// });

// const productPriceInput = document.getElementsByClassName(productPrice) ;
// productPriceInput.addEventListener("input", (ev) => {
//     socket.emit("input-changed",ev.target.value)
// });

// export {titleProdcuctInput,descriptionProdcuctInput,codeProdcuctInput,priceProdcuctInput};