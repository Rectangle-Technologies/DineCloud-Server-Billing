const { getModelDataById, saveDataByModel } = require("../../utils/internalServerComms")
const { errorResponse, successResponse } = require("../../utils/response")

exports.UpdateTable = async (req, res) => {
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

        const tableResponse = await getModelDataById('Table', id, req.headers.authorization)
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

        const updateResponse = await saveDataByModel('Table', { _id: id, ...req.body }, req.headers.authorization)
        successResponse(res, updateResponse.data.data, 'Table updated successfully')
    } catch (error) {
        const errorObject = error?.response?.data || error
        errorResponse(res, errorObject, error?.response?.status || 500)
    }
}