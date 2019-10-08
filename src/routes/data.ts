import express from "express";
import DataController from "../controllers/data";
const router = express.Router();

router.post("/createTodo", DataController.createTodo);

export default router;
