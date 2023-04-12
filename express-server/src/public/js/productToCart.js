const socket = io();

socket.emit("message","Greetings from products template through websocket");

socket.on("message", (data) => {
    console.log(data);
});

const singleProductPageAddToCartButton= document.getElementById("singleProductPageAddToCartButton")
if(singleProductPageAddToCartButton){
    singleProductPageAddToCartButton.addEventListener("click", (ev) => {       
        const cartId = document.getElementById("singleProductPageCartId").value;
        const productId = document.getElementById("singleProductPageProductId").value;
        const quantity = 1;
        console.log(cartId);
        console.log(productId);
        socket.emit("singleProductPage-addProduct", cartId,productId,quantity)
    }   
    );
}