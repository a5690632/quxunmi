import * as actionTypes from "./actionTypes";
import {
    putPriveteInfo,
    reqUserList,
    reqDelUser,
    reqUserDetail,
    updateUserInfo,
    addUserInfo
} from "../../../api/user/user";
import {
    reqTopicList,
    saveTopic,
    removeTopic,
    updateTopic,
    reqTopicDetail
} from "../../../api/user/topic";

import { message } from "antd";

const clearUserDetail = () => ({ type: actionTypes.CLEAR_USER_DETAIL });
const clearTopic = () => ({ type: actionTypes.CLEAR_TOPIC_DETAIL });
const clearMessage = () => ({ type: actionTypes.CLEAR_MESSAGE });
const setUserList = data => ({
    type: actionTypes.CHANGE_USER_LIST,
    data
});
const setUserDetail = data => ({
    type: actionTypes.SET_USER_DETAIL,
    data
});
const removeUser = data => ({
    type: actionTypes.DEL_USER,
    data
});

//用户列表
export const getUserList = param => {
    return async dispatch => {
        let { data } = await reqUserList(param);
        if (data.resultCode === 1000) {
            dispatch(setUserList(data.resultData));
        }
    };
};
//删除用户
export const delUser = id => {
    return async dispatch => {
        let { data } = await reqDelUser(id);
        if (data.resultCode === 1000) {
            dispatch(removeUser(id));
        } else {
            message.error("This is a message of error");
        }
    };
};

//获取用户详情
export const getUserDetail = param => {
    return async dispatch => {
        let { data } = await reqUserDetail(param);
        if (data.resultCode === 1000) {
            dispatch(setUserDetail(data.resultData));
        }
    };
};
//编辑用户
export const editUser = param => {
    return async dispatch => {
        let { data } = await updateUserInfo(param);
        if (data.resultCode === 1000) {
            dispatch(clearUserDetail());
            message.success("修改成功");
            return true;
        } else {
            message.error("This is a message of error");
        }
    };
};
//增加用户
export const addUser = param => {
    return async dispatch => {
        let { data } = await addUserInfo(param);
        if (data.resultCode === 1000) {
            dispatch(clearUserDetail());
            message.success("添加成功");
            return true;
        } else {
            message.error("This is a message of error");
        }
    };
};
//获取帖子列表
export const getTopicList = param => {
    return async dispatch => {
        let { data } = await reqTopicList(param);
        if (data.resultCode === 1000) {
        } else {
            message.error("This is a message of error");
        }
    };
};
//删除帖子
export const delTopic = param => {
    return async dispatch => {
        let { data } = await removeTopic(param);
        if (data.resultCode === 1000) {
            return true;
        } else {
            return false;
        }
    };
};
//增加帖子
export const addTopic = param => {
    return async dispatch => {
        let { data } = await saveTopic(param);
        if (data.resultCode === 1000) {
            dispatch(clearTopic());
            return true;
        } else {
            return false;
        }
    };
};
export const getTopicDetail = param => {
    return async dispatch => {
        let { data } = await updateTopic(param);
        if (data.resultCode === 1000) {
            return true;
        } else {
            return false;
        }
    };
};

//修改帖子
export const editTopic = param => {
    return async dispatch => {
        let { data } = await updateTopic(param);
        if (data.resultCode === 1000) {
            dispatch(clearTopic());
            return true;
        } else {
            return false;
        }
    };
};

export const addMessage = param => {
    return async dispatch => {
        let { data } = await putPriveteInfo(param);
        if (data.resultCode === 1000) {
            dispatch(clearMessage());
            message.success("添加成功");
        } else {
            message.error("This is a message of error");
        }
    };
};
