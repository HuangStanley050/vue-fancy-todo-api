import { Request, Response, RequestHandler } from "express";
export default {
  createTodo: async (req: Request, res: Response, next: RequestHandler) => {
    //console.log(req.body);
    res.json({ msg: "todo created!" });
  }
};
