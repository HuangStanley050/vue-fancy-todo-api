import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { Error } from "../app";

const auth_endPoint: string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
  process.env.API_KEY
}`;

export default {
  login: async (req: Request, res: Response, next: NextFunction) => {
    const email: string = req.body.email;
    const password: string = req.body.password;
    let loginResult: { data: { idToken: string; email: string } };
    const loginData: {
      email: string;
      password: string;
      returnSecureToken: boolean;
    } = {
      email,
      password,
      returnSecureToken: true
    };
    try {
      loginResult = await axios.post(auth_endPoint, loginData);

      res.json({
        msg: "login successful",
        data: { token: loginResult.data.idToken, email: loginResult.data.email }
      });
    } catch (err) {
      console.log(err);
      const error: Error = new Error("Login failed");
      error.statusCode = 401;
      return next(error);
    }
  }
};
