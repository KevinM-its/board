const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);
const publicPath = path.join(__dirname, "public");
const io = socketIO(server);

const PORT = process.env.PORT || 4000;

app.use(express.static(publicPath));

let idPlayer = 0;
const players = [];
const MAX_JUGADORES = 4;

io.on("connection", (socket) => {
  socket.on("player ready", (p) => {
    if (idPlayer === MAX_JUGADORES) return;

    players.push({ player: p, id: idPlayer });

    if (players.length === MAX_JUGADORES) {
      io.emit("start game", players);
      players.splice(0, players.length);
      idPlayer = -1;
    }

    idPlayer++;
    console.log(players, idPlayer);
  });

  socket.on("change", (coords) => {
    socket.broadcast.emit("update", coords);
  });
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
