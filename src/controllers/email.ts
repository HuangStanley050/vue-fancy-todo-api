import { Response, Request, NextFunction } from "express";
import nodemailer from "nodemailer";
export default {
  send: async (req: Request, res: Response, next: NextFunction) => {
    const transporter = nodemailer.createTransport({
      service: "yahoo",
      auth: {
        user: "infamous_godhand@yahoo.com",
        pass: process.env.EMAIL_PASSWD
      }
    });
    const mailOptions = {
      from: "infamous_godhand@yahoo.com",
      to: "ewgodhand@gmail.com",
      subject: "Sending Email using Node.js",
      text: "That was easy!"
    };
    try {
      await transporter.sendMail(mailOptions);
      res.send("email sent");
    } catch (err) {
      console.log(err);
    }
  }
};
