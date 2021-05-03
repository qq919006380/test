import * as URL from './urlType.js'
import { axios, get, post } from './axios';
/**
 * 将对象转为url参数
 * @param {Object} urlobj 对象
 * @returns ?name=jack&age=18
 */
function objToUrlparamse(urlobj) {
  var paramse = "?"
  Object.keys(urlobj).forEach(val => {
    paramse += val + "=" + urlobj[val] + "&"
  })
  return paramse
}

function axiosFun(obj) {
  let axiosObject = {
    get: function (data) {
      return get({
        url: obj.url + objToUrlparamse(data),
        method: "get",
      }).catch(err => console.log(err))
    },
    post: function (data) {
      return post({
        url: obj.url,
        method: "post",
        data
      }).catch(err => console.log(err))
    },
  }

  return axiosObject[obj.type]
}
var Api = {}
for (const key in URL) {
  URL[key].forEach(obj => {
    if (Api[key]) {
      Api[key][obj.name] = axiosFun(obj)
    } else {
      Api[key] = {}
      Api[key][obj.name] = axiosFun(obj)
    }
  });
}

var plugin = {
  install: function (Vue) {
    Vue.prototype.$api = Api
    Vue.prototype.axios = axios
  },
}

export { plugin, axios }