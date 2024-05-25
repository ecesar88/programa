import { Router } from 'express'
import { OrderController } from '../controllers/order'

const router = Router()
const PREFIX = '/orders'

router.route(PREFIX).get(OrderController.get).post(OrderController.create)

router.put(`${PREFIX}/:orderId`, OrderController.edit)
router.delete(`${PREFIX}/:orderId`, OrderController.delete)

export { router as default }
