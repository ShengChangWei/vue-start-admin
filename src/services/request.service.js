import axios from 'axios';
import { getToken } from './auth.service';
import { Message } from 'element-ui';
import configService from './config.service';

const url = configService.domain;

// 创建一个axios
const request = axios.create({
  baseURL: url
});

/**
 * 请求拦截
 */
request.interceptors.request.use(config => {
  // 不是登录页面，请求头加上token值
  if (config.url !== '/login') {
    config.headers['Authorization'] = getToken();
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

/**
 * 响应拦截
 */
request.interceptors.response.use(
  response => {
    const res = response.data;
    return res;
  },
  // 成功后的回调
  error => {
    console.log('err' + error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default request;
