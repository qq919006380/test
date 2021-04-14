import * as URL from './urlType.js'
import { axios, json, form, micro } from './axios';

function axiosFun(obj) {
  let axiosObject = {
    json: function ajax(data) {
      return json({
        url: obj.url + "?id=" + data,
      }).catch(err => console.log(err))
    },
    form: function (data) {
      return form({
        url: obj.url,
        method: "post",
        data
      }).catch(err => this.errHandler(err))
    },
    micro: function (data) {
      return micro({
        url: obj.url,
        method: "post",
        data
      }).catch(err => this.errHandler(err));
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
    Vue.prototype.$form = Api


    Vue.prototype.axios = axios
  },
}

export { plugin, axios }