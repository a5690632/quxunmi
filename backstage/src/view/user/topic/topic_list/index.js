import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import { getTopicList, delTopic } from "../../store/actionCreactor";
import "./index.less";

export class topicList extends Component {
    static propTypes = {
        topicList: propTypes.object
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
                title: "标题",
                key: "title",
                dataIndex: "title"
            },
            {
                title: "内容",
                key: "content",
                dataIndex: "content"
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
                title: "操作",
                render: (text, record) => {
                    return (
                        <div className="action">
                            <Button
                                size="small"
                                onClick={() => this.props.delTopic(text.id)}
                            >
                                删除
                            </Button>
                            <Button size="small">
                                <Link
                                    to={{
                                        pathname: `/user/topic_detail/${
                                            this.state.userId
                                        }/${text.id}`
                                    }}
                                >
                                    编辑
                                </Link>
                            </Button>
                        </div>
                    );
                }
            }
        ];
        const data = this.props.topicList.topicList;
        return (
            <div className="topic-list">
                <Button type="primary" className="add">
                    <Link to={`/user/topic_detail/${this.state.userId}/`}>
                        增加帖子
                    </Link>
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
        let { userId } = this.props.match.params;
        this.setState({
            userId
        });
        if (userId) {
            this.props.getTopicList({ userId, pageNo: 1, pageSize: 10 });
        }
    }
}

const mapStateToProps = state => ({
    topicList: state.getIn(["user", "topicList"]).toJS(),
    pagination: {
        total: state.getIn(["user", "topicList", "count"])
    }
});

const mapDispatchToProps = (dispatch, prop) => {
    return {
        getTopicList: data => {
            dispatch(getTopicList(data));
        },
        handleTableChange: page => {
            dispatch(getTopicList({ pageNo: page, pageSize: 10 }));
        },
        delTopic: id => {
            console.log(id);
            dispatch(delTopic({ id }));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(topicList);
