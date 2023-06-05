import express, { Request, Response } from "express";
import tutorRoutes from './routes/tutorRoutes';
import petRoutes from "./routes/petRoutes";

const app = express();
app.use(express.json());

// -- Home Page -- //
app.get("/", (req: Request, res: Response) => {
  res.send("Compass");
});

// -- Routes -- //
app.use(tutorRoutes);
app.use(petRoutes);

// -- Server -- //
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
