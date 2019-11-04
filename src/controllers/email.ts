import { Response, Request, NextFunction } from "express";
import Task from "../models/Task";
import { TaskDocument } from "../models/Task";
import nodemailer from "nodemailer";
import { Error } from "../app";
export default {
  send: async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.body.id;
    let recipient: string;
    let title: string;
    let information: string;
    try {
      let result: TaskDocument | null = await Task.findById(id);
      if (result !== null) {
        recipient = result.creator;
        title = result.title;
        information = result.information;
      } else {
        throw new Error("Unable to find task");
      }
    } catch (err) {
      const error: Error = new Error("Unable to fetch todo");
      error.statusCode = 401;
      return next(error);
    }

    const transporter = nodemailer.createTransport({
      service: "yahoo",
      auth: {
        user: "infamous_godhand@yahoo.com",
        pass: process.env.EMAIL_PASSWD
      }
    });
    const mailOptions = {
      from: "infamous_godhand@yahoo.com",
      to: recipient,
      subject: title,
      text: information
    };
    try {
      await transporter.sendMail(mailOptions);
      res.send("email sent");
    } catch (err) {
      console.log(err);
    }
  }
};
