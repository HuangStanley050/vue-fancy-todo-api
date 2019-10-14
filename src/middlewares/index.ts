import { Request, Response, NextFunction } from "express";
import * as firebase from "firebase-admin";
import { Error } from "../app";
export default {
  checkAuth: async (req: Request, res: Response, next: NextFunction) => {
    let token: string;
    const auth: firebase.auth.Auth = req.app.get("auth");
    if (!req.headers.authorization) {
      const error: Error = new Error("No auth in header");
      error.statusCode = 401;
      return next(error);
    }
    token = req.headers.authorization.split(" ")[1];
    try {
      await auth.verifyIdToken(token);
    } catch (err) {
      const error: Error = new Error("Unable to verify token");
      error.statusCode = 401;
      return next(error);
    }
    next();
  }
};
