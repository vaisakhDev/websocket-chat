const connection = new WebSocket("ws://localhost:8080");

connection.onopen = () => {
  console.log("connected");
};

connection.onclose = () => {
  console.error("disconnected");
};

connection.onerror = (error) => {
  console.error("failed to connect", error);
};

connection.onmessage = (event) => {
  var data = JSON.parse(event.data);
  const messageData = JSON.parse(data);
  let li = document.createElement("li");
  li.innerText = messageData.data;
  document.querySelector("#chat").append(li);
};

function sendMessage(messageText) {
  const msgObject = {
    type: "message",
    data: messageText,
  };
  connection.send(JSON.stringify(msgObject));
}

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  let message = document.querySelector("#message").value;
  sendMessage(message);
  document.querySelector("#message").value = "";
});
