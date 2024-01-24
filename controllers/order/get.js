const { getModelDataByFilter } = require("../../utils/internalServerComms");
const { successResponse, errorResponse } = require("../../utils/response");

exports.GetAllOrders = async (req, res) => {
    try {
        const orderResponse = await getModelDataByFilter('Order', req.body, req.headers.authorization);

        successResponse(res, orderResponse.data.data, 'Orders fetched successfully');
    } catch (error) {
        const errorObject = error?.response?.data || error;
        errorResponse(res, errorObject, error?.response?.status || 500);
    }
}

exports.GetOrderById = async (req, res) => {
    try {
        const id = req.query.id
        if (!id) {
            return errorResponse(res, {
                status: "error",
                data: null,
                error: {
                    name: "Validation error",
                    message: "Id is required",
                    statusCode: 403
                }
            }, 403)
        }

        const orderResponse = await getModelDataByFilter('Order', { _id: id, ...req.body }, req.headers.authorization);
        if (!orderResponse.data.data[0].Order.length) {
            return errorResponse(res, {
                status: "error",
                data: null,
                error: {
                    name: "ModelDataNotFoundException",
                    message: "Order not found",
                    statusCode: 404
                }
            }, 404)
        }

        successResponse(res, orderResponse.data.data, 'Order fetched successfully');
    } catch (error) {
        const errorObject = error?.response?.data || error;
        errorResponse(res, errorObject, error?.response?.status || 500);
    }
}

exports.GetOrderByFilter = async (req, res) => {
    try {
        const orderResponse = await getModelDataByFilter('Order', req.body, req.headers.authorization);

        successResponse(res, orderResponse.data.data, 'Orders fetched successfully');
    } catch (error) {
        const errorObject = error?.response?.data || error;
        errorResponse(res, errorObject, error?.response?.status || 500);
    }
}