import React, { Component } from "react";
import { Form, Icon, Input, Button } from "antd";

import "./index.less";
import { connect } from "react-redux";
import { login } from "../../store/actionCreator";
import { Redirect } from "react-router-dom";
class NormalLoginForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values);
            }
        });
    };

    render() {
        const FromLayout = {
            labelCol: {
                sm: 24,
                md: {
                    span: 12,
                    offset: 6
                }
            },
            wrapperCol: {
                sm: 24,
                md: {
                    span: 12,
                    offset: 6
                }
            }
        };
        const { getFieldDecorator } = this.props.form;
        return localStorage.getItem("accessToken") ? (
            <Redirect to="/" />
        ) : (
                <div className="login">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item {...FromLayout}>
                            {getFieldDecorator("phone", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入你的手机号"
                                    }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="user"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    placeholder="账号"
                                />
                            )}
                        </Form.Item>
                        <Form.Item {...FromLayout}>
                            {getFieldDecorator("passwd", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入密码"
                                    }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="lock"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    type="password"
                                    placeholder="密码"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                登录
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
            );
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: async data => {

            let status = await dispatch(login(data));
            if (status) {
                ownProps.history.push({
                    pathname: "/"
                })
            }
        }
    };
};

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
    NormalLoginForm
);

export default connect(
    null,
    mapDispatchToProps
)(WrappedNormalLoginForm);
