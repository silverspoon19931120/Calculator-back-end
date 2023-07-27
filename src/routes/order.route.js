const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

router.post('/', awaitHandlerFactory(orderController.getAllOrders)); // localhost:3000/api/v1/orders
router.post('/create', awaitHandlerFactory(orderController.createOrders)); // localhost:3000/api/v1/orders/create

router.post('/edit/:id', awaitHandlerFactory(orderController.updateOrder)); // localhost:3000/api/v1/orders/edit/id

router.post('/delete', awaitHandlerFactory(orderController.deleteOrder)); // localhost:3000/api/v1/orders/delete

module.exports = router;
