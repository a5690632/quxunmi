import { QINIU_TOKEN, LOGIN } from "./actionTypes";
import { getQiNiuToken, reqLogin } from "../api/common/common";
import { message } from "antd";

const setQiniuToken = data => ({
    type: QINIU_TOKEN,
    data
});
const setUserId = data => ({
    type: LOGIN,
    data
});

export const qiniuToken = () => {
    return async dispatch => {
        let { data } = await getQiNiuToken();
        if (data.resultCode === 1000) {
            dispatch(setQiniuToken(data.resultData));
        }
    };
};

export const login = param => {
    return async dispatch => {
        let { data } = await reqLogin(param);

        if (data.resultCode === 1000) {
            let { userId, accessToken } = data.resultData;
            if (accessToken) {
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("userId", userId);
                dispatch(setUserId({ userId, accessToken }));
            } else {
                message.error("This is message of warning");
            }
        }
    };
};
