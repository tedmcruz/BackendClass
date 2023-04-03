const socket = io();

// console.log("Greetings from products template");
socket.emit("message","Greetings from products template through websocket");

socket.on("message", (data) => {
    console.log(data);
});

// Chat Messages

const messageUserNameInput = document.getElementById("userName") ;
messageUserNameInput.addEventListener("input", (ev) => {
    socket.emit("input-message-changed", "Username in progress = " + ev.target.value)
});

const messageUserMessageInput = document.getElementById("userMessage") ;
messageUserMessageInput.addEventListener("input", (ev) => {
    socket.emit("input-message-changed", "Usermessage in progress = " + ev.target.value)
});

socket.on("input-message-changed", (data) => {
    console.log(data);
    const receivedMessageInformationInput = document.getElementById("receivedMessageInformation");
    receivedMessageInformationInput.innerHTML = data;

});

const buttonEnterForMessage = document.getElementById("buttonEnterForMessage")
buttonEnterForMessage.addEventListener("click", () => {       
        if (messageUserNameInput.value.trim().length > 0 && messageUserMessageInput.value.trim().length > 0){
        let userName = messageUserNameInput.value;
        let userMessage = messageUserMessageInput.value;
        socket.emit("input-message", userName, userMessage);
        }    
});

const listOfMessages = document.getElementById("listOfMessages");
// socket.on("create-message", (data) => {
socket.on("create-message", (data) => {
    console.log("console.log = "+ data.userName);

    // if (messageUserNameInput.value.trim().length > 0 && messageUserMessageInput.value.trim().length > 0){
            // let messages = "";
            const li = document.createElement("li");
            li.innerText = `${data.userName} : ${data.userMessage}`
            // li.innerText = `${messageUserNameInput.value} : ${messageUserMessageInput.value}`
            listOfMessages.appendChild(li);
            // data.forEach((m)=>{
            //     messages += `${m.messageUserNameInput.value} : ${m.messageUserMessageInput.value}`
            // })
            // listOfMessages.innerHTML = messages;
    // }
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