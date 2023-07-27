const { validationResult } = require('express-validator');
const OrderModel = require('../models/order.model');
const HttpException = require('../utils/HttpException.utils');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Order Controller
 ******************************************************************************/
class OrderController {
    getAllOrders = async (req, res, next) => {
        let orderList = await OrderModel.find({ user_id: req?.body?.user_id });
        res.send(orderList);
    };
    createOrders = async (req, res, next) => {
        if (!req?.body?.orders?.length) {
            throw new HttpException(404, 'Orders not found');
        }
        req?.body?.orders.map(async (data, index) => {
            const result = await OrderModel.create({...data, user_id: req?.body?.user_id});
            if (!result) {
                throw new HttpException(500, 'Something went wrong');
            }
        });

        res.status(201).send('Orders was created!');
    };

    updateOrder = async (req, res, next) => {
        this.checkValidation(req);
        const restOfUpdates = {
            product: req?.body?.order?.product ?? '',
            info: req?.body?.order?.info ?? '',
        };
        const result = await OrderModel.update(
            restOfUpdates,
            req?.params?.id ?? ''
        );

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows
            ? 'Order not found'
            : affectedRows && changedRows
            ? 'Order updated successfully'
            : 'Updated faild';

        res.send({ message, info });
    };

    deleteOrder = async (req, res, next) => {
        const result = await OrderModel.delete(req?.body?.delIds);
        if (!result) {
            throw new HttpException(404, 'Order not found');
        }
        res.send('Orders has been deleted');
    };

    checkValidation = (req) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    };
}

module.exports = new OrderController();
