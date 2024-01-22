const { CreateTable } = require("../controllers/table/create");
const { DeleteTable } = require("../controllers/table/delete");
const { GetAllTables, GetTableById } = require("../controllers/table/get");
const { UpdateTable } = require("../controllers/table/update");
const { validateBranchMiddleware } = require("../middlewares/validateBranch");

const routes = [
    {
        path: '/createTable',
        method: 'post',
        controller: CreateTable,
        middlewares: [validateBranchMiddleware],
        inputSchema: {
            key: 'CreateTableAPI',
            version: '1'
        },
        description: 'Create a table'
    },
    {
        path: '/getAllTables',
        method: 'post',
        controller: GetAllTables,
        middlewares: [validateBranchMiddleware],
        inputSchema: {
            key: 'GetFoodItemAPI',
            version: '1'
        },
        description: 'Get all tables'
    },
    {
        path: '/getTableById',
        method: 'post',
        controller: GetTableById,
        middlewares: [validateBranchMiddleware],
        inputSchema: {
            key: 'GetFoodItemAPI',
            version: '1'
        },
        description: 'Get a table by id'
    },
    {
        path: '/updateTable',
        method: 'put',
        controller: UpdateTable,
        middlewares: [validateBranchMiddleware],
        inputSchema: {
            key: 'CreateTableAPI',
            version: '1'
        },
        description: 'Update a table'
    },
    {
        path: '/deleteTable',
        method: 'delete',
        controller: DeleteTable,
        middlewares: [validateBranchMiddleware],
        inputSchema: {
            key: 'GetFoodItemAPI',
            version: '1'
        },
        description: 'Delete a table'
    }
]

module.exports = routes;