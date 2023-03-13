const socket = io();
// console.log("Greetings from products template");
socket.emit("message","Greetings from products template through websocket")