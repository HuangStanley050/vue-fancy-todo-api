import express from "express";
import EmailController from "../controllers/email";
import Middleware from "../middlewares";
const router = express.Router();

router.post("/send", Middleware.checkAuth, EmailController.send);

export default router;
