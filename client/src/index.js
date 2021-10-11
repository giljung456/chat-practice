import { io } from "socket.io-client";
const socket = io();

const loginInput = document.querySelector(".login-input");
const loginSubmit = document.querySelector(".login-submit");
const chatInput = document.querySelector(".chat-input");
const chatSubmit = document.querySelector(".chat-submit");
const nickChangeInput = document.querySelector(".change-input");
const nickChangeSubmit = document.querySelector(".change-submit");
const chatList = document.querySelector(".chat-list");
const disconnectBtn = document.querySelector(".disconnect-btn");

const onLoginSubmitClick = (e) => {
  e.preventDefault();
  const nickname = loginInput.value;
  socket.emit("login", nickname);
};

const onChatSubmitClick = (e) => {
  e.preventDefault();
  const msg = chatInput.value;
  chatInput.value = "";
  socket.emit("userChat", msg);
};

const onChangeBtnClick = (e) => {
  e.preventDefault();
  const newNickname = nickChangeInput.value;
  nickChangeInput.value = "";
  socket.emit("nicknameChange", newNickname);
};

const onDeleteBtnClick = ({ target }) => {
  const chat = target.closest("li");
  const chatId = chat.dataset.id;
  chat.innerText = "메세지를 삭제하였습니다.";
  socket.emit("deleteMyChat", chatId);
};

const onDisconnectBtnClick = (e) => {
  socket.emit("forceDisconnect");
};

const makeUserChat = (msg, isOwner, chatId) => {
  const $li = document.createElement("li");
  $li.dataset.id = chatId;
  $li.innerText = msg;
  chatList.appendChild($li);
  if (isOwner) {
    const $btn = document.createElement("button");
    $btn.addEventListener("click", onDeleteBtnClick);
    $btn.innerText = "삭제";
    $li.appendChild($btn);
  }
};

const makeAdminChat = (msg) => {
  const $li = document.createElement("li");
  $li.innerText = msg;
  chatList.appendChild($li);
};

loginSubmit.addEventListener("click", onLoginSubmitClick);
chatSubmit.addEventListener("click", onChatSubmitClick);
disconnectBtn.addEventListener("click", onDisconnectBtnClick);
nickChangeSubmit.addEventListener("click", onChangeBtnClick);

socket.on("userChat", (msg, isOwner, chatId) => {
  makeUserChat(msg, isOwner, chatId);
});

socket.on("adminChat", (msg) => {
  makeAdminChat(msg);
});

socket.on("deleteMyChat", (chatId) => {
  const chats = document.querySelectorAll("li");
  const targetChat = [...chats].find((chat) => chat.dataset.id === chatId);
  targetChat.innerText = "상대방에 의해 삭제된 메세지입니다.";
});
