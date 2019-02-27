import React, { Component } from "react";
import { connect } from "react-redux";
import { addUserMessage, getUserMessage } from "../../store/actionCreactor";
import propTypes from "prop-types";
import {
    Form,
    Input,
    Button,
    Upload,
    message,
    Row,
    Col,
    Tag,
    Tooltip,
    Icon,
    Tabs
} from "antd";

import { qiniuAction, qiniuUrl } from "../../../../api/common/common.js";
import "./index.less";

export class MessageDetail extends Component {
    static propTypes = {
        message: propTypes.shape({
            userId: propTypes.string.isRequired,
            privateInfo: propTypes.object.isRequired,
            privateTags: propTypes.object.isRequired,
            workExperience: propTypes.string.isRequired
        }),
        token: propTypes.string.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            loading: false,
            inputVisible: {
                风格标签: false,
                外貌标签: false,
                魅力部位: false,
                workExperience: false
            },
            privateTags: {
                风格标签: [],
                外貌标签: [],
                魅力部位: []
            },
            workExperience: [],
            inputValue: "",
            headImg: ""
        };
    }
    render() {
        const {
            privateTags,
            workExperience,
            headImg,
            inputVisible
        } = this.state;
        const { token, handleSubmit, handleInputConfirm } = this.props;
        const style = privateTags["风格标签"];
        const appearance = privateTags["外貌标签"];
        const charm = privateTags["魅力部位"];
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
            <div className="message-detail">
                <Tabs defaultActiveKey="2" onChange={key => this.jump(key)}>
                    <TabPane tab="基本信息" key="1" />
                    <TabPane tab="私密信息" key="2" />
                </Tabs>

                <Form onSubmit={e => handleSubmit(e, this)}>
                    <Form.Item label="微信" {...FromLayout}>
                        {getFieldDecorator("privateInfo[wxNo]", {
                            rules: [{ required: true, message: "请输入微信号" }]
                        })(<Input placeholder="请输入微信号" />)}
                    </Form.Item>
                    <Form.Item label="工作经验" {...FromLayout}>
                        {getFieldDecorator("workExperience", {})(
                            <div>
                                {workExperience.map((tag, index) => {
                                    const isLongTag = tag.length > 20;
                                    const tagElem = (
                                        <Tag
                                            key={tag}
                                            closable
                                            afterClose={() =>
                                                this.handleClose(tag)
                                            }
                                        >
                                            {isLongTag
                                                ? `${tag.slice(0, 20)}...`
                                                : tag}
                                        </Tag>
                                    );
                                    return isLongTag ? (
                                        <Tooltip title={tag} key={tag}>
                                            {tagElem}
                                        </Tooltip>
                                    ) : (
                                        tagElem
                                    );
                                })}

                                {inputVisible.workExperience && (
                                    <Input
                                        type="text"
                                        size="small"
                                        style={{ width: 78 }}
                                        onChange={this.handleInputChange}
                                        onBlur={e =>
                                            handleInputConfirm(
                                                e,
                                                "workExperience",
                                                this
                                            )
                                        }
                                    />
                                )}
                                {!inputVisible.workExperience && (
                                    <Tag
                                        onClick={() =>
                                            this.showInput("workExperience")
                                        }
                                        style={{
                                            background: "#fff",
                                            borderStyle: "dashed"
                                        }}
                                    >
                                        <Icon type="plus" /> New Tag
                                    </Tag>
                                )}
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item label="外貌标签" {...FromLayout}>
                        {getFieldDecorator("privateTags[外貌标签]", {})(
                            <div>
                                {appearance.map((tag, index) => {
                                    const isLongTag = tag.length > 20;
                                    const tagElem = (
                                        <Tag
                                            key={tag}
                                            closable
                                            afterClose={() =>
                                                this.handleClose(
                                                    tag,
                                                    appearance,
                                                    "外貌标签"
                                                )
                                            }
                                        >
                                            {isLongTag
                                                ? `${tag.slice(0, 20)}...`
                                                : tag}
                                        </Tag>
                                    );
                                    return isLongTag ? (
                                        <Tooltip title={tag} key={tag}>
                                            {tagElem}
                                        </Tooltip>
                                    ) : (
                                        tagElem
                                    );
                                })}
                                {inputVisible["外貌标签"] && (
                                    <Input
                                        type="text"
                                        size="small"
                                        style={{ width: 78 }}
                                        onChange={this.handleInputChange}
                                        onBlur={e =>
                                            handleInputConfirm(
                                                e,
                                                "外貌标签",
                                                this
                                            )
                                        }
                                    />
                                )}
                                {!inputVisible["外貌标签"] && (
                                    <Tag
                                        onClick={() =>
                                            this.showInput("外貌标签")
                                        }
                                        style={{
                                            background: "#fff",
                                            borderStyle: "dashed"
                                        }}
                                    >
                                        <Icon type="plus" /> New Tag
                                    </Tag>
                                )}
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item label="魅力部位" {...FromLayout}>
                        {getFieldDecorator("privateTags[魅力部位]", {})(
                            <div>
                                {charm.map((tag, index) => {
                                    const isLongTag = tag.length > 20;
                                    const tagElem = (
                                        <Tag
                                            closable
                                            key={tag}
                                            afterClose={() =>
                                                this.handleClose(
                                                    tag,

                                                    charm,
                                                    "魅力部位"
                                                )
                                            }
                                        >
                                            {isLongTag
                                                ? `${tag.slice(0, 20)}...`
                                                : tag}
                                        </Tag>
                                    );
                                    return isLongTag ? (
                                        <Tooltip title={tag} key={tag}>
                                            {tagElem}
                                        </Tooltip>
                                    ) : (
                                        tagElem
                                    );
                                })}
                                {inputVisible["魅力部位"] && (
                                    <Input
                                        type="text"
                                        size="small"
                                        style={{ width: 78 }}
                                        onChange={this.handleInputChange}
                                        onBlur={e =>
                                            handleInputConfirm(
                                                e,
                                                "魅力部位",
                                                this
                                            )
                                        }
                                    />
                                )}
                                {!inputVisible["魅力部位"] && (
                                    <Tag
                                        onClick={() =>
                                            this.showInput("魅力部位")
                                        }
                                        style={{
                                            background: "#fff",
                                            borderStyle: "dashed"
                                        }}
                                    >
                                        <Icon type="plus" /> New Tag
                                    </Tag>
                                )}
                            </div>
                        )}
                    </Form.Item>

                    <Form.Item label="风格标签" {...FromLayout}>
                        {getFieldDecorator("privateTags[风格标签]", {})(
                            <div>
                                {style.map((tag, index) => {
                                    const isLongTag = tag.length > 20;
                                    const tagElem = (
                                        <Tag
                                            key={tag}
                                            closable
                                            afterClose={() =>
                                                this.handleClose(
                                                    tag,
                                                    style,
                                                    "风格标签"
                                                )
                                            }
                                        >
                                            {isLongTag
                                                ? `${tag.slice(0, 20)}...`
                                                : tag}
                                        </Tag>
                                    );
                                    return isLongTag ? (
                                        <Tooltip title={tag} key={tag}>
                                            {tagElem}
                                        </Tooltip>
                                    ) : (
                                        tagElem
                                    );
                                })}

                                {inputVisible["风格标签"] && (
                                    <Input
                                        type="text"
                                        size="small"
                                        style={{ width: 78 }}
                                        onChange={this.handleInputChange}
                                        onBlur={e =>
                                            handleInputConfirm(
                                                e,
                                                "风格标签",
                                                this
                                            )
                                        }
                                    />
                                )}
                                {!inputVisible["风格标签"] && (
                                    <Tag
                                        onClick={() =>
                                            this.showInput("风格标签")
                                        }
                                        style={{
                                            background: "#fff",
                                            borderStyle: "dashed"
                                        }}
                                    >
                                        <Icon type="plus" /> New Tag
                                    </Tag>
                                )}
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item label="身高" {...FromLayout}>
                        {getFieldDecorator("privateInfo[height]", {
                            rules: [{ required: true, message: "请输入身高" }]
                        })(<Input placeholder="请输入身高" />)}
                    </Form.Item>
                    <Form.Item label="体重" {...FromLayout}>
                        {getFieldDecorator("weight", {
                            rules: [
                                {
                                    required: true,
                                    message: "请输入体重"
                                }
                            ]
                        })(<Input placeholder="请输入体重" />)}
                    </Form.Item>
                    <Form.Item label="鞋码" {...FromLayout}>
                        {getFieldDecorator(`privateInfo[shoeSize]`, {
                            rules: [
                                {
                                    required: true,
                                    message: "请输入鞋码"
                                }
                            ]
                        })(<Input placeholder="请输入鞋码" />)}
                    </Form.Item>
                    <Form.Item label="胸围" {...FromLayout}>
                        {getFieldDecorator(`privateInfo[bustSize]`, {
                            rules: [{ required: true, message: "请输入胸围" }]
                        })(<Input placeholder="请输入胸围" />)}
                    </Form.Item>
                    <Form.Item label="腰围" {...FromLayout}>
                        {getFieldDecorator(`privateInfo[waistSize]`, {
                            rules: [{ required: true, message: "请输入腰围" }]
                        })(<Input placeholder="请输入腰围" />)}
                    </Form.Item>
                    <Form.Item label="臀围" {...FromLayout}>
                        {getFieldDecorator(`privateInfo[hipSize]`, {
                            rules: [
                                {
                                    required: true,
                                    message: "请输入臀围"
                                }
                            ]
                        })(<Input placeholder="请输入身高" />)}
                    </Form.Item>
                    <Form.Item label="目色" {...FromLayout}>
                        {getFieldDecorator(`privateInfo[eyeColor]`, {
                            rules: [
                                {
                                    required: true,
                                    message: "请输入目色"
                                }
                            ]
                        })(<Input placeholder="请输入目色" />)}
                    </Form.Item>
                    <Form.Item label="发色" {...FromLayout}>
                        {getFieldDecorator(`privateInfo[hairColor]`, {
                            rules: [
                                {
                                    required: true,
                                    message: "请输入发色"
                                }
                            ]
                        })(<Input placeholder="请输入发色" />)}
                    </Form.Item>

                    <Form.Item label="头像" {...FromLayout}>
                        {getFieldDecorator(`privateInfo[headImg]`, {
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
                                onChange={this.unloadChange}
                                data={() => ({
                                    token
                                })}
                            >
                                {headImg ? (
                                    <img
                                        src={headImg}
                                        alt="avatar"
                                        className="headimg"
                                    />
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
        let { id } = this.props.match.params;
        this.setState({
            id
        });
        this.props.getMessage({ userId: id });
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.messageDetail.userId !== prevProps.messageDetail.userId
        ) {
            this.setState({
                headImg: this.props.messageDetail.privateInfo.headImg,
                privateTags: this.props.messageDetail.privateTags,
                workExperience: this.props.messageDetail.workExperience
            });
        }
    }
    jump = key => {
        if (key === "1") {
            this.props.history.push({
                pathname: `/user/user_detail/${this.state.id}`
            });
        }
    };

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
    unloadChange = info => {
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
            this.setState({ headImg: img });
        }
    };

    showInput = name => {
        let inputVisible = { ...this.state.inputVisible };
        for (var k in inputVisible) {
            inputVisible[k] = false;
        }
        inputVisible[name] = true;

        this.setState({ inputVisible });
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };
    handleClose = (removedTag, data, name) => {
        const tag = data.filter(tag => tag !== removedTag);
        this.setState({
            privateTags: {
                ...this.state.privateTags,
                [name]: tag
            }
        });
    };
}

const mapStateToProps = state => ({
    messageDetail: state.getIn(["user", "messageDetail"]).toJS(),
    token: state.getIn(["common", "qiniuToken"])
});

const mapDispatchToProps = dispatch => ({
    getMessage(param) {
        dispatch(getUserMessage(param));
    },
    handleInputConfirm(e, name, self) {
        let tagList;
        if (name === "workExperience") {
            tagList = [...self.state.workExperience];
        } else {
            tagList = [...self.state.privateTags[name]];
        }

        let inputVisible = {
            ...self.state.inputVisible
        };
        inputVisible[name] = false;
        if (e.target.value !== "") {
            if (!tagList.includes(e.target.value)) {
                tagList.push(e.target.value);
                if (name === "workExperience") {
                    console.log(1);
                    self.setState(() => ({
                        inputVisible,
                        inputValue: "",
                        workExperience: tagList
                    }));
                } else {
                    self.setState(() => ({
                        inputVisible,
                        inputValue: "",
                        privateTags: {
                            ...self.state.privateTags,
                            [name]: tagList
                        }
                    }));
                }
            } else {
                message.error("重复标签");
                self.setState(() => ({
                    inputVisible,
                    inputValue: ""
                }));
            }
        } else {
            self.setState(() => ({
                inputVisible
            }));
        }
    },

    handleSubmit(e, self) {
        e.preventDefault();
        self.props.form.validateFields(async (err, values) => {
            if (!err) {
                values.privateInfo.headImg = self.state.headImg;
                values.privateTags = self.state.privateTags;
                values.userId = self.state.id;
                values.workExperience = self.state.workExperience;
                let status = await dispatch(addUserMessage(values));
                if (status) {
                    message.success("成功");
                }
            }
        });
    }
});

const WrappedNormalLoginForm = Form.create({
    name: "add_message",
    mapPropsToFields(props) {
        let messageDetail = {};
        Object.keys(props.messageDetail).forEach(key => {
            if (
                Object.prototype.toString.call(props.messageDetail[key]) ===
                "[object Object]"
            ) {
                Object.keys(props.messageDetail[key]).forEach(key2 => {
                    messageDetail[`${key}[${key2}]`] = Form.createFormField({
                        value: props.messageDetail[key][key2]
                    });
                });
            } else {
                messageDetail[key] = Form.createFormField({
                    value: props.messageDetail[key]
                });
            }
        });
        console.log(messageDetail);
        return messageDetail;
    }
})(MessageDetail);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedNormalLoginForm);
