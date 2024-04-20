import express from "express";
import { generateToken } from "../middlewares/generateToken";
import { handleStkPush } from "../controllers/stkController";
const router = express.Router();
router.post("/stk", handleStkPush);
export default router;
