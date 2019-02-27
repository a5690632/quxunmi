import React, { Component } from "react";
import { connect } from "react-redux";
import locale from "antd/lib/date-picker/locale/zh_CN";
import moment from "moment";
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
    Col,
    DatePicker
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
            imgList: [],
            time: new Date()
        };
    }
    render() {
        const { previewVisible, previewImage, imgList } = this.state;
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
                <Form onSubmit={e => handleSubmit(e, this)}>
                    <Form.Item label="标题" {...FromLayout}>
                        {getFieldDecorator("title", {
                            rules: [{ required: true, message: "请输入标题" }]
                        })(<Input placeholder="请输入标题" />)}
                    </Form.Item>
                    <Form.Item label="发布时间" {...FromLayout}>
                        {getFieldDecorator("publishTime", {
                            rules: [{ required: true, message: "请输入标题" }]
                        })(
                            <div>
                                <DatePicker
                                    placeholder=""
                                    locale={locale}
                                    value={moment(this.state.time)}
                                    onChange={this.timeChange}
                                />
                            </div>
                        )}
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
                        {getFieldDecorator("photoList", {
                            rules: [
                                {
                                    required: true,
                                    message: "请选择图片"
                                }
                            ]
                        })(
                            <div className="archives">
                                {imgList.map(img => {
                                    return (
                                        <img
                                            alt=""
                                            src={img}
                                            key={img}
                                            onClick={this.handlePreview}
                                        />
                                    );
                                })}
                                <Upload
                                    multiple
                                    name="file"
                                    action={qiniuAction}
                                    listType="picture-card"
                                    showUploadList={false}
                                    beforeUpload={this.beforeUpload}
                                    onChange={this.unloadChange}
                                    data={() => ({
                                        token
                                    })}
                                >
                                    {uploadButton}
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
        let { id, userId } = this.props.match.params;

        this.setState({
            id,
            userId
        });
        if (id) {
            this.props.getTopicDetail({ id });
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.topicDetail.userId !== prevProps.topicDetail.userId) {
            if (this.props.topicDetail.photoList != null) {
                this.setState({
                    imgList: this.props.topicDetail.photoList
                });
            }
            if (this.props.topicDetail.publishTime != null) {
                this.setState(
                    {
                        time: this.props.topicDetail.publishTime
                    },
                    () => {
                        console.log(this.state.time);
                    }
                );
            }
        }
    }
    handleCancel = () => this.setState({ previewVisible: false });
    timeChange = (value, dateString) => {
        this.setState({
            time: dateString
        });
    };
    handlePreview = e => {
        this.setState({
            previewImage: e.target.src,
            previewVisible: true
        });
    };

    unloadChange = ({ file }) => {
        let { imgList } = { ...this.state };

        if (file.status === "done") {
            let img = `${qiniuUrl}${file.response.key}`;
            imgList.push(img);
            this.setState({ imgList }, () => {});
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
    handleSubmit(e, self) {
        e.preventDefault();
        self.props.form.validateFields(async (err, values) => {
            if (!err) {
                values.userId = self.state.userId;
                values.archives = self.state.imgList;
                values.province = values.address[0];
                values.city = values.address[1];
                values.publishTime = self.state.time;
                let status;
                if (self.state.id) {
                    values.id = self.state.id;
                    status = await dispatch(editTopic(values));
                } else {
                    status = await dispatch(addTopic(values));
                }
                if (status) {
                    message.success("成功");
                    self.props.history.push({
                        pathname: `/user/topic_list/${self.state.userId}`
                    });
                }
            }
        });
    },
    getTopicDetail(param) {
        dispatch(getTopicDetail(param));
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
