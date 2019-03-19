import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { Table, Button, message } from "antd";
import { Link } from "react-router-dom";
import {
    getUserList,
    delUser,
    showUser,
    hideUser
} from "../../store/actionCreactor";
import "./index.less";
export class userList extends Component {
    static propTypes = {
        userList: propTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            pagination: {},
            loading: false
        };
    }
    render() {
        const columns = [
            {
                title: "id",
                key: "id",
                dataIndex: "id"
            },
            {
                title: "手机号",
                key: "phone",
                dataIndex: "phone"
            },
            {
                title: "昵称",
                key: "nickName",
                dataIndex: "nickName"
            },
            {
                title: "城市",
                key: "city",
                dataIndex: "city"
            },
            {
                title: "年龄",
                key: "age",
                dataIndex: "age"
            },
            {
                title: "性别",
                key: "gender",
                dataIndex: "gender"
            },
            {
                title: "类别",
                key: "occupation",
                dataIndex: "occupation"
            },
            {
                title: "状态",
                render: (text, record) => {
                    if (text.displayFlag) {
                        return ("上架")
                    } else {
                        return "下架"
                    }
                }
            },
            {
                title: "操作",
                render: (text, record, index) => {
                    return (
                        <div className="action">
                            <Button
                                size="small"
                                onClick={() => this.props.delUser(text.id)}
                            >
                                删除
                            </Button>
                            <Button
                                size="small"
                                onClick={() => this.props.showUser(text.id, index)}
                            >
                                上架
                            </Button>
                            <Button
                                size="small"
                                onClick={() => this.props.hideUser(text.id, index)}
                            >
                                下架
                            </Button>
                            <Button size="small">
                                <Link
                                    to={{
                                        pathname: `/user/user_detail/${
                                            record.id
                                            }`
                                    }}
                                >
                                    编辑
                                </Link>
                            </Button>
                            <Button size="small">
                                <Link
                                    to={{
                                        pathname: `/user/topic_list/${
                                            record.id
                                            }`
                                    }}
                                >
                                    帖子列表
                                </Link>
                            </Button>
                        </div>
                    );
                }
            }
        ];
        const data = this.props.userList.userList;

        return (
            <div className="user-list">
                <Button type="primary" className="add">
                    <Link to="/user/user_detail/"> 增加用户 </Link>
                </Button>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey={record => record.id}
                    pagination={this.props.pagination}
                    onChange={this.props.handleTableChange}
                />
            </div>
        );
    }
    componentDidMount() {
        this.props.getUserList({
            pageNum: this.props.pagination.current,
            pageSize: 10
        });
    }
}

const mapStateToProps = state => ({
    userList: state.getIn(["user", "userList"]).toJS(),
    pagination: {
        total: state.getIn(["user", "userList", "count"]),
        current: state.getIn(["user", "userIndex",])
    }
});

const mapDispatchToProps = (dispatch, prop) => {
    return {
        getUserList: data => {
            dispatch(getUserList(data));
        },
        handleTableChange: page => {
            dispatch(
                getUserList({
                    pageNum: page.current,
                    pageSize: 10
                })
            );
        },
        delUser: async id => {
            let status = await dispatch(delUser(id));
            if (status) {
                message.success("成功")
            }
        },
        showUser: async (id, index) => {
            let status = await dispatch(showUser({ id, index }));
            if (status) {
                message.success("成功")
            } else {
                message.error("失败")
            }
        },
        hideUser: async (id, index) => {
            let status = await dispatch(hideUser({ id, index }));
            if (status) {
                message.success("成功")
            } else {
                message.error("失败")
            }
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(userList);
