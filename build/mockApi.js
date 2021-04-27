
const getData = (req) => {
    return new Promise((resolve, reject) => {
        if (req.method == 'GET') {
            resolve(req.query)
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
                resolve(JSON.parse(postData))
            })
        }

    })

}
module.exports = (app) => {
    app.all("/some", (req, res) => {
        getData(req).then(postData => {
            console.log(postData)
            res.json({ aL: postData })
        })

    })
}


