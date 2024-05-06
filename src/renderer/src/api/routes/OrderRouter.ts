import { Router } from 'express'
import { OrderController } from '../controllers/Order'

const router = Router()
const PREFIX = '/orders'

router.route(PREFIX).get(OrderController.getOrder).post(OrderController.createOrder)

router.put(`${PREFIX}/:orderId`, OrderController.editOrder)
router.delete(`${PREFIX}/:orderId`, OrderController.deleteOrder)

export { router as default }
