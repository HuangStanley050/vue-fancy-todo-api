import { Request, Response, NextFunction } from "express";
import Task from "../models/Task";

export default {
  returnTodos: async (req: Request, res: Response, next: NextFunction) => {
    let tasks = await Task.find();
    res.json({ msg: "returning todos", tasks });
  },
  createTodo: async (req: Request, res: Response, next: NextFunction) => {
    const { title, information, date, creator } = req.body;
    const task = new Task({
      title,
      information,
      creator,
      dueDate: date,
      completed: false
    });
    try {
      await task.save();
    } catch (err) {
      console.log(err);
    }
    res.json({ msg: "todo created!" });
  }
};
