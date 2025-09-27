"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const startServer = async () => {
    const port = process.env.PORT || 5500;
    try {
        app_1.default.listen(port, () => {
            console.log(chalk_1.default.yellow.bold("🚀 Server Started Successfully!\n") +
                chalk_1.default.blueBright(`🌍 URL: `) +
                chalk_1.default.greenBright(`http://localhost:${port}\n`) +
                chalk_1.default.magentaBright(`📦 Database: `) +
                chalk_1.default.cyanBright("💡 Press CTRL + C to stop server"));
        });
    }
    catch (err) {
        console.log("failed ", err);
    }
};
startServer();
