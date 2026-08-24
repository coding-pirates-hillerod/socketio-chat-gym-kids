const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (request, response) => {
    response.send(`
<!DOCTYPE html>
<html>
<head>
    <title>Echo Chat</title>

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

        #messages {
            margin-top: 30px;
        }
    </style>
</head>

<body>

    <h1>🦜 Echo Chat</h1>

    <input
        id="messageInput"
        placeholder="Skriv en besked"
    />

    <button onclick="sendMessage()">
        Send
    </button>

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
            "chat_reply",
            (message) => {

                const messages =
                    document.getElementById(
                        "messages"
                    );

                messages.innerHTML +=
                    "<p>" + message + "</p>";
            }
        );

    </script>

</body>
</html>
    `);
});

io.on("connection", (socket) => {

    console.log("User connected");

    socket.on(
        "chat_message",
        (message) => {

            console.log(
                "Message received:",
                message
            );

            socket.emit(
                "chat_reply",
                message
            );
        }
    );
});

server.listen(3000, () => {

    console.log(
        "Server running on http://localhost:3000"
    );
});