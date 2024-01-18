import express from "express";
import { createClient } from "../controllers/Client.controller";

// const clientValidator = {
//   nome: z.string().name(),
//   phone: z.string().phoneNumber()
// }

const router = express.Router();

router.route("/clients").post(async (req, res) => {
  const clientData = req.body;

  // clientValidator.validar(clientData)

  try {
    const client = await createClient(clientData);
    return res.status(200).send(client);
  } catch (error) {
    return res.status(500).send(error);
  }
});

export { router as default };
