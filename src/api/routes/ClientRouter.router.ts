import express from "express";
import { ClientController } from "../controllers/Client.controller";

const router = express.Router();

router
  .route("/clients")
  .get(ClientController.getClients)
  .post(ClientController.createClient);

router.delete("/clients/:clientId", ClientController.deleteClient);

export { router as default };
