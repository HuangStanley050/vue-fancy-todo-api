import { Request, Response, RequestHandler } from "express";

export default {
  login: async (req: Request, res: Response, next: RequestHandler) => {
    res.send("This is the login route");
  }
};
