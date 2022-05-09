import express from "express";
import authenticateUser from "../middleware/auth.js";
import authRoutes from "./auth.routes.js";
import jobRoutes from "./job.routes.js";

const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ message: "Welcome" });
});

router.use("/auth", authRoutes);
router.use("/jobs", authenticateUser, jobRoutes);

export default router;