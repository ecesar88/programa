import express from "express";
import { ClientController } from "../controllers/Client.controller";

const router = express.Router();

router.route("/clients").post(async (req, res) => {
  return await ClientController.createClient(req, res);
});

export { router as default };
