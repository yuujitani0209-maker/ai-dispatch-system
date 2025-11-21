const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// modules
const dispatch = require("../srcmodules/dispatch");
const driver = require("../srcmodules/driver");
const invoice = require("../srcmodules/invoice");

app.use("/api/dispatch", dispatch);
app.use("/api/driver", driver);
app.use("/api/invoice", invoice);

// socket.io live board
io.on("connection", (socket) => {
  console.log("A dispatcher connected");
  socket.on("update-board", (data) => {
    io.emit("board-updated", data);
  });
});

server.listen(3000, () => {
  console.log("AI Dispatch System running on port 3000");
});
