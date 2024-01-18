import express from "express";
import dotenv from "dotenv";

import { ClientRouter } from "./routes";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = 3001;

app.get("/info", (_req, res) => {
  res.send("Version 0.0.1");
});

app.use(ClientRouter);

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
