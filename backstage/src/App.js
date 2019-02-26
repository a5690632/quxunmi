import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Menu, Icon } from "antd";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import "./app.less";
import { qiniuToken } from "./store/actionCreator";

import UserDetail from "./view/user/user/user_detail/";
import UserMseeageDetail from "./view/user/message/message_detail/";
import TopicList from "./view/user/topic/topic_list/";
import TopicDetail from "./view/user/topic/topic_detail/";
import UserList from "./view/user/user/user_list";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class App extends Component {
    render() {
        return (
            <Layout className="app">
                {isLogin()}
                <Header className="header">
                    <div className="logo" />
                </Header>
                <Layout>
                    <Sider width={200} className="sider">
                        {menu(this.props.menu)}
                    </Sider>
                    <Layout style={{ padding: "24px" }}>
                        <Content className="main">{routeSwitch()}</Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
    componentDidMount() {
        this.props.getQiNiuToken();
    }
}
let isLogin = () => {
    if (!localStorage.getItem("accessToken")) {
        return <Redirect to="/login" />;
    }
};

let routeSwitch = () => {
    return (
        <Switch>
            <Route path="/user/user_list" component={UserList} />
            <Route path="/user/user_detail/:id?" component={UserDetail} />
            <Route
                path="/user/mseeage_detail/:id?"
                component={UserMseeageDetail}
            />
            <Route path="/user/topic_list/:id?" component={TopicList} />
            <Route path="/user/topic_detail/:id?" component={TopicDetail} />
        </Switch>
    );
};
let menu = menuList => {
    return (
        <Menu mode="inline" theme="dark" defaultOpenKeys={["用户"]}>
            {menuList.map(menu => {
                return (
                    <SubMenu title={menu.title} key={menu.title}>
                        {menu.children
                            ? menu.children.map(subMenu => {
                                  return (
                                      <Menu.Item key={subMenu.path}>
                                          <Link to={subMenu.path}>
                                              {subMenu.title}
                                          </Link>
                                      </Menu.Item>
                                  );
                              })
                            : ""}
                    </SubMenu>
                );
            })}
        </Menu>
    );
};
const mapStateToProps = state => ({
    menu: state.getIn(["common", "menu"]).toJS()
});
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getQiNiuToken: () => {
            dispatch(qiniuToken());
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
