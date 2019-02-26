import { combineReducers } from "redux-immutable";
import { fromJS } from "immutable";
import { MENULIST, QINIU_TOKEN, LOGIN } from "./actionTypes";
import { userReducer } from "../view/user/store/index";

const initState = fromJS({
    menu: [
        {
            title: "用户",
            icon: "",
            children: [
                {
                    title: "用户列表",
                    path: "/user/user_list"
                }
            ]
        }
    ],
    qiniuToken: "",
    user: {
        userId: "",
        accessToken: ""
    }
});

const commonReducer = (state = initState, { type, data }) => {
    switch (type) {
        case QINIU_TOKEN:
            return state.set("qiniuToken", data);
        case LOGIN:
            return state.set("user", data);
        default:
            return state;
    }
};

export default combineReducers({
    common: commonReducer,
    user: userReducer
});
