const { getModelDataByFilter, saveDataByModel } = require("../../utils/internalServerComms");
const { successResponse, errorResponse } = require("../../utils/response");

exports.AddFoodItemsToOrder = async (req, res) => {
    try {
        if (!req.body.foodItems || !req.body.foodItems.length) {
            return errorResponse(res, {
                status: "error",
                data: null,
                error: {
                    name: "Validation error",
                    message: "Food items are required",
                    statusCode: 403
                }
            }, 403)
        }

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

        const orderResponse = await getModelDataByFilter('Order',
            { _id: id, branchId: req.body.branchId, branchCode: req.body.branchCode },
            req.headers.authorization);
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

        const order = orderResponse.data.data[0].Order[0];
        for (var foodItem of req.body.foodItems) {
            const foodItemResponse = await getModelDataByFilter('FoodItem',
                { _id: foodItem.foodItemId, branchId: req.body.branchId, branchCode: req.body.branchCode },
                req.headers.authorization);
            if (foodItemResponse.data.data[0].FoodItem.length) {
                foodItem.status = 'Being-Prepared'
                order.orderItems.push(foodItem);
            }
        }

        const updateOrderResponse = await saveDataByModel('Order', order, req.headers.authorization);
        successResponse(res, updateOrderResponse.data.data, 'Food items added successfully');
    } catch (error) {
        const errorObject = error?.response?.data || error;
        errorResponse(res, errorObject, error?.response?.status || 500);
    }
}

exports.RemoveFoodItemFromOrder = async (req, res) => {
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

        const orderResponse = await getModelDataByFilter('Order',
            { _id: id, branchId: req.body.branchId, branchCode: req.body.branchCode },
            req.headers.authorization);
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

        const order = orderResponse.data.data[0].Order[0];
        const foodItemIndex = order.orderItems.findIndex(foodItem => foodItem.foodItemId.toString() === req.body.foodItemId);
        if (foodItemIndex === -1) {
            return errorResponse(res, {
                status: "error",
                data: null,
                error: {
                    name: "ModelDataNotFoundException",
                    message: "Food item not found",
                    statusCode: 404
                }
            }, 404)
        }

        order.orderItems.splice(foodItemIndex, 1);
        const updateOrderResponse = await saveDataByModel('Order', order, req.headers.authorization);
        successResponse(res, updateOrderResponse.data.data, 'Food item removed successfully');
    } catch (error) {
        const errorObject = error?.response?.data || error;
        errorResponse(res, errorObject, error?.response?.status || 500);
    }
}

exports.MarkOrderItemDelivered = async (req, res) => {
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

        const orderResponse = await getModelDataByFilter('Order',
            { _id: id, branchId: req.body.branchId, branchCode: req.body.branchCode },
            req.headers.authorization);
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

        const order = orderResponse.data.data[0].Order[0];
        const foodItemIndex = order.orderItems.findIndex(foodItem => foodItem.foodItemId.toString() === req.body.foodItemId);
        if (foodItemIndex === -1) {
            return errorResponse(res, {
                status: "error",
                data: null,
                error: {
                    name: "ModelDataNotFoundException",
                    message: "Food item not found",
                    statusCode: 404
                }
            }, 404)
        }

        order.orderItems[foodItemIndex].status = 'Delivered';
        const updateOrderResponse = await saveDataByModel('Order', order, req.headers.authorization);
        successResponse(res, updateOrderResponse.data.data, 'Food item marked as delivered successfully');
    } catch (error) {
        const errorObject = error?.response?.data || error;
        errorResponse(res, errorObject, error?.response?.status || 500);
    }
}