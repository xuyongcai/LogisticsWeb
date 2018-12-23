import axios from 'axios';
import { Message } from 'element-ui';

// 创建axios实例
const service = axios.create({
    //baseURL: 'http://localhost:82', // api的base_url
    baseURL: 'http://localhost:8088', // api的base_url
    //baseURL: 'http://www.feitong56.cn:82', // api的base_url
    timeout: 5000                  // 请求超时时间
});

// respone拦截器
service.interceptors.response.use(
    response => {
        /**
         * code非0是抛错
         */
        const res = response.data;
        if (res.error_code == 1102){
            Message({
                showClose: true,
                message: "请重新登录",
                type: 'error',
                duration: 5 * 1000
            });
            location.href = '/';
        }
        else if (res.error_code !== 0) {
            Message({
                showClose: true,
                message: res.msg,
                type: 'error',
                duration: 5 * 1000
            });
            return Promise.reject(error);
        } else {
            return response.data;
        }
    },
    error => {
        console.log('err' + error);// for debug
        Message({
            showClose: true,
            message: '系统错误：'+error.message,
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(error);
    }
)

export default service;
