import { io } from "socket.io-client";
const socket = io();

const loginInput = document.querySelector(".login-input");
const loginSubmit = document.querySelector(".login-submit");
const chatInput = document.querySelector(".chat-input");
const chatSubmit = document.querySelector(".chat-submit");
const chatList = document.querySelector(".chat-list");
const disconnectBtn = document.querySelector(".disconnect-btn");

const makeChat = (msg) => {
  const $li = document.createElement("li");
  $li.innerText = msg;
  chatList.appendChild($li);
};

const onLoginSubmitClick = (e) => {
  e.preventDefault();
  const nickname = loginInput.value;
  socket.emit("login", nickname);
};

const onChatSubmitClick = (e) => {
  e.preventDefault();
  const msg = chatInput.value;
  socket.emit("chat", msg);
};

const onDisconnectBtnClick = (e) => {
  socket.emit("forceDisconnect");
};

loginSubmit.addEventListener("click", onLoginSubmitClick);
chatSubmit.addEventListener("click", onChatSubmitClick);
disconnectBtn.addEventListener("click", onDisconnectBtnClick);

socket.on("chat", (msg) => {
  makeChat(msg);
});
