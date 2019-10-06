import express, { Response, Request, RequestHandler } from "express";
import cors from "cors";
import authRouter from "./routes/auth";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/auth", authRouter);

export default app;
