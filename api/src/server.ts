import http from "http";
import { Server } from "socket.io";
import chalk from "chalk";
import app from "./app";
import dotenv from 'dotenv';
import { connectDb } from "./config/db";
import Message from "./models/Message";

dotenv.config();

const startServer = async () => {
  const port = process.env.PORT || 5500;
  try {
    await connectDb();

    const server = http.createServer(app);

    const io = new Server(server, {
      cors: {
        origin: ["http://localhost:3000","http://192.168.31.55:3000"],
        methods: ["GET", "POST","PUT"]
      }
    });

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("joinRoom", (roomId: string) => {
        socket.join(roomId);
      });

      socket.on("sendMessage", async (data: any) => {
        try {
          const message = await Message.create(data);
          io.to(data.receiverId).emit("receiveMessage", message);
        } catch (err) {
          console.error("Error saving message:", err);
        }
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });

    server.listen(port, () => {
      console.log(
        chalk.white("\n======================================\n") +
        chalk.yellow.bold("🚀 Server Started Successfully!\n") +
        chalk.blueBright(`🌍 URL:`) +
        chalk.greenBright(`http://localhost:${port}\n`) +
        chalk.cyanBright("💡 Press CTRL + C to stop server")
      );
    });

  } catch (err) {
    console.log(chalk.red("❌ Failed to start server"));
    console.error(err);
  }
};

startServer();
