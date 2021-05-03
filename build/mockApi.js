const path = require('path')

const getData = (req,pathname) => {
    /**
     * 注意截断api\这里需要优化
     */
    var appName="api"
    var src=path.resolve(__dirname, '../src/mock'+pathname+".js").replace(appName+"\\","")
    console.log("mock路径",src)
    return new Promise((resolve, reject) => {
        if (req.method == 'GET') {
            var data=require(src)(req.query);  
            resolve(data)
        } else if (req.method == 'POST') {
            let postData = ''
            req.on('data', chunk => {
                postData += chunk.toString()
            })
            req.on('end', () => {
                if (!postData) {
                    resolve({})
                    return
                }
                var data=require(src)(postData);
                resolve(data)
            })
        }

    })

}
module.exports = (app) => {
    app.all("/api/*", (req, res) => {
        var url = new URL(req.url, `http://${req.headers.host}`);
        var pathname = url.pathname
        getData(req,pathname).then(postData => {
            res.json(postData)           
        })

    })
}


