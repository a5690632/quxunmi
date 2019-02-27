import * as actionTypes from "./actionTypes";
import {
    putPriveteInfo,
    reqUserList,
    reqDelUser,
    reqUserDetail,
    updateUserInfo,
    addUserInfo,
    reqPriveteInfo
} from "../../../api/user/user";
import {
    reqTopicList,
    saveTopic,
    reqDelTopic,
    updateTopic,
    reqTopicDetail
} from "../../../api/user/topic";

const clearUserDetail = () => ({ type: actionTypes.CLEAR_USER_DETAIL });
const clearTopicDetail = () => ({ type: actionTypes.CLEAR_TOPIC_DETAIL });
const removeTopic = data => ({
    type: actionTypes.DEL_TOPIC,
    data
});
const setTopicList = data => ({
    type: actionTypes.CHANGE_TOPIC_LIST,
    data
});
const setTiodetail = data => ({
    type: actionTypes.SET_TOPIC_DETAIL,
    data
});
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
const setUserMessage = data => ({
    type: actionTypes.SET_USER_MESSAGE,
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
            return true;
        } else {
        }
    };
};
//增加用户
export const addUser = param => {
    return async dispatch => {
        let { data } = await addUserInfo(param);
        if (data.resultCode === 1000) {
            dispatch(clearUserDetail());
            return true;
        } else {
        }
    };
};
//获取帖子列表
export const getTopicList = param => {
    return async dispatch => {
        let { data } = await reqTopicList(param);
        if (data.resultCode === 1000) {
            dispatch(setTopicList(data.resultData));
        } else {
        }
    };
};
// //删除帖子
export const delTopic = param => {
    return async dispatch => {
        let { data } = await reqDelTopic(param);
        if (data.resultCode === 1000) {
            dispatch(removeTopic(param));
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
            dispatch(clearTopicDetail());
            return true;
        } else {
            return false;
        }
    };
};

//获取帖子详情
export const getTopicDetail = param => {
    return async dispatch => {
        let { data } = await reqTopicDetail(param);
        if (data.resultCode === 1000) {
            dispatch(setTiodetail(data.resultData));
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
            dispatch(clearTopicDetail());
            return true;
        } else {
            return false;
        }
    };
};

//获取私密信息
export const getUserMessage = param => {
    return async dispatch => {
        let { data } = await reqPriveteInfo(param);
        if (data.resultCode === 1000) {
            if (data.resultData) {
                dispatch(setUserMessage(data.resultData));
            }
        }
    };
};
//添加私密信息
export const addUserMessage = param => {
    return async dispatch => {
        let { data } = await putPriveteInfo(param);
        if (data.resultCode === 1000) {
            return true;
        } else {
            return false;
        }
    };
};
