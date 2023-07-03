import mongoose from "mongoose";

const connectDB = async (url: string): Promise<void> => {
  try {
    await mongoose.connect(url);
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados:", error);
    process.exit(1);
  }
};

export default connectDB;
