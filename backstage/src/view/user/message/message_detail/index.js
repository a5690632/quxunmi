import React, { Component } from "react";
import { connect } from "react-redux";
import { addMessage } from "../../store/actionCreactor";
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
    Icon
} from "antd";

import { qiniuAction, qiniuUrl } from "../../../../api/common/common.js";
import "./index.less";
export class add extends Component {
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
            loading: false,
            inputVisible: {
                风格标签: false,
                外貌标签: false,
                魅力部位: false
            },
            inputValue: ""
        };
    }
    render() {
        const { privateTags, privateInfo } = this.props.message;
        const { headImg } = privateInfo;
        const {
            token,
            handleSubmit,
            handleInputConfirm,
            handleClose
        } = this.props;
        const style = privateTags["风格标签"];
        const appearance = privateTags["外貌标签"];
        const charm = privateTags["魅力部位"];
        const { getFieldDecorator } = this.props.form;
        const { inputVisible, inputValue } = this.state;
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
            <div className="message-add">
                <h3 className="name">增加私密信息</h3>
                <Form onSubmit={e => handleSubmit(e, this.props)}>
                    <Form.Item label="用户id" {...FromLayout}>
                        {getFieldDecorator("userId", {
                            rules: [{ required: true, message: "请输入用户id" }]
                        })(<Input placeholder="请输入用户id" />)}
                    </Form.Item>
                    <Form.Item label="微信" {...FromLayout}>
                        {getFieldDecorator("wxNo", {
                            rules: [{ required: true, message: "请输入微信号" }]
                        })(<Input placeholder="请输入微信号" />)}
                    </Form.Item>
                    <Form.Item label="工作经验" {...FromLayout}>
                        {getFieldDecorator("workExperience", {
                            rules: [
                                { required: true, message: "请输入工作经验" }
                            ]
                        })(
                            <Input.TextArea
                                placeholder="请输入工作经验"
                                autosize={{ minRows: 4, maxRows: 6 }}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="外貌标签" {...FromLayout}>
                        {getFieldDecorator("外貌标签", {})(
                            <div>
                                {appearance.map((tag, index) => {
                                    const isLongTag = tag.length > 20;
                                    const tagElem = (
                                        <Tag
                                            key={tag}
                                            closable={index !== 0}
                                            afterClose={() =>
                                                handleClose(
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
                        {getFieldDecorator("魅力部位", {})(
                            <div>
                                {charm.map((tag, index) => {
                                    const isLongTag = tag.length > 20;
                                    const tagElem = (
                                        <Tag
                                            key={tag}
                                            closable={index !== 0}
                                            afterClose={() =>
                                                handleClose(
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
                        {getFieldDecorator("风格标签", {})(
                            <div>
                                {style.map((tag, index) => {
                                    const isLongTag = tag.length > 20;
                                    const tagElem = (
                                        <Tag
                                            key={tag}
                                            closable={index !== 0}
                                            afterClose={() =>
                                                handleClose(
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
                        {getFieldDecorator("height", {
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
                        {getFieldDecorator("shoeSize", {
                            rules: [
                                {
                                    required: true,
                                    message: "请输入鞋码"
                                }
                            ]
                        })(<Input placeholder="请输入鞋码" />)}
                    </Form.Item>
                    <Form.Item label="胸围" {...FromLayout}>
                        {getFieldDecorator("bustSize", {
                            rules: [{ required: true, message: "请输入胸围" }]
                        })(<Input placeholder="请输入胸围" />)}
                    </Form.Item>
                    <Form.Item label="腰围" {...FromLayout}>
                        {getFieldDecorator("waistSize", {
                            rules: [{ required: true, message: "请输入腰围" }]
                        })(<Input placeholder="请输入腰围" />)}
                    </Form.Item>
                    <Form.Item label="臀围" {...FromLayout}>
                        {getFieldDecorator("hipSize", {
                            rules: [
                                {
                                    required: true,
                                    message: "请输入臀围"
                                }
                            ]
                        })(<Input placeholder="请输入身高" />)}
                    </Form.Item>
                    <Form.Item label="目色" {...FromLayout}>
                        {getFieldDecorator("eyeColor", {
                            rules: [
                                {
                                    required: true,
                                    message: "请输入目色"
                                }
                            ]
                        })(<Input placeholder="请输入目色" />)}
                    </Form.Item>
                    <Form.Item label="发色" {...FromLayout}>
                        {getFieldDecorator("hairColor", {
                            rules: [
                                {
                                    required: true,
                                    message: "请输入发色"
                                }
                            ]
                        })(<Input placeholder="请输入发色" />)}
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
                                onChange={this.unloadChange}
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
        }
        return isJPG && isLt2M;
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
}

const mapStateToProps = state => ({
    message: state.getIn(["user", "message"]).toJS(),
    token: state.getIn(["common", "qiniuToken"])
});

const mapDispatchToProps = dispatch => ({
    handleClose(removedTag, data, name) {
        const tags = data.filter(tag => tag !== removedTag);
    },
    handleInputConfirm(e, name, self) {
        let tagList = [...self.props.message.privateTags[name]];
        let inputVisible = {
            ...self.state.inputVisible
        };
        inputVisible[name] = false;
        if (e.target.value != "") {
            tagList.push(e.target.value);
            self.setState(() => ({
                inputVisible,
                inputValue: ""
            }));
        } else {
            self.setState(() => ({
                inputVisible
            }));
        }
    },

    handleSubmit(e, props) {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                if () {
                    
                }
                dispatch(addMessage({ ...props.message }));
            }
        });
    }
});

const WrappedNormalLoginForm = Form.create({
    name: "add_message",
    mapPropsToFields(props) {
        return {
            userId: Form.createFormField({
                value: props.message.userId
            }),
            外貌标签: Form.createFormField({
                fromName: "privateTags",
                value: props.message.privateTags["外貌标签"]
            }),
            魅力部位: Form.createFormField({
                fromName: "privateTags",
                value: props.message.privateTags["魅力部位"]
            }),
            风格标签: Form.createFormField({
                fromName: "privateTags",
                value: props.message.privateTags["风格标签"]
            }),
            workExperience: Form.createFormField({
                value: props.message.workExperience
            }),
            headImg: Form.createFormField({
                fromName: "privateInfo",
                value: props.message.privateInfo.headImg
            }),
            wxNo: Form.createFormField({
                fromName: "privateInfo",
                value: props.message.privateInfo.wxNo
            }),
            height: Form.createFormField({
                fromName: "privateInfo",
                value: props.message.privateInfo.height
            }),
            weight: Form.createFormField({
                fromName: "privateInfo",
                value: props.message.privateInfo.weight
            }),
            shoeSize: Form.createFormField({
                fromName: "privateInfo",
                value: props.message.privateInfo.shoeSize
            }),
            bustSize: Form.createFormField({
                fromName: "privateInfo",
                value: props.message.privateInfo.bustSize
            }),
            waistSize: Form.createFormField({
                fromName: "privateInfo",
                value: props.message.privateInfo.waistSize
            }),
            hipSize: Form.createFormField({
                fromName: "privateInfo",
                value: props.message.privateInfo.hipSize
            }),
            eyeColor: Form.createFormField({
                fromName: "privateInfo",
                value: props.message.privateInfo.eyeColor
            }),
            hairColor: Form.createFormField({
                fromName: "privateInfo",
                value: props.message.privateInfo.hairColor
            })
        };
    },
    onFieldsChange(props, changedFields) {
        props.handleChange(changedFields);
    }
})(add);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedNormalLoginForm);
