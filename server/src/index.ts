import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("Daraja API payment gateway");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
