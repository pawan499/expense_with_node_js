import chalk from "chalk"
import app from "./app"
import dotenv from 'dotenv'
import { connectDb } from "./config/db"
import http from "http";
import Message from "./models/Message"; 
dotenv.config()


const startServer = async () => {
    const port = process.env.PORT || 5500
    try {
        await connectDb()
        app.listen(port, () => {
            console.log(
                chalk.white("\n======================================\n")+
                chalk.yellow.bold("🚀 Server Started Successfully!\n") +
                chalk.blueBright(`🌍 URL:`) +
                chalk.greenBright(`http://localhost:${port}\n`) +
                chalk.cyanBright("💡 Press CTRL + C to stop server")
            );
        })
    } catch (err) {
       console.log(chalk.red("❌ Failed to start server"));
    console.error(err);
    }
}

startServer()