import axios from "../../plugins/axios";
import line from "../basic/basic";

export const qiniuAction = "https://upload-z0.qiniup.com";
export const qiniuUrl = "https://img.mybutlove.com/";
/**
 * @method getQiNiuToken 获取七牛
 *
 *
 */
export const getQiNiuToken = () => {
    return axios.post(`${line}getQiNiuToken`);
};

/**
 * @method  login    登录
 * @param {string}  phone
 * @param {string}  passwd
 */
export const reqLogin = ({ phone, passwd }) => {
    return axios.post(`${line}login`, { phone, passwd });
};

/**
 * @method  logout    登录
 * @param   {string}  userId
 */
export const logout = ({ userId }) => {
    return axios.post(`${line}logout`, { userId });
};
