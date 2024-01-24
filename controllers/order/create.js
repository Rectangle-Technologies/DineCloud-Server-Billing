const { errorResponse, successResponse } = require('../../utils/response');
const { saveDataByModel, getModelDataByFilter } = require('../../utils/internalServerComms');
const mongoose = require('mongoose');

exports.CreateOrder = async (req, res) => {
    try {
        const tableResponse = await getModelDataByFilter('Table',
            { _id: req.body.tableId, branchId: req.body.branchId, branchCode: req.body.branchCode },
            req.headers.authorization);
        if (!tableResponse.data.data[0].Table.length) {
            return errorResponse(res, {
                status: "error",
                data: null,
                error: {
                    name: "ModelDataNotFoundException",
                    message: "Table not found",
                    statusCode: 404
                }
            }, 404)
        }

        const data = req.body
        data.status = 'In-Progress'
        const orderResponse = await saveDataByModel('Order', data, req.headers.authorization)

        // Update table
        const table = tableResponse.data.data[0].Table[0]
        table.status = 'Occupied'
        table.runningOrderId = orderResponse.data.data[0].Order._id
        await saveDataByModel('Table', table, req.headers.authorization)

        successResponse(res, orderResponse.data.data, 'Order created successfully');
    } catch (error) {
        const errorObject = error?.response?.data || error;
        errorResponse(res, errorObject, error?.response?.status || 500);
    }
}