const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const websocket = {
  clients: [],
  send: (message) => {
    send(message);
  }
};

io.on("connection", (socket) => {
  websocket.clients.push(socket);
  send("puppa connection");

  console.log("Socket connected");
  socket.on("event", (data) => {
    console.log(data);
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

http.listen();

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/src/index.html");
});

// Send to websocket
async function send(message) {
  io.emit("message", message);
}

module.exports = websocket;
