import axios from "axios";
export default {
  httpctrl(method, url, data, config = {}) {
    // if(config){
    //     config['headers']['Authorization']="Bearer "+localStorage.token;
    // }else{
    config = {
      'headers': {
        'Authorization': "Bearer " + localStorage.token
      }
    };
    // }

    return axios.request({
      baseURL: process.env.VUE_APP_APILOCAL,
      url: url,
      method: method,
      data: data,
      ...config
    });
  },
  post(url, data, config = {}) {
    return this.httpctrl("post", url, data, config);
  },
  get(url, data, config) {
    // const res=
    return this.httpctrl("get", url, data, config);
  },
  put(url, data, config) {},
}
