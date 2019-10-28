import { Request, Response, NextFunction } from "express";
import Task from "../models/Task";
import mongoose from "mongoose";

export default {
  completeTodo: async (req: Request, res: Response, next: NextFunction) => {
    const taskId = req.params.id;
    try {
      await Task.findOneAndUpdate({ _id: taskId }, { completed: true });
      return res.json({ msg: "Task completed" });
    } catch (err) {
      return next(new Error("Unable to update todo"));
    }
  },
  deleteTodo: async (req: Request, res: Response, next: NextFunction) => {
    const taskId = req.params.id;
    try {
      await Task.deleteOne({ _id: taskId });
    } catch (err) {
      console.log(err);
      return next(new Error("Unable delete todo"));
    }
    res.json({ msg: "delete todo route" });
  },
  returnTodos: async (req: Request, res: Response, next: NextFunction) => {
    let tasks = await Task.find();

    res.json({ msg: "returning todos", tasks });
  },
  createTodo: async (req: Request, res: Response, next: NextFunction) => {
    const { title, information, date, creator } = req.body;
    let result;
    const task = new Task({
      title,
      information,
      creator,
      dueDate: date,
      completed: false
    });
    try {
      result = await task.save();

      return res.json({ msg: "todo created!", newTask: result });
    } catch (err) {
      return next(new Error("Unable to make todo"));
      console.log(err);
    }
  }
};
