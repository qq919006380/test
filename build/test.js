const path = require('path')
var href=path.resolve(__dirname, '../src/mock/some.js')
console.log(href)

var fs = require('fs');
// 同步
try {
    // var xxx = fs.readFileSync(href, 'utf-8');
    var getData=require(href)({userId:"DSA2423"});
    console.log(getData)

    
} catch (err) {
    console.log(err)
}
// 异步
// fs.readFile('./src/mock/some.js', function (err, data) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data.toString('utf-8'));
//     }
// });
console.log(1)
setTimeout(() => {
    console.log("time")
}, 300);