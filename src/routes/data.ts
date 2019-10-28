import express from "express";
import DataController from "../controllers/data";
import Middleware from "../middlewares/";
const router = express.Router();

router
  .post("/createTodo", Middleware.checkAuth, DataController.createTodo)
  .patch("/updateTodo/:id", Middleware.checkAuth, DataController.completeTodo)
  .delete("/deleteTodo/:id", Middleware.checkAuth, DataController.deleteTodo)
  .get("/todos", Middleware.checkAuth, DataController.returnTodos);

export default router;
