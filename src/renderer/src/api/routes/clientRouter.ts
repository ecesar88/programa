import { Router } from 'express'
import { ClientController } from '../controllers/client'

const router = Router()
const PREFIX = '/clients'

router.route(PREFIX).get(ClientController.get).post(ClientController.create)

router.put(`${PREFIX}/:clientId`, ClientController.edit)
router.delete(`${PREFIX}/:clientId`, ClientController.delete)

export { router as default }
