import axios from 'axios';
const baseurl = location.origin//"http://localhost:8080"
const querystring = require('querystring')

// json 请求
let get = axios.create({
    baseURL: baseurl + "/"
});

// formData 请求 处理data部分，params可以照传（get请求）
let post = axios.create({
    baseURL: baseurl  ,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-control': 'no-cache'
    },
    
    transformRequest: [function (data) {
        if (!data || Object.keys(data).length <= 0) {
            return ""
        }
        let str = querystring.stringify(data);
        return str;
    }]
});
setAccessToken(post);


function setAccessToken(axios_instance) {
    axios_instance.interceptors.request.use(function (config) {
        /* 加上时间戳，避免缓存，暂时改用请求头的Cache-control */
        // if (!config.params) {
        //     config.params = {};
        // }
        // config.params._time_stamp = Date.now()

        /* 请求头加入accessToken */
        // if (store.state.accessToken) {
        //     config.headers.common["access-token"] = store.state.accessToken
        // }

        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    axios_instance.interceptors.response.use(function (response) {
        // if (response.headers['access-token']) {
        //     store.commit({
        //         type: "accessToken_change",
        //         accessToken: response.headers['access-token']
        //     })
        // }
        return response;
    }, function (error) {
        return Promise.reject(error);
    });
}

export {
    axios,
    post,
    get,
}
