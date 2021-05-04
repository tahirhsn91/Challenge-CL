import express from "express";
import evaluateController from "../controllers";

const router = express.Router();

router.post("/evaluate", evaluateController.evaluate);

export const heroRoutes = router;
