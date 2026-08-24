const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const WIDTH = 800;
const HEIGHT = 500;

const PLAYER_SIZE = 30;
const STAR_SIZE = 20;
const PLAYER_SPEED = 10;

const players = {};

const stars = [
    { x: 100, y: 100 },
    { x: 300, y: 200 },
    { x: 600, y: 300 }
];

function broadcastGameState() {
    io.emit("game_state", {
        players,
        stars
    });
}

app.get("/", (req, res) => {

    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>Realtime Game</title>

    <style>

    body {
        background: #222;
        color: white;
        text-align: center;
        font-family: Arial, sans-serif;
    }

    #game {
        position: relative;
        width: ${WIDTH}px;
        height: ${HEIGHT}px;
        margin: auto;
        background: #333;
        border: 2px solid white;
        overflow: hidden;
    }

    .player {
        position: absolute;
        width: ${PLAYER_SIZE}px;
        height: ${PLAYER_SIZE}px;
        background: lime;
    }

    .star {
        position: absolute;
        width: ${STAR_SIZE}px;
        height: ${STAR_SIZE}px;
        background: gold;
        border-radius: 50%;
    }

    #score {
        margin: 20px;
        font-size: 32px;
    }

    </style>

</head>
<body>

    <h1>🎮 Realtime Game</h1>

    <div id="score">Score: 0</div>

    <div id="game"></div>

    <script src="/socket.io/socket.io.js"></script>

    <script>

    const socket = io();

    const game =
        document.getElementById("game");

    document.addEventListener(
        "keydown",
        (event) => {

            let dx = 0;
            let dy = 0;

            if (event.key === "ArrowLeft") {
                dx = -${PLAYER_SPEED};
            }

            if (event.key === "ArrowRight") {
                dx = ${PLAYER_SPEED};
            }

            if (event.key === "ArrowUp") {
                dy = -${PLAYER_SPEED};
            }

            if (event.key === "ArrowDown") {
                dy = ${PLAYER_SPEED};
            }

            socket.emit("move", {
                dx,
                dy
            });
        }
    );

    socket.on(
        "game_state",
        (state) => {

            game.innerHTML = "";

            for (const id in state.players) {

                const player =
                    state.players[id];

                const div =
                    document.createElement("div");

                div.className =
                    "player";

                div.style.left =
                    player.x + "px";

                div.style.top =
                    player.y + "px";

                game.appendChild(div);
            }

            state.stars.forEach(
                (star) => {

                    const div =
                        document.createElement("div");

                    div.className =
                        "star";

                    div.style.left =
                        star.x + "px";

                    div.style.top =
                        star.y + "px";

                    game.appendChild(div);
                }
            );

            if (state.players[socket.id]) {

                document.getElementById(
                    "score"
                ).innerText =
                    "Score: " +
                    state.players[socket.id].score;
            }
        }
    );

    </script>

</body>
</html>
    `);
});

io.on("connection", (socket) => {

    players[socket.id] = {
        x: Math.floor(Math.random() * 700),
        y: Math.floor(Math.random() * 400),
        score: 0
    };

    console.log("Player joined");

    broadcastGameState();

    socket.on(
        "move",
        ({ dx, dy }) => {

            const player =
                players[socket.id];

            if (!player) {
                return;
            }

            player.x += dx;
            player.y += dy;

            player.x = Math.max(
                0,
                Math.min(
                    player.x,
                    WIDTH - PLAYER_SIZE
                )
            );

            player.y = Math.max(
                0,
                Math.min(
                    player.y,
                    HEIGHT - PLAYER_SIZE
                )
            );

            stars.forEach(
                (star) => {

                    const hit =
                        Math.abs(player.x - star.x) < 25 &&
                        Math.abs(player.y - star.y) < 25;

                    if (hit) {

                        player.score++;

                        star.x =
                            Math.floor(
                                Math.random() *
                                (WIDTH - STAR_SIZE)
                            );

                        star.y =
                            Math.floor(
                                Math.random() *
                                (HEIGHT - STAR_SIZE)
                            );
                    }
                }
            );

            broadcastGameState();
        }
    );

    socket.on(
        "disconnect",
        () => {

            delete players[socket.id];

            console.log("Player left");

            broadcastGameState();
        }
    );
});

server.listen(3000, () => {

    console.log(
        "Server running on http://localhost:3000"
    );
});