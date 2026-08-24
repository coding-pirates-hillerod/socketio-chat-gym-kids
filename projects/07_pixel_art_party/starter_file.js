const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const ROWS = 20;
const COLS = 20;

const pixels = [];

for (let row = 0; row < ROWS; row++) {

    pixels[row] = [];

    for (let col = 0; col < COLS; col++) {

        pixels[row][col] = "#ffffff";
    }
}

app.get("/", (request, response) => {

    response.send(`
<!DOCTYPE html>
<html>
<head>

<title>Pixel Art Party</title>

<style>

body {
    background-color: #222;
    color: white;
    text-align: center;
    font-family: Arial, sans-serif;
}

#toolbar {
    margin-bottom: 20px;
}

button {
    width: 50px;
    height: 50px;
    border: none;
    cursor: pointer;
}

#grid {
    display: grid;
    grid-template-columns: repeat(${COLS}, 25px);
    justify-content: center;
    gap: 1px;
}

.pixel {
    width: 25px;
    height: 25px;
    background-color: white;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

</style>

</head>

<body>

<h1>🟨🟦🟥 Pixel Art Party</h1>

<div id="toolbar">

<button
    style="background:red"
    onclick="setColor('red')">
</button>

<button
    style="background:blue"
    onclick="setColor('blue')">
</button>

<button
    style="background:green"
    onclick="setColor('green')">
</button>

<button
    style="background:black"
    onclick="setColor('black')">
</button>

</div>

<div id="grid"></div>

<script src="/socket.io/socket.io.js"></script>

<script>

const socket = io();

let CURRENT_COLOR = "red";

function setColor(color) {
    CURRENT_COLOR = color;
}

const grid =
    document.getElementById(
        "grid"
    );

for (let row = 0; row < ${ROWS}; row++) {

    for (let col = 0; col < ${COLS}; col++) {

        const pixel =
            document.createElement("div");

        pixel.className = "pixel";

        pixel.id =
            "pixel-" + row + "-" + col;

        pixel.addEventListener(
            "click",
            () => {

                socket.emit(
                    "pixel_click",
                    {
                        row,
                        col,
                        color: CURRENT_COLOR
                    }
                );
            }
        );

        grid.appendChild(pixel);
    }
}

socket.on(
    "pixel_update",
    (data) => {

        const pixel =
            document.getElementById(
                "pixel-" +
                data.row +
                "-" +
                data.col
            );

        pixel.style.backgroundColor =
            data.color;
    }
);

socket.on(
    "load_pixels",
    (allPixels) => {

        for (
            let row = 0;
            row < allPixels.length;
            row++
        ) {

            for (
                let col = 0;
                col < allPixels[row].length;
                col++
            ) {

                const pixel =
                    document.getElementById(
                        "pixel-" +
                        row +
                        "-" +
                        col
                    );

                pixel.style.backgroundColor =
                    allPixels[row][col];
            }
        }
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
        "load_pixels",
        pixels
    );

    socket.on(
        "pixel_click",
        (data) => {

            pixels[data.row][data.col] =
                data.color;

            io.emit(
                "pixel_update",
                data
            );
        }
    );
});

server.listen(3000, () => {

    console.log(
        "Server running on http://localhost:3000"
    );
});