import React, { Component } from "react";
import { connect } from "react-redux";
import {
    addUser,
    getUserDetail,
    editUser,
    clearUserDetail
} from "../../store/actionCreactor";
import {
    Form,
    Input,
    Button,
    Upload,
    Icon,
    message,
    Radio,
    Cascader,
    Row,
    Col,
    Tabs
} from "antd";
import city from "../../../../staic/address";
import { qiniuAction, qiniuUrl } from "../../../../api/common/common.js";
import "./index.less";

export class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            id: ""
        };
    }
    render() {
        const { headImg, cover } = this.state;
        const { token, handleSubmit } = this.props;
        const { getFieldDecorator } = this.props.form;
        const TabPane = Tabs.TabPane;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? "loading" : "plus"} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const FromLayout = {
            labelCol: {
                sm: 24,
                md: 4
            },
            wrapperCol: {
                sm: 24,
                md: 12
            }
        };
        return (
            <div className="user-detail">
                <Tabs defaultActiveKey="1" onChange={key => this.jump(key)}>
                    <TabPane tab="基本信息" key="1" />
                    <TabPane
                        tab="私密信息"
                        key="2"
                        disabled={this.state.id ? false : true}
                    />
                </Tabs>

                <Form onSubmit={e => handleSubmit(e, this)}>
                    <Form.Item label="手机号" {...FromLayout}>
                        {getFieldDecorator("phone", {
                            rules: [{ required: true, message: "请输入电话" }]
                        })(<Input placeholder="请输入手机号" />)}
                    </Form.Item>
                    <Form.Item label="类型" {...FromLayout}>
                        {getFieldDecorator("occupation", {
                            rules: [{ required: true, message: "请输入昵称" }]
                        })(<Input placeholder="请输入用户类型" />)}
                    </Form.Item>
                    <Form.Item label="昵称" {...FromLayout}>
                        {getFieldDecorator("nickName", {
                            rules: [{ required: true, message: "请输入昵称" }]
                        })(<Input placeholder="请输入昵称" />)}
                    </Form.Item>
                    <Form.Item label="年龄" {...FromLayout}>
                        {getFieldDecorator("age", {
                            rules: [{ required: true, message: "请输入年龄" }]
                        })(<Input placeholder="请输入年龄" />)}
                    </Form.Item>
                    <Form.Item label="性别" {...FromLayout}>
                        {getFieldDecorator("gender", {
                            rules: [{ required: true, message: "请选择性别" }]
                        })(
                            <Radio.Group>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    <Form.Item label="介绍" {...FromLayout}>
                        {getFieldDecorator("introduction", {
                            rules: [{ required: true, message: "请输入介绍" }]
                        })(
                            <Input.TextArea
                                placeholder="请输入介绍"
                                autosize={{ minRows: 4, maxRows: 6 }}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="地址" {...FromLayout}>
                        {getFieldDecorator("address", {
                            rules: [
                                {
                                    required: true,
                                    validator: (rule, value, callback) => {
                                        if (value[0] === "") {
                                            callback("请选择省份");
                                        } else if (value[1] === "") {
                                            callback("请选择城市");
                                        } else {
                                            callback();
                                        }
                                    }
                                }
                            ]
                        })(<Cascader options={city} />)}
                    </Form.Item>
                    <Form.Item label="头像" {...FromLayout}>
                        {getFieldDecorator("headImg", {
                            rules: [
                                {
                                    required: true,
                                    message: "请选择图片"
                                }
                            ]
                        })(
                            <Upload
                                name="file"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action={qiniuAction}
                                beforeUpload={this.beforeUpload}
                                onChange={(info) => this.unloadChange(info, "headImg")}
                                data={() => ({
                                    token
                                })}
                            >
                                {headImg ? (
                                    <img src={headImg} alt="avatar" />
                                ) : (
                                        uploadButton
                                    )}
                            </Upload>
                        )}
                    </Form.Item>
                    <Form.Item label="封面" {...FromLayout}>
                        {getFieldDecorator("cover", {
                            rules: [
                                {
                                    required: true,
                                    message: "请选择图片"
                                }
                            ]
                        })(
                            <Upload
                                name="file"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action={qiniuAction}
                                beforeUpload={this.beforeUpload}
                                onChange={(info) => this.unloadChange(info, "cover")}
                                data={() => ({
                                    token
                                })}
                            >
                                {cover ? (
                                    <img src={cover} alt="avatar" />
                                ) : (
                                        uploadButton
                                    )}
                            </Upload>
                        )}
                    </Form.Item>
                    <Row justify="center" type="flex">
                        <Col sm={24} md={12}>
                            <Button htmlType="submit" className="submit">
                                提交
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.getDetail(this.props.match.params.id);
            this.setState({
                id: this.props.match.params.id
            });
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.userDetail.headImg !== prevProps.userDetail.headImg) {
            this.setState({
                headImg: this.props.userDetail.headImg,
                cover: this.props.userDetail.cover
            });
        }
    }
    componentWillUnmount() {
        this.props.destroy();
    }
    beforeUpload = file => {
        const isJPG = file.type === "image/jpeg";
        const isPNG = file.type === "image/png";
        const isGIF = file.type === "image/gif";
        if (!isJPG && !isPNG && !isGIF) {
            message.error("格式不支持");
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Image must smaller than 2MB!");
            return false;
        }
    };
    unloadChange = (info, type) => {
        if (info.file.status === "uploading") {
            this.setState({
                loading: true
            });
        }
        if (info.file.status === "done") {
            this.setState({
                loading: false
            });
            let img = `${qiniuUrl}${info.file.response.key}`;
            this.setState({
                [type]: img
            });
        }
    };
    jump(key) {
        if (key === "2") {
            this.props.history.push({
                pathname: `/user/message_detail/${this.state.id}`
            });
        }
    }
}

const mapStateToProps = state => ({
    userDetail: state.getIn(["user", "userDetail"]).toJS(),
    token: state.getIn(["common", "qiniuToken"])
});

const mapDispatchToProps = dispatch => ({
    handleSubmit(e, self) {
        e.preventDefault();
        self.props.form.validateFields(async (err, values) => {
            if (!err) {
                values.headImg = self.state.headImg;
                values.province = values.address[0];
                values.city = values.address[1];
                values.cover = self.state.cover
                console.log(values)
                let status;
                if (self.state.id) {
                    values.id = self.state.id;
                    status = await dispatch(editUser(values));
                } else {
                    status = await dispatch(addUser(values));
                }
                if (status) {
                    self.props.history.push({
                        pathname: "/user/user_list"
                    });
                }
            }
        });
    },
    getDetail(id) {
        dispatch(getUserDetail({ id }));
    },
    destroy() {
        dispatch(clearUserDetail());
    }
});

const WrappedNormalLoginForm = Form.create({
    name: "user_detail",
    mapPropsToFields(props) {
        let userDetail = {};
        Object.keys(props.userDetail).forEach(key => {
            userDetail[key] = Form.createFormField({
                value: props.userDetail[key]
            });
        });
        userDetail.address = Form.createFormField({
            value: [props.userDetail.province, props.userDetail.city]
        });
        return userDetail;
    }
})(UserDetail);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedNormalLoginForm);
