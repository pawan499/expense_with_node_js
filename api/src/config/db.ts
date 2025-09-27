import chalk from "chalk";
import mongoose from "mongoose";

export const connectDb = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log(chalk.red("❌ MONGODB_URI is missing in environment variables"));
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      autoIndex: true,
      maxPoolSize: 10, 
    });
    console.log("================================\n")
    console.log(chalk.greenBright("✅ Database connected successfully!"));
  } catch (err) {
    console.log(chalk.red("❌ Database connection failed"));
    console.error(err);
    process.exit(1);
  }
};
