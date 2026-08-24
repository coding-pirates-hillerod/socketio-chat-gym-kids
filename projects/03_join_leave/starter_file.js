const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let userCount = 0;

app.get("/", (request, response) => {

    response.send(`
<!DOCTYPE html>
<html>
<head>

    <title>Join & Leave Chat</title>

    <style>

        body {
            background-color: #222;
            color: white;
            font-family: Arial, sans-serif;
            text-align: center;
            padding-top: 50px;
        }

        input {
            padding: 10px;
            width: 300px;
        }

        button {
            padding: 10px;
            margin-left: 10px;
            cursor: pointer;
        }

        #userCount {
            margin-top: 20px;
            font-size: 24px;
            color: #00ff88;
        }

        #messages {
            margin-top: 30px;
        }

        p {
            margin: 8px;
        }

    </style>

</head>

<body>

    <h1>👋 Join & Leave Chat</h1>

    <input
        id="messageInput"
        placeholder="Skriv en besked"
    />

    <button onclick="sendMessage()">
        Send
    </button>

    <div id="userCount">
        Brugere online: 0
    </div>

    <div id="messages"></div>

    <script src="/socket.io/socket.io.js"></script>

    <script>

        const socket = io();

        function sendMessage() {

            const input =
                document.getElementById(
                    "messageInput"
                );

            const message = input.value;

            if (message.trim() === "") {
                return;
            }

            socket.emit(
                "chat_message",
                message
            );

            input.value = "";
        }

        socket.on(
            "chat_message",
            (message) => {

                const messages =
                    document.getElementById(
                        "messages"
                    );

                messages.innerHTML +=
                    "<p>" + message + "</p>";
            }
        );

        socket.on(
            "user_count",
            (count) => {

                document.getElementById(
                    "userCount"
                ).innerText =
                    "Brugere online: " + count;
            }
        );

    </script>

</body>
</html>
    `);
});

io.on("connection", (socket) => {

    userCount++;

    console.log("User connected");

    io.emit(
        "chat_message",
        "En bruger joinede chatten 👋"
    );

    io.emit(
        "user_count",
        userCount
    );

    socket.on(
        "chat_message",
        (message) => {

            io.emit(
                "chat_message",
                message
            );
        }
    );

    socket.on(
        "disconnect",
        () => {

            userCount--;

            console.log("User disconnected");

            io.emit(
                "chat_message",
                "En bruger forlod chatten 👋"
            );

            io.emit(
                "user_count",
                userCount
            );
        }
    );
});

server.listen(3000, () => {

    console.log(
        "Server running on http://localhost:3000"
    );
});