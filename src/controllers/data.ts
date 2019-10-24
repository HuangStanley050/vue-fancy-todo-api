import { Request, Response, NextFunction } from "express";
import Task from "../models/Task";

export default {
  deleteTodo: async (req: Request, res: Response, next: NextFunction) => {
    const taskId = req.params.id;
    console.log(taskId);
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

      res.json({ msg: "todo created!", newTask: result });
    } catch (err) {
      console.log(err);
    }
  }
};
