const socket = io();

// console.log("Greetings from products template");
socket.emit("message","Greetings from products template through websocket");

socket.on("message", (data) => {
    console.log(data);
});

// socket.emit("products",products);

const productTitleInput = document.getElementById("productTitle");
productTitleInput.addEventListener("input", (ev) => {
    socket.emit("input-changed", "Title in progress = " + ev.target.value)
});

const productDescriptionInput = document.getElementById("productDescription") ;
productDescriptionInput.addEventListener("input", (ev) => {
    socket.emit("input-changed", "Description in progress = " + ev.target.value)
});

const productCodeInput = document.getElementById("productCode") ;
productCodeInput.addEventListener("input", (ev) => {
    socket.emit("input-changed", "Code in progress = " + ev.target.value)
});

const productPriceInput = document.getElementById("productPrice") ;
productPriceInput.addEventListener("input", (ev) => {
    socket.emit("input-changed", "Price in progress = " + ev.target.value)
});

socket.on("input-changed", (data) => {
    console.log(data);
    const receivedProductTitleInput = document.getElementById("receivedProductTitle");
    receivedProductTitleInput.innerHTML = data;

});

// export {titleProdcuctInput,descriptionProdcuctInput,codeProdcuctInput,priceProdcuctInput};