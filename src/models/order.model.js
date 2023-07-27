const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const moment = require('moment');
class OrderModel {
    tableName = 'orders';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;
        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params);
        sql += ` WHERE ${columnSet}`;
        return await query(sql, [...values]);
    };

    create = async ({
        purchase_order,
        source_warehouse,
        destination_store,
        order_date,
        product,
        product_type,
        info,
        user_id
    }) => {
        const sql = `INSERT INTO ${this.tableName}
        (purchase_order, source_warehouse, destination_store, order_date, product, product_type, info, user_id) VALUES (?,?,?,?,?,?,?,?)`;

        const result = await query(sql, [
            purchase_order,
            source_warehouse,
            destination_store,
            moment(order_date, 'M/D/YYYY').format('YYYY-MM-DD'),
            product,
            product_type,
            info,
            user_id
        ]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    };

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params);
        const sql = `UPDATE orders SET ${columnSet} WHERE id = ?`;
        const result = await query(sql, [...values, id]);

        return result;
    };

    delete = async (ids) => {
        const idString = ids.join(',');
        const sql = `DELETE FROM ${this.tableName} WHERE id IN (${idString})`;
        const result = await query(sql);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    };
}

module.exports = new OrderModel();
