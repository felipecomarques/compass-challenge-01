import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import router from "./routes/routes";
import { connectDB } from "./data/database";

const app = express();
app.use(express.json());


// -- Home Page -- //
app.get("/", (req: Request, res: Response) => {
  res.send("Compass");
});

// -- Tutor routes -- //
app.use(router);

// // -- Pet routes -- //
// app.post("/pet/:tutorId", petController.createPet);
// app.put("/pet/:petId/tutor/:tutorId", petController.updatePet);
// app.delete("/pet/:petId/tutor/:tutorId", petController.deletePet);


// -- Start -- //
connectDB(process.env.MONGO_URI!)
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar com o banco de dados:", error);
    process.exit(1);
  });
