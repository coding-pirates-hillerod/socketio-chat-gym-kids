const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Multi User Chat</title>

  <style>
    body {
      background-color: #222;
      color: white;
      font-family: Arial, sans-serif;
      margin: 30px;
    }

    #messages {
      height: 300px;
      border: 1px solid white;
      padding: 10px;
      overflow-y: auto;
      margin-bottom: 10px;
    }

    input {
      width: 300px;
      padding: 10px;
    }

    button {
      padding: 10px;
      cursor: pointer;
    }
  </style>
</head>

<body>
  <h1>💬 Multi User Chat</h1>

  <div id="messages"></div>

  <input
    id="messageInput"
    placeholder="Skriv en besked..."
  />

  <button onclick="sendMessage()">
    Send
  </button>

  <script src="/socket.io/socket.io.js"></script>

  <script>
    const socket = io();

    const messages =
      document.getElementById("messages");

    function sendMessage() {
      const input =
        document.getElementById("messageInput");

      if (input.value.trim() === "") {
        return;
      }

      socket.emit(
        "chat-message",
        input.value
      );

      input.value = "";
    }

    socket.on(
      "chat-message",
      (message) => {
        const div =
          document.createElement("div");

        div.textContent = message;

        messages.appendChild(div);

        messages.scrollTop =
          messages.scrollHeight;
      }
    );
  </script>
</body>
</html>
  `);
});

io.on("connection", (socket) => {
  console.log("Bruger forbundet");

  socket.on("chat-message", (message) => {
    io.emit("chat-message", message);
  });
});

server.listen(3000, () => {
  console.log(
    "Server kører på http://localhost:3000"
  );
});