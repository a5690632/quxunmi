import axios from "../../plugins/axios";
import line from "../basic/basic";

/**
 *@method reqUserList 用户列表
 *@param {string} pageNo 页码
 *@param {string}  pageSize 每页数量
 */

export const reqUserList = ({ pageNo, pageSize }) => {
    return axios.post(`${line}getUserList`, { pageNo, pageSize });
};

/**
 * @method addUserInfo   添加用户
 * @param {string}  phone	是		手机号
 * @param {string}  nickName	是		昵称
 * @param {string}  headImg	是	头像地址
 * @param {string}  province	是	省份
 * @param {string}  city	    是		城市
 * @param {string}  age	    是		年龄
 * @param {int}     gender	是	性别：1男，2女
 * @param {string}  introduction	是	介绍
 */

export const addUserInfo = ({
    phone,
    nickName,
    headImg,
    province,
    city,
    age,
    gender,
    introduction
}) => {
    return axios.post(`${line}addUserInfo`, {
        phone,
        nickName,
        headImg,
        province,
        city,
        age,
        gender,
        introduction
    });
};
/**
 * @method reqUserDetail   修改用户
 * @param {string}  id	是		用户id
 */
export const reqUserDetail = ({ id }) => {
    return axios.post(`${line}getUserInfoDetail`, { id });
};

/**
 * @method updateUserInfo   修改用户
 * @param {string}  phone	是		手机号
 * @param {string}  nickName	是		昵称
 * @param {string}  headImg	是	头像地址
 * @param {string}  province	是	省份
 * @param {string}  city	    是		城市
 * @param {string}  age	    是		年龄
 * @param {int}     gender	是	性别：1男，2女
 * @param {string}  introduction	是	介绍
 */
export const updateUserInfo = ({
    phone,
    nickName,
    headImg,
    province,
    city,
    age,
    gender,
    introduction,
    id
}) => {
    return axios.post(`${line}updateUserInfo`, {
        phone,
        nickName,
        headImg,
        province,
        city,
        age,
        gender,
        introduction,
        id
    });
};

/**
 * @method reqDelUser  删除用户
 * @param {string} 用户id
 *
 */
export const reqDelUser = id => {
    return axios.post(`${line}delUser`, { id });
};

/**
 * @method putPriveteInfo   添加用户私密信息
 * @param {string}   userId	是		添加的用户id
 * @param {string}   wxNo	是	微信号
 * @param {Object}   privateInfo	 是		ta的个人档案
 * @param {string}   privateInfo.headImg	是		头像
 * @param {string}   privateInfo.wxNo	是		微信号
 * @param {string}   privateInfo.height	是		身高
 * @param {string}   privateInfo.weight	是		体重
 * @param {string}   privateInfo.shoeSize	是	鞋码
 * @param {string}   privateInfo.bustSize	是		胸围
 * @param {string}   privateInfo.waistSize	是		腰围
 * @param {string}   privateInfo.hipSize	是		臀围
 * @param {string}   privateInfo.eyeColor	是		目色
 * @param {string}   privateInfo.hairColor	是		发色
 * @param {object}   privateTags	是		个人标签
 * @param {string}   workExperience	是		工作经验
 *
 *
 */

export const putPriveteInfo = ({
    userId,
    wxNo,
    privateInfo,
    privateTags,
    workExperience
}) => {
    return axios.post(`${line}putPriveteInfo`, {
        userId,
        wxNo,
        privateInfo,
        privateTags,
        workExperience
    });
};

/**
 *  @method delPrivete 删除私密信息
 * @param {string} userId
 */

export const delPrivete = ({ userId }) => {
    return axios.post(`${line}delPrivete`, {
        userId
    });
};

/**
 *  @method reqPriveteInfo 获取私密信息
 * @param {string} userId 用户id
 */

export const reqPriveteInfo = ({ userId }) => {
    return axios.post(`${line}getPriveteInfo`, { userId });
};
