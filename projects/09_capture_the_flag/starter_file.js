const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const WIDTH = 800;
const HEIGHT = 500;
const FLAG_SIZE = 40;

let score = 0;

let flag = {
    x: randomPosition(WIDTH - FLAG_SIZE),
    y: randomPosition(HEIGHT - FLAG_SIZE),
};

function randomPosition(max) {
    return Math.floor(
        Math.random() * max
    );
}

app.get("/", (request, response) => {

    response.send(`
<!DOCTYPE html>
<html>
<head>

<title>Capture The Flag</title>

<style>

body {
    background-color: #222;
    color: white;
    text-align: center;
    font-family: Arial, sans-serif;
}

#game {
    position: relative;
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    margin: auto;
    border: 2px solid white;
    background-color: #333;
}

#flag {
    position: absolute;
    width: ${FLAG_SIZE}px;
    height: ${FLAG_SIZE}px;
    font-size: 34px;
    cursor: pointer;
    user-select: none;
}

#score {
    font-size: 36px;
    margin: 20px;
}

</style>

</head>

<body>

<h1>🚩 Capture The Flag</h1>

<div id="score">Score: 0</div>

<div id="game">
    <div id="flag">🚩</div>
</div>

<script src="/socket.io/socket.io.js"></script>

<script>

const socket = io();

const flag =
    document.getElementById(
        "flag"
    );

flag.addEventListener(
    "click",
    () => {

        socket.emit(
            "flag_clicked"
        );
    }
);

socket.on(
    "game_update",
    (gameState) => {

        document.getElementById(
            "score"
        ).innerText =
            "Score: " + gameState.score;

        flag.style.left =
            gameState.flag.x + "px";

        flag.style.top =
            gameState.flag.y + "px";
    }
);

</script>

</body>
</html>
    `);
});

io.on("connection", (socket) => {

    console.log("User connected");

    socket.emit(
        "game_update",
        {
            score,
            flag
        }
    );

    socket.on(
        "flag_clicked",
        () => {

            score += 1;

            flag = {
                x: randomPosition(
                    WIDTH - FLAG_SIZE
                ),
                y: randomPosition(
                    HEIGHT - FLAG_SIZE
                ),
            };

            io.emit(
                "game_update",
                {
                    score,
                    flag
                }
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