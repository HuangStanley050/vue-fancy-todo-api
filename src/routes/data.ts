import express from "express";
import DataController from "../controllers/data";
import Middleware from "../middlewares/";
const router = express.Router();

router
  .post("/createTodo", Middleware.checkAuth, DataController.createTodo)
  .get("/todos", Middleware.checkAuth, DataController.returnTodos);

export default router;
