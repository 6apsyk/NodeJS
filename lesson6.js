const socket = require("socket.io");
const http = require("http");
const path = require("path");
const fs = require("fs");

const names = ["Иван", "Мария", "Петя", "Иван1", "Мария1", "Петя1"];
let index = 0;
let nameUser = "";

const server = http.createServer((req, res) => {
  const indexPath = path.join(__dirname, "./index.html");
  const readStream = fs.createReadStream(indexPath);

  readStream.pipe(res);
});

const io = socket(server);

io.on("connection", client => {
  client.on("disconnect", function () {
    console.log(`client ${client.id} disconnect`); // retrieve it from socket object
  });
  console.log(`client ${client.id} connected`);
  client.on("client-msg", data => {
    const nameUser = () => {
      if (index <= 5 && client.id) {
        return names[index++];
      } else {
        index = 0;
        return names[index];
      }
    };
    const payload = {
      message: data.message,
      name: nameUser(),
    };

    client.broadcast.emit("server-msg", payload);
    client.emit("server-msg", payload);
  });
});

server.listen(5555);
