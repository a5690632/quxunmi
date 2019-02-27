import * as actionTypes from "./actionTypes";
import { fromJS, List } from "immutable";

const InitState = fromJS({
    userList: {
        userList: [],
        count: ""
    },
    userDetail: {
        phone: "", //电话
        nickName: "", //昵称
        headImg: "", //头像
        province: "", //省
        city: "", //市
        age: "", //年龄
        gender: "", //性别
        introduction: "" //介绍
    },
    topicList: {
        topicList: [],
        count: ""
    },
    topicDetail: {
        userId: "",
        title: "",
        content: "",
        city: "",
        province: "",
        archives: [],
        publishTime: ""
    },
    messageDetail: {
        userId: "",
        privateInfo: {
            headImg: "",
            wxNo: "",
            height: "",
            weight: "",
            shoeSize: "",
            bustSize: "",
            waistSize: "",
            hipSize: "",
            eyeColor: "",
            hairColor: ""
        },
        privateTags: {
            风格标签: [],
            魅力部位: [],
            外貌标签: []
        },
        workExperience: []
    }
});

const reducer = (state = InitState, { type, data }) => {
    switch (type) {
        case actionTypes.CHANGE_USER_LIST:
            return state.set("userList", fromJS(data));

        case actionTypes.SET_USER_DETAIL:
            return state.set("userDetail", fromJS(data));

        case actionTypes.CLEAR_USER_DETAIL:
            return state.merge({
                userDetail: state.get("userDetail").map(item => {
                    return "";
                })
            });
        case actionTypes.DEL_USER:
            let userIndex = state
                .getIn(["userList", "userList"])
                .findIndex(value => {
                    return value.get("id") === data;
                });
            return state.setIn(
                ["userList", "userList"],
                state.getIn(["userList", "userList"]).delete(userIndex)
            );

        case actionTypes.SET_USER_MESSAGE:
            return state.set("messageDetail", fromJS(data));

        case actionTypes.SET_TOPIC_DETAIL:
            return state.set("topicDetail", fromJS(data));
        case actionTypes.CHANGE_TOPIC_LIST:
            return state.set("topicList", fromJS(data));

        case actionTypes.CLEAR_TOPIC_DETAIL:
            return state.merge({
                topicDetail: state.get("topicDetail").map(item => {
                    console.log(item);
                    if (List.isList(item)) {
                        return List();
                    } else {
                        return "";
                    }
                })
            });

        case actionTypes.DEL_TOPIC:
            let TopicIndex = state
                .getIn(["topicList", "topicList"])
                .findIndex(value => {
                    return value.get("id") === data;
                });
            console.log(TopicIndex);
            return state.setIn(
                ["topicList", "topicList"],
                state.getIn(["topicList", "topicList"]).delete(TopicIndex)
            );

        default:
            return state;
    }
};

export default reducer;
