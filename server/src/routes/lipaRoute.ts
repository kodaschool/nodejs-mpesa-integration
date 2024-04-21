import express from "express";
import { handleStkPush } from "../controllers/stkController";
import { generateToken } from "../middlewares/generateToken";
const router = express.Router();
router.post("/stkpush", generateToken, handleStkPush);
export default router;
