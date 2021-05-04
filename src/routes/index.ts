import { heroRoutes } from "./evaluate.route";
import express from "express";

const router = express.Router();

router.use("/", heroRoutes);

export default router;
