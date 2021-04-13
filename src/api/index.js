import * as URL from './urlType.js'
import axios from 'axios';


var Api = {}
for (const key in URL) {
  URL[key].forEach(obj => {
    if (Api[key]) {
      Api[key][obj.name] = p
    } else {
      Api[key] = {}
      Api[key][obj.name] = p
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



function p(obj) {
  axios.get("http://localhost:8000/api/blog/list?id=22").then(function (res) {
    console.log(res)
  });
}





export default plugin