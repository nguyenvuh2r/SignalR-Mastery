"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var signalR = require("@microsoft/signalr");
// create connection
var connection = new signalR.HubConnectionBuilder().withUrl("/hubs/view").build();
// on view update message from client
connection.on("viewCountUpdate", function (value) {
    var counter = document.getElementById("viewCounter");
    counter.innerText = value.toString();
});
// notify server we're chatting
function notify() {
    connection.send("notifyWatching");
}
// start conntection
function startSuccess() {
    console.log("Connection success");
    notify();
}
function startFail() {
    console.log("Connection fail");
}
connection.start().then(startSuccess, startFail);
