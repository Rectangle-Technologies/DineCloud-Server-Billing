const mongoose = require('mongoose');

const jsonSchemaCoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    version: {
        type: String,
        required: true
    },
    schema: {
        type: Object,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    metadata: {
        type: Object,
        required: false
    }
});

module.exports = mongoose.model('JSONschemaCore', jsonSchemaCoreSchema);

// Path: root/models/JSONschemaCore.js