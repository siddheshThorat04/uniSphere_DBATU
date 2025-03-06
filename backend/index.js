import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import http from "http";
import { Server } from "socket.io"

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

const PORT = process.env.PORT || 5000;
app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use(cors({ origin: ["http://localhost:5173", process.env.CLIENT_URL], credentials: true }));


app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/user", userRoutes)
let queue = {}; // Store users waiting for a match
let activeChats = {}; // Store active chat pairs

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // User joins the queue
  socket.on("joinQueue", () => {
    queue[socket.id] = true;

    let availableUsers = Object.keys(queue).filter((id) => id !== socket.id);

    if (availableUsers.length > 0) {
      let partnerId = availableUsers[0];

      delete queue[socket.id];
      delete queue[partnerId];

      activeChats[socket.id] = partnerId;
      activeChats[partnerId] = socket.id;

      io.to(socket.id).emit("matched", partnerId);
      io.to(partnerId).emit("matched", socket.id);
    }
  });

  // Handle messages
  socket.on("message", ({ receiver, message }) => {
    io.to(receiver).emit("message", { sender: socket.id, message });
  });

  // **Typing Indicator Events**
  socket.on("typing", () => {
    let partnerId = activeChats[socket.id];
    if (partnerId) {
      io.to(partnerId).emit("typing");
    }
  });

  socket.on("typing_stop", () => {
    let partnerId = activeChats[socket.id];
    if (partnerId) {
      io.to(partnerId).emit("typing_stop");
    }
  });

  // Handle user leaving the chat or navigating away
  socket.on("leaveChat", () => {
    let partnerId = activeChats[socket.id];

    if (partnerId) {
      io.to(partnerId).emit("partnerLeft");
      delete activeChats[partnerId];
    }
    delete activeChats[socket.id];
    queue[socket.id] = true;
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    let partnerId = activeChats[socket.id];

    if (partnerId) {
      io.to(partnerId).emit("partnerLeft");
      delete activeChats[partnerId];
    }
    delete activeChats[socket.id];
    delete queue[socket.id];
  });
});
server.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port: ", PORT);
});
