import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import http from "http";
import socket from "socket-io";

const __dirname = path.resolve();
const app = express();
const httpServer = http.createServer(app);
const io = socket(httpServer);

io.on("connection", (socket) => {
  socket.on("login", (nickname) => {
    console.log(`${nickname} connected`);
    io.emit("login", `${nickname}님이 채팅방에 입장했습니다.`);
    socket.nickname = nickname;
  });

  socket.on("chat", (msg) => {
    console.log(`${socket.nickname} send msg : ${msg}`);
    socket.broadcast.emit("chat", `${socket.nickname} : ${msg}`);
  });

  socket.on("forceDisconnect", () => {
    socket.broadcast.emit("chat", `${socket.nickname}님이 채팅방에서 나갔습니다.`);
    socket.disconnect();
  });

  socket.on("disconnect", () => {
    console.log(`${socket.nickname} disconnected`);
  });
});

const port = process.env.PORT || 3000;
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

httpServer.listen(port);
