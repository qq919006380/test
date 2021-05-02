let data = {
    code: "200",
    userId: params.userId,
    data: { a: "asd" },
    message: "成功了"
}
let error = {
    message: "缺少用户id"
}
module.exports = (params) => {
    if (params.userId) {
        return data
    } else {
        return error
    }
}
