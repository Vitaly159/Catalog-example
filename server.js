const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:999",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const dialogues = new Map();

app.get("/", (req, res) => {
  res.json(dialogues);
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);

  io.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(9999, () => {
  console.log("сервер запущен");
});
