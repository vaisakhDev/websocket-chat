const WebSocket = require("ws");

// Decode a stream of binary data (a buffer object) into a string:
const StringDecoder = require("string_decoder").StringDecoder;
const decoder = new StringDecoder("utf8");

const webSocketServer = new WebSocket.Server({ port: 8080 });

webSocketServer.on("connection", (webSocket) => {
  webSocket.on("message", (dataBuffer) => {
    const data = decoder.write(dataBuffer);
    console.log("Received", data);
    broadcast(data);
  });
});

function broadcast(data) {
  webSocketServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}
