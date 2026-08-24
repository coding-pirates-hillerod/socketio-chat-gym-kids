const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let score = 0;

app.get("/", (request, response) => {

    response.send(`
<!DOCTYPE html>
<html>
<head>

    <title>Multiplayer Clicker</title>

    <style>

        body {
            background-color: #222;
            color: white;
            text-align: center;
            font-family: Arial, sans-serif;
            padding-top: 60px;
        }

        h1 {
            font-size: 56px;
        }

        #score {
            font-size: 72px;
            margin: 30px;
        }

        button {
            font-size: 32px;
            padding: 20px 40px;
            cursor: pointer;
            border: none;
            border-radius: 10px;
            background-color: #00aa00;
            color: white;
        }

    </style>

</head>

<body>

    <h1>🖱️ Multiplayer Clicker</h1>

    <div id="score">0</div>

    <button onclick="clickButton()">
        CLICK!
    </button>

    <script src="/socket.io/socket.io.js"></script>

    <script>

        const socket = io();

        function clickButton() {

            socket.emit(
                "button_click"
            );
        }

        socket.on(
            "score_update",
            (newScore) => {

                document.getElementById(
                    "score"
                ).innerText = newScore;
            }
        );

    </script>

</body>
</html>
    `);
});

io.on("connection", (socket) => {

    console.log("User connected");

    // Send nuværende score til ny bruger
    socket.emit(
        "score_update",
        score
    );

    socket.on(
        "button_click",
        () => {

            score += 1;

            io.emit(
                "score_update",
                score
            );
        }
    );

    socket.on(
        "disconnect",
        () => {

            console.log(
                "User disconnected"
            );
        }
    );
});

server.listen(3000, () => {

    console.log(
        "Server running on http://localhost:3000"
    );
});