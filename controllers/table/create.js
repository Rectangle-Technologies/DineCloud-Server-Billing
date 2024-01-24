const { saveDataByModel } = require("../../utils/internalServerComms")
const { errorResponse, successResponse } = require("../../utils/response")

exports.CreateTable = async (req, res) => {
    try {
        const data = req.body
        data.status = 'Available'

        const response = await saveDataByModel('Table', data, req.headers.authorization)

        successResponse(res, response.data.data, 'Table created successfully')
    } catch (error) {
        const errorObject = err?.response?.data || error
        errorResponse(res, errorObject, error?.response?.status || 500)
    }
}