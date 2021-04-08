import * as URL from './urlType.js'
import axios from 'axios';

var Api = {
  install: function (Vue) {
    Vue.prototype.$api = this
    Vue.prototype.axios=axios
  },
}

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

function p(obj) {
  axios.get("http://localhost:8000/api/blog/list?id=22").then(function (res) {
    console.log(res)
  });
}
export default Api