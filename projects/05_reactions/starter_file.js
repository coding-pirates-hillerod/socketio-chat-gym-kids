const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const nicknames = [
  "NinjaLama",
  "SuperPingvin",
  "CyberKat",
  "MegaPirat",
  "TurboRobot",
  "LaserHund",
  "CaptainCoder",
  "PixelHaj"
];

const colors = [
  "#ff6b6b",
  "#4ecdc4",
  "#ffe66d",
  "#95e1d3",
  "#a29bfe",
  "#fd79a8"
];

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Reactions Chat</title>

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

#reactions {
  height: 60px;
  margin-top: 10px;
  font-size: 36px;
}

input {
  width: 300px;
  padding: 10px;
}

button {
  padding: 10px;
  margin: 2px;
}
</style>
</head>

<body>

<h1>❤️ Reactions Chat</h1>

<div id="messages"></div>

<input
  id="messageInput"
  placeholder="Skriv en besked..."
>

<button onclick="sendMessage()">
  Send
</button>

<hr>

<button onclick="sendReaction('❤️')">❤️</button>
<button onclick="sendReaction('👍')">👍</button>
<button onclick="sendReaction('😂')">😂</button>
<button onclick="sendReaction('🎉')">🎉</button>

<div id="reactions"></div>

<script src="/socket.io/socket.io.js"></script>

<script>
const socket = io();

const messages =
  document.getElementById("messages");

const reactions =
  document.getElementById("reactions");

function sendMessage() {
  const input =
    document.getElementById("messageInput");

  if(input.value.trim() === "") {
    return;
  }

  socket.emit(
    "chat-message",
    input.value
  );

  input.value = "";
}

function sendReaction(emoji) {
  socket.emit("reaction", emoji);
}

socket.on(
  "chat-message",
  data => {
    const div =
      document.createElement("div");

    div.innerHTML =
      '<span style="color:' +
      data.color +
      ';font-weight:bold;">' +
      data.nickname +
      '</span>: ' +
      data.message;

    messages.appendChild(div);

    messages.scrollTop =
      messages.scrollHeight;
  }
);

socket.on(
  "reaction",
  emoji => {
    reactions.innerHTML = emoji;

    setTimeout(() => {
      reactions.innerHTML = "";
    }, 1500);
  }
);

document
  .getElementById("messageInput")
  .addEventListener("keydown", event => {
    if(event.key === "Enter") {
      sendMessage();
    }
  });
</script>

</body>
</html>
  `);
});

io.on("connection", socket => {
  const nickname =
    nicknames[
      Math.floor(
        Math.random() * nicknames.length
      )
    ];

  const color =
    colors[
      Math.floor(
        Math.random() * colors.length
      )
    ];

  socket.nickname = nickname;
  socket.color = color;

  io.emit(
    "chat-message",
    {
      nickname: "System",
      color: "#ffffff",
      message:
        nickname + " er kommet online 🎉"
    }
  );

  socket.on(
    "chat-message",
    message => {
      io.emit(
        "chat-message",
        {
          nickname: socket.nickname,
          color: socket.color,
          message
        }
      );
    }
  );

  socket.on(
    "reaction",
    emoji => {
      io.emit(
        "reaction",
        emoji
      );
    }
  );
});

server.listen(3000, () => {
  console.log(
    "Server kører på http://localhost:3000"
  );
});