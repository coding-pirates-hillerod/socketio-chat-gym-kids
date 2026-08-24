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

    <title>Drawing Board</title>

    <style>

        body {
            background-color: #222;
            color: white;
            text-align: center;
            font-family: Arial, sans-serif;
        }

        canvas {
            background-color: white;
            border: 2px solid black;
            margin-top: 20px;
        }

    </style>

</head>

<body>

    <h1>🎨 Drawing Board</h1>

    <p>Tegn med musen</p>

    <canvas
        id="canvas"
        width="800"
        height="500"
    ></canvas>

    <script src="/socket.io/socket.io.js"></script>

    <script>

        const socket = io();

        const canvas =
            document.getElementById(
                "canvas"
            );

        const context =
            canvas.getContext("2d");

        let drawing = false;

        canvas.addEventListener(
            "mousedown",
            () => {
                drawing = true;
            }
        );

        canvas.addEventListener(
            "mouseup",
            () => {
                drawing = false;
            }
        );

        canvas.addEventListener(
            "mouseleave",
            () => {
                drawing = false;
            }
        );

        canvas.addEventListener(
            "mousemove",
            (event) => {

                if (!drawing) {
                    return;
                }

                const rect =
                    canvas.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                socket.emit(
                    "draw",
                    {
                        x,
                        y
                    }
                );
            }
        );

        socket.on(
            "draw",
            (data) => {

                context.fillStyle =
                    "black";

                context.beginPath();

                context.arc(
                    data.x,
                    data.y,
                    4,
                    0,
                    Math.PI * 2
                );

                context.fill();
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
        "draw",
        (data) => {

            io.emit(
                "draw",
                data
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