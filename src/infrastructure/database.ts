import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/daily-trends");
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error al conectar con MongoDB", error);
    process.exit(1);
  }
};
