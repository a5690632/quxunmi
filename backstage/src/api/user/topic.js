import line from "../basic/basic";
import axios from "../../plugins/axios";

/**
 *   @method reqTopicList  获取帖子列表
 *  @param {string} id 用户id
 *  @param {string} pageNo 页码
 *  @param {string} pageSize 每页数量
 */

export const reqTopicList = ({ userId, pageNo, pageSize }) => {
    return axios.post(`${line}getTopicList`, { userId, pageNo, pageSize });
};

/**
 * @method reqTopicDetail 获取帖子详情
 *
 */

export const reqTopicDetail = param => {
    return axios.post(`${line}getTopicDetail`, { param });
};

/**
 * @method removeTopic 删除帖子
 *
 */

export const removeTopic = () => {
    return axios.post(`${line}delTopic`);
};

/**
 * @method saveTopic   添加帖子
 * @param {string}      userId          用户id
 * @param {string}      title           标题
 * @param {string}     content			内容
 * @param {string}     city			    城市
 * @param {string}     province			省份
 * @param {array}      archives		    图片url 列表
 */

export const saveTopic = ({
    userId,
    title,
    content,
    city,
    province,
    archives
}) => {
    return axios.post(`${line}saveTopic`, {
        userId,
        title,
        content,
        city,
        province,
        archives
    });
};

/**
 * @method updateTopic   编辑帖子
 * @param {string}      userId          用户id
 * @param {string}      title           标题
 * @param {string}     content			内容
 * @param {string}     city			    城市
 * @param {string}     province			省份
 * @param {array}      archives		    图片url 列表
 */

export const updateTopic = ({
    userId,
    title,
    content,
    city,
    province,
    archives
}) => {
    return axios.post(`${line}updateTopic`, {
        userId,
        title,
        content,
        city,
        province,
        archives
    });
};
