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
    // console.log(data);
    const receivedProductInformationInput = document.getElementById("receivedProductInformation");
    receivedProductInformationInput.innerHTML = data;

});

const buttonEnter = document.getElementById("buttonEnter")
buttonEnter.addEventListener("click", (ev) => {       
        if (productTitleInput.value.trim().length > 0 && productDescriptionInput.value.trim().length > 0 && productCodeInput.value.trim().length > 0 && productPriceInput.value.trim().length > 0){
        let title = productTitleInput.value;
        let description = productDescriptionInput.value;
        let code = productCodeInput.value;
        let price = productPriceInput.value;
        socket.emit("input-product", title, description, code, price)
        }    
});

const listOfProducts = document.getElementById("listOfProducts");
socket.on("input-product", (data) => {
    // console.log(data);
    // listOfProducts.innerHTML="";

    if (productTitleInput.value.trim().length > 0 && productDescriptionInput.value.trim().length > 0 && productCodeInput.value.trim().length > 0 && productPriceInput.value.trim().length > 0){
        // for (const el of data) {
            const li = document.createElement("li");
            li.innerText = `${productTitleInput.value} = ${productPriceInput.value} pesos`
            listOfProducts.appendChild(li);
        // }
    }
});

// productTitleInput.addEventListener("keyup", (ev) => {
//     if(ev.key === "Enter"){        
//         if (productTitleInput.value.trim().length > 0 && productDescriptionInput.value.trim().length > 0 && productCodeInput.value.trim().length > 0 && productPriceInput.value.trim().length > 0){
//         let title = productTitleInput.value;
//         let description = productDescriptionInput.value;
//         let code = productCodeInput.value;
//         let price = productPriceInput.value;
//         socket.emit("input-title", title, description, code, price)
//         }    
//     }
// });


// const productToAddDescription = document.getElementById("productDescription");
// productToAddDescription.addEventListener("keyup", (ev) => {
//     if(ev.key === "Enter"){
//         const descriptionInput = productToAddDescription.value;
        
//         if (descriptionInput.trim().length > 0)
//         socket.emit("input-description", descriptionInput)
//     }
// });

// const createProductSubmit = document.getElementById("createProductSubmitButton");
// productTitleInput.addEventListener("keypress", function(event) {
//       const newProduct = {
//         title : document.getElementById("productTitle"),
//         description : document.getElementById("productDescription"),
//         code : document.getElementById("productCode"),
//         price : document.getElementById("productPrice"),
//     }
//     if (event.key === "Enter") {
//         event.preventDefault();
//         document.getElementById("createProductSubmitButton").click();
//       }
//     console.log ("Console.log worked, title = "+newProduct)
//     socket.emit("submit-new-product",newProduct)
// })

// export { productTitleInput,productDescriptionInput,productCodeInput,productPriceInput};