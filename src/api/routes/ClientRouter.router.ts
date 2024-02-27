import express from "express";
import { ClientController } from "../controllers/Client.controller";

const router = express.Router();
const PREFIX = "/clients";

router
  .route(PREFIX)
  .get(ClientController.getClients)
  .post(ClientController.createClient);

router.put(`${PREFIX}/:clientId`, ClientController.editClient);
router.delete(`${PREFIX}/:clientId`, ClientController.deleteClient);

export { router as default };
