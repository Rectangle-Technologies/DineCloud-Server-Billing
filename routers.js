const routers = [
    {
        path: '/table',
        router: require('./routes/table')
    },
    {
        path: '/order',
        router: require('./routes/order')
    }
]

module.exports = routers