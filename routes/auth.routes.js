import express from "express";
import authenticateUser from "../middleware/auth.js";
import { login, register, update } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/update", authenticateUser, update);

export default router;