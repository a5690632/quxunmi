import React, { Component } from "react";
import { connect } from "react-redux";
import {
    addTopic,
    editTopic,
    getTopicDetail
} from "../../store/actionCreactor";
import {
    Form,
    Input,
    Button,
    Upload,
    Icon,
    message,
    Cascader,
    Modal,
    Row,
    Col
} from "antd";
import city from "../../../../staic/address";
import { qiniuAction, qiniuUrl } from "../../../../api/common/common.js";
import "./index.less";

export class TopicDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: "",
            fileList: [],
            imgList: []
        };
    }
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const { token, handleSubmit } = this.props;
        const { getFieldDecorator } = this.props.form;
        const uploadButton = (
            <div>
                <Icon type="plus" />
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
            <div className="topic-detail">
                <h3 className="name">增加帖子</h3>
                <Form onSubmit={e => handleSubmit(e, this.props)}>
                    <Form.Item label="用户id" {...FromLayout}>
                        {getFieldDecorator("userId", {
                            rules: [{ required: true, message: "请输入用户id" }]
                        })(<Input placeholder="请输入用户id" />)}
                    </Form.Item>
                    <Form.Item label="标题" {...FromLayout}>
                        {getFieldDecorator("title", {
                            rules: [{ required: true, message: "请输入标题" }]
                        })(<Input placeholder="请输入标题" />)}
                    </Form.Item>
                    <Form.Item label="内容" {...FromLayout}>
                        {getFieldDecorator("content", {
                            rules: [{ required: true, message: "请输入内容" }]
                        })(
                            <Input.TextArea
                                placeholder="请输入内容"
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
                    <Form.Item label="图片" {...FromLayout}>
                        {getFieldDecorator("archives", {
                            rules: [
                                {
                                    required: true,
                                    message: "请选择图片"
                                }
                            ]
                        })(
                            <div className="clearfix">
                                <Upload
                                    multiple
                                    name="file"
                                    action={qiniuAction}
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    beforeUpload={this.beforeUpload}
                                    onChange={this.unloadChange}
                                    data={() => ({
                                        token
                                    })}
                                >
                                    {fileList.length >= 3 ? null : uploadButton}
                                </Upload>
                                <Modal
                                    visible={previewVisible}
                                    footer={null}
                                    onCancel={this.handleCancel}
                                >
                                    <img
                                        alt="example"
                                        style={{ width: "100%" }}
                                        src={previewImage}
                                    />
                                </Modal>
                            </div>
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
        if (id) {
            this.props.getTopicDetail(id);
        }
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = file => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        });
    };

    unloadChange = ({ file, fileList }) => {
        this.setState({ fileList });
        let { imgList } = { ...this.state };

        if (file.status === "done") {
            let img = `${qiniuUrl}${file.response.key}`;
            imgList.push(img);
            this.setState({ ...this.state, imgList });
            this.props.handleChange({
                archives: {
                    name: "archives",
                    value: [...this.state.imgList]
                }
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
}

const mapStateToProps = state => ({
    topicDetail: state.getIn(["user", "topicDetail"]).toJS(),
    token: state.getIn(["common", "qiniuToken"])
});

const mapDispatchToProps = dispatch => ({
    handleSubmit(e, props) {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                if (this.state.id) {
                    dispatch(editTopic());
                } else {
                    dispatch(addTopic());
                }
            }
        });
    },
    getTopicDetail(id) {
        dispatch(getTopicDetail(id));
    }
});

const WrappedNormalLoginForm = Form.create({
    name: "topic_detail",
    mapPropsToFields(props) {
        let topicDetail = {};
        Object.keys(props.topicDetail).forEach(key => {
            topicDetail[key] = Form.createFormField({
                value: props.topicDetail[key]
            });
        });
        topicDetail.address = Form.createFormField({
            value: [props.topicDetail.province, props.topicDetail.city]
        });
        return topicDetail;
    }
})(TopicDetail);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedNormalLoginForm);
