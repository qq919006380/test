const path = require('path')

const getData = (req,pathname) => {
    var src=path.resolve(__dirname, '../src/mock'+pathname+".js")
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
                postData=JSON.parse(postData)
                var data=require(src)(postData);
                resolve(data)
            })
        }

    })

}
module.exports = (app) => {
    app.all("/*", (req, res) => {
        var url = new URL(req.url, `http://${req.headers.host}`);
        var pathname = url.pathname
        getData(req,pathname).then(postData => {
            res.json({ message: postData })           
        })

    })
}


