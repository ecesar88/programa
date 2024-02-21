import express from "express";
import { ClientController } from "../controllers/Client.controller";

const router = express.Router();

router
  .route("/clients")
  .get(ClientController.getClients)
  .post(ClientController.createClient);

router.put("/clients/:clientId", ClientController.editClient);
router.delete("/clients/:clientId", ClientController.deleteClient);

export { router as default };
