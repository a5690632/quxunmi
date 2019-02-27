import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import { getUserList, delUser } from "../../store/actionCreactor";
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
                title: "省份",
                key: "province",
                dataIndex: "province"
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
                title: "操作",
                render: (text, record) => {
                    return (
                        <div className="action">
                            <Button
                                size="small"
                                onClick={() => this.props.delUser(text.id)}
                            >
                                删除
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
                    <Link to="/user/user_detail/">增加用户</Link>
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
        this.props.getUserList({ pageNo: 1, pageSize: 10 });
    }
}

const mapStateToProps = state => ({
    userList: state.getIn(["user", "userList"]).toJS(),
    pagination: {
        total: state.getIn(["user", "userList", "count"])
    }
});

const mapDispatchToProps = (dispatch, prop) => {
    return {
        getUserList: data => {
            dispatch(getUserList(data));
        },
        handleTableChange: page => {
            dispatch(getUserList({ pageNo: page, pageSize: 10 }));
        },
        delUser: id => {
            dispatch(delUser(id));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(userList);
