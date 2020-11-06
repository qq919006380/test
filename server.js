const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    ctx.body = [
        {
            name: "leaf",
            leaf: true,
        },
        {
            name: "zone",
        },
    ]
})

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')