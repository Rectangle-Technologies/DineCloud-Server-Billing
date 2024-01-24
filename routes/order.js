const { CreateOrder } = require("../controllers/order/create")
const { GetAllOrders, GetOrderById, GetOrderByFilter } = require("../controllers/order/get")
const { AddFoodItemsToOrder, RemoveFoodItemFromOrder, MarkOrderItemDelivered } = require("../controllers/order/update")
const { validateBranchMiddleware } = require("../middlewares/validateBranch")

const routes = [
    {
        path: '/createOrder',
        method: 'post',
        controller: CreateOrder,
        middlewares: [validateBranchMiddleware],
        inputSchema: {
            key: 'CreateOrderAPI',
            version: '1'
        },
        description: 'Create an order'
    },
    {
        path: '/getAllOrders',
        method: 'post',
        controller: GetAllOrders,
        middlewares: [validateBranchMiddleware],
        inputSchema: {
            key: 'GetFoodItemAPI',
            version: '1'
        },
        description: 'Get all orders'
    },
    {
        path: '/getOrderById',
        method: 'post',
        controller: GetOrderById,
        middlewares: [validateBranchMiddleware],
        inputSchema: {
            key: 'GetFoodItemAPI',
            version: '1'
        },
        description: 'Get order by id'
    },
    {
        path: '/getOrdersByFilter',
        method: 'post',
        controller: GetOrderByFilter,
        middlewares: [validateBranchMiddleware],
        inputSchema: {
            key: 'GetFoodItemAPI',
            version: '1'
        },
        description: 'Get orders by filter'
    },
    {
        path: '/addFoodItemsToOrder',
        method: 'put',
        controller: AddFoodItemsToOrder,
        middlewares: [validateBranchMiddleware],
        inputSchema: {
            key: 'AddFoodItemsToOrderAPI',
            version: '1'
        },
        description: 'Add food items to order'
    },
    {
        path: '/removeFoodItemFromOrder',
        method: 'put',
        controller: RemoveFoodItemFromOrder,
        middlewares: [validateBranchMiddleware],
        inputSchema: {
            key: 'RemoveFoodItemFromOrderAPI',
            version: '1'
        },
        description: 'Remove food item from order'
    },
    {
        path: '/markOrderItemDelivered',
        method: 'put',
        controller: MarkOrderItemDelivered,
        middlewares: [validateBranchMiddleware],
        inputSchema: {
            key: 'RemoveFoodItemFromOrderAPI',
            version: '1'
        },
        description: 'Mark order item delivered'
    }
]

module.exports = routes