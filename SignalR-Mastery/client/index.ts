import * as signalR from "@microsoft/signalr";
import { CustomLogger } from "./customLogger";

// create connection
let connection = new signalR.HubConnectionBuilder()
    .configureLogging(new CustomLogger())
    .withUrl("/hubs/view")
    .build();

// on view update message from client
connection.on("viewCountUpdate", (value: number) => {
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