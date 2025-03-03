import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import  http from "http";
import { Server } from "socket.io"
import path from "path";

import { connectDB } from "./db/connectDB.js";
import  authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin:["http://localhost:5173", "http://127.0.0.1:5173"],credentials:true},
});
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();


app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use(cors({ origin: "http://localhost:5173", credentials: true }));


app.use("/api/auth",authRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/user",userRoutes)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}


let users = [];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Add user to pool
  users.push(socket.id);

  // Match users
  if (users.length >= 2) {
    let user1 = users.shift();
    let user2 = users.shift();

    io.to(user1).emit("matched", user2);
    io.to(user2).emit("matched", user1);
  }

  // Handle messages
  socket.on("message", async ({ receiver, message }) => {
    io.to(receiver).emit("message", { sender: socket.id, message });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    users = users.filter((user) => user !== socket.id);
  });
});
// let chatQueue = []; // Only for users looking for random chat

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   // Join random chat queue
//   socket.on("joinChatQueue", () => {
//     if (!chatQueue.includes(socket.id)) {
//       chatQueue.push(socket.id);
//       console.log("User added to chat queue:", socket.id);
//     }

//     // Match users
//     if (chatQueue.length >= 2) {
//       let user1 = chatQueue.shift();
//       let user2 = chatQueue.shift();

//       io.to(user1).emit("matched", { partner: user2 });
//       io.to(user2).emit("matched", { partner: user1 });

//       console.log(`Matched ${user1} with ${user2}`);
//     }
//   });

//   // Remove user from queue when they leave "talkRandomly"
//   socket.on("leaveChatQueue", () => {
//     chatQueue = chatQueue.filter((user) => user !== socket.id);
//     console.log("User left chat queue:", socket.id);
//   });

//   // Handle messages
//   socket.on("message", ({ receiver, message }) => {
//     io.to(receiver).emit("message", { sender: socket.id, message });
//   });

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//     chatQueue = chatQueue.filter((user) => user !== socket.id);
//   });
// });

server.listen(PORT, () => {
	connectDB();
	console.log("Server is running on port: ", PORT);
});
