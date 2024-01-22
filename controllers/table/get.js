const { getModelDataByFilter, getModelDataById } = require("../../utils/internalServerComms")
const { errorResponse, successResponse } = require("../../utils/response")

exports.GetAllTables = async (req, res) => {
    try {
        const response = await getModelDataByFilter('Table', {}, req.headers.authorization)

        successResponse(res, response.data.data, 'Table fetched successfully')
    } catch (error) {
        const errorObject = err?.response?.data || error
        errorResponse(res, errorObject, error?.response?.status || 500)
    }
}

exports.GetTableById = async (req, res) => {
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

        const response = await getModelDataById('Table', id, req.headers.authorization)

        if (!response.data.data[0].Table.length) {
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

        successResponse(res, response.data.data, 'Table fetched successfully')
    } catch (error) {
        const errorObject = err?.response?.data || error
        errorResponse(res, errorObject, error?.response?.status || 500)
    }
}