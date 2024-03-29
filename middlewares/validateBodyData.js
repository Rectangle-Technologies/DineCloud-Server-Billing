const JSONschemaCore = require('../models/JSONSchemaCore');
const JsonValidationEngine = require('@netra-development-solutions/json_validation_engine-lib');

// importing utils
const { errorResponse } = require('../utils/response');

const validateSchemaMiddleware = (generatedSchema, generateRoutes) => {
    const ValidationFunction = async (req, res, next) => {
        try {
            // get api endpoint
            const startTimestamp = new Date().getTime();
            var apiEndpoint = req.originalUrl.split('/')[req.originalUrl.split('/').length - 1];
            apiEndpoint = apiEndpoint.split('?')[0];

            const schemaKey = generateRoutes[`/${apiEndpoint}`].inputSchema.key;
            const version = generateRoutes[`/${apiEndpoint}`].inputSchema.version;

            const schemaIdentifier = `${schemaKey}_${version}`;
            var schemaResponse = generatedSchema[schemaIdentifier][req.user.clientCode];

            // Check if schema is already generated
            if (!generatedSchema[schemaIdentifier][req.user.clientCode]) {
                schemaResponse = (await JSONschemaCore.findOne({ key: schemaKey, version: version, clientCode: req.user.clientCode }));
            }

            const data = req.body;
            if (!schemaResponse) {
                return errorResponse(res, { error: 'Validation schema not found' }, 404);
            }

            schemaInstance = new JsonValidationEngine.ValidateSchema(data, schemaResponse.schema);

            const isValid = schemaInstance.validateData();
            const endTimestamp = new Date().getTime();

            const timeTaken = endTimestamp - startTimestamp;

            if (isValid) {
                return next();
            }

            return errorResponse(res, { schemaValidationResponse: isValid ? true : schemaInstance.errors, startTimestamp, endTimestamp, timeTaken }, 400);
        } catch (err) {
            const errorObject = err?.response?.data || err;
            return errorResponse(res, errorObject, 500);
        }
    }
    return ValidationFunction;
};

module.exports = { validateSchemaMiddleware };