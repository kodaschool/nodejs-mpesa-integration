import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/lipaRoute";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Daraja API payment gateway");
});
app.use("/lipa", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
