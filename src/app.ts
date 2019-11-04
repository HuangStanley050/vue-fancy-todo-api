import express, { Response, Request, RequestHandler } from "express";
import cors from "cors";
import * as admin from "firebase-admin";
import serviceAccount from "./graphql-gram-94075-firebase-adminsdk-ejim3-44c474bfe5.json";
import authRouter from "./routes/auth";
import dataRouter from "./routes/data";
import emailRouter from "./routes/email";
export interface Error {
  statusCode?: number;
  message?: string;
}

const params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url
};
admin.initializeApp({
  credential: admin.credential.cert(params)
});
const auth = admin.auth();
const app = express();

app.set("auth", auth);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/data", dataRouter);
app.use("/api/email", emailRouter);
app.use((err: Error, req: Request, res: Response, next: RequestHandler) => {
  const status: number = err.statusCode || 500;
  const message: string = err.message || "";

  res.status(status).json({ message: message });
});

export default app;
