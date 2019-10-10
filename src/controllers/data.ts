import { Request, Response, RequestHandler } from "express";
import Task from "../models/Task";

export default {
  createTodo: async (req: Request, res: Response, next: RequestHandler) => {
    const { title, information, date } = req.body;
    const task = new Task({
      title,
      information,
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
