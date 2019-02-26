import axios from "axios";

axios.interceptors.request.use(
    function(config) {
        const data = {
            osType: "server",
            accessToken: localStorage.getItem("accessToken"),
            timeStamp: "",
            sign: "",
            serviceData: JSON.stringify(config.data)
        };
        config.data = data;
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// 添加一个响应拦截器
axios.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        return Promise.reject(error);
    }
);

export default axios;
