<template>
    <div>

    </div>
</template>
<script>
    // let conversationType = 1;
    /**
     * 时间转换
     */
    function timeFormatNotime(time) {
        var date = new Date(time),
            curDate = new Date(),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hour = date.getHours(),
            minute = date.getMinutes(),
            curYear = curDate.getFullYear(),
            curHour = curDate.getHours(),
            timeStr;
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (year < curYear) {
            timeStr = year + "年" + month + "月" + day + "日" + hour + ":" + minute;
        } else {
            var pastTime = curDate - date,
                pastH = pastTime / 3600000;

            if (pastH > curHour) {
                timeStr =
                    month + "月" + day + "日 " + "" + hour + "时" + minute + "分";
            } else if (pastH >= 1) {
                timeStr = "今天 " + hour + ":" + minute + "分";
            } else {
                var pastM = curDate.getMinutes() - minute;
                if (pastM > 1) {
                    timeStr = pastM + "分钟前";
                } else {
                    // timeStr = "刚刚";
                    timeStr = hour + ":" + minute + "分";
                }
            }
        }
        return timeStr;
    }

    function getGet() {
        querystr = window.location.href.split("?");
        if (querystr[1]) {
            let GETs = querystr[1].split("&");
            let GET = [];
            for (i = 0; i < GETs.length; i++) {
                let tmp_arr = GETs.split("=");
                let key = tmp_arr[0];
                GET[key] = tmp_arr[1];
            }
        }
        return querystr[1];
    }
    /**
     * 分割函数
     */
    function GetQueryString() {
        var obj = new Object();
        var scan_url = window.location.href.split("?")[1];
        var strs = scan_url.split("&");
        for (var x in strs) {
            var arr = strs[x].split("=");
            obj[arr[0]] = arr[1];
        }
        return obj;
    }

    export default {
        data() {
            return {
                token: "",
                targetId: ""
            };
        },
        mounted() {
            // this.firmIm = GetQueryString().firmIm
            // console.log('firmIm='+ this.firmIm)
            // var targetId  = this.firmIm
            var appKey = "8w7jv4qb827xy";
            var token = this.token;
            RongIMLib.RongIMClient.init(appKey);
            //此接口必须在init()方法之后，连接融云服务器 connect 之前调用。

            var that = this;
            //聊天功能注释

            /**
             * 融云连接状态监听
             */
            RongIMClient.setConnectionStatusListener({
                onChanged: function(status) {
                    switch (status) {
                        case RongIMLib.ConnectionStatus.CONNECTED:
                            //判断是否有GetQueryString().firmIm逻辑处理

                            that.getUnreadCount();
                            that.getTotalUnreadCount();
                            break;
                        case RongIMLib.ConnectionStatus.CONNECTING:
                            console.log("正在链接");
                            break;
                        case RongIMLib.ConnectionStatus.DISCONNECTED:
                            console.log("断开连接");
                            break;
                        case RongIMLib.ConnectionStatus
                            .KICKED_OFFLINE_BY_OTHER_CLIENT:
                            console.log("其他设备登录");
                            break;
                        case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                            console.log("域名不正确");
                            break;
                        case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                            console.log("网络不可用");
                            break;
                    }
                }
            });

            /** */
            RongIMClient.setOnReceiveMessageListener({
                // 接收到的消息
                onReceived: function(message) {
                    if (message.content.content != "") {
                        switch (message.messageType) {
                            case RongIMClient.MessageType.TextMessage:
                                break;
                            case RongIMClient.MessageType.VoiceMessage:
                                // 对声音进行预加载
                                // message.content.content 格式为 AMR 格式的 base64 码
                                break;
                            case RongIMClient.MessageType.ImageMessage:
                                // message.content.content => 图片缩略图 base64。
                                // message.content.imageUri => 原图 URL。
                                break;
                            case RongIMClient.MessageType
                                .DiscussionNotificationMessage:
                                // message.content.extension => 讨论组中的人员。
                                break;
                            case RongIMClient.MessageType.LocationMessage:
                                // message.content.latiude => 纬度。
                                // message.content.longitude => 经度。
                                // message.content.content => 位置图片 base64。
                                break;
                            case RongIMClient.MessageType.RichContentMessage:
                                // message.content.content => 文本消息内容。
                                // message.content.imageUri => 图片 base64。
                                // message.content.url => 原图 URL。
                                break;
                            case RongIMClient.MessageType
                                .InformationNotificationMessage:
                                // do something...
                                break;
                            case RongIMClient.MessageType
                                .ContactNotificationMessage:
                                // do something...
                                break;
                            case RongIMClient.MessageType
                                .ProfileNotificationMessage:
                                // do something...
                                break;
                            case RongIMClient.MessageType
                                .CommandNotificationMessage:
                                // do something...
                                break;
                            case RongIMClient.MessageType.CommandMessage:
                                // do something...
                                break;
                            case RongIMClient.MessageType.UnknownMessage:
                                // do something...
                                break;
                            default:
                            // do something...
                        }
                    }
                }
            });

            /**
             *连接融云
             */
            RongIMClient.connect(
                that.token,
                {
                    onSuccess: function(userId) {
                        that.userId = userId;
                        var callback = {
                            onSuccess: function(userId) {
                                that.userId = userId;
                            },
                            onTokenIncorrect: function() {
                                that.reset(that);
                            },
                            onError: function(errorCode) {}
                        };
                        var config = {
                            // 默认 false, true 启用自动重连，启用则为必选参数
                            auto: true,
                            // 重试频率 [100, 1000, 3000, 6000, 10000, 18000] 单位为毫秒，可选
                            url: "cdn.ronghub.com/RongIMLib-2.2.6.min.js",
                            // 网络嗅探地址 [http(s)://]cdn.ronghub.com/RongIMLib-2.2.6.min.js 可选
                            rate: [100, 1000, 3000, 6000, 10000]
                        };
                        RongIMClient.reconnect(callback, config);
                    },
                    onTokenIncorrect: function() {
                        that.reset(that);
                    },
                    onError: function(errorCode) {
                        var info = "";
                        switch (errorCode) {
                            case RongIMLib.ErrorCode.TIMEOUT:
                                info = "超时";
                                break;
                            case RongIMLib.ConnectionState
                                .UNACCEPTABLE_PAROTOCOL_VERSION:
                                info = "不可接受的协议版本";
                                break;
                            case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
                                info = "appkey不正确";
                                break;
                            case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
                                info = "服务器不可用";
                                break;
                        }
                        console.log(errorCode);
                    }
                }
            );
            //聊天功能注释
        },
        created() {
            this.gitData();
        },
        destroyed() {
            var start = new Date().getTime();
            RongIMClient.getInstance().disconnect(); //聊天功能注释
        },
        methods: {
            reset() {
                that.$ajax
                    .post(
                        that.$api + "/rongyun/getToken",
                        that.qs.stringify({
                            ryId: localStorage["ryId"]
                        })
                    )
                    .then(response => {
                        if (response.data.msg == "success") {
                            that.token = response.data.data.ryToken;
                            RongIMClient.reconnect({
                                onSuccess: function(msg) {
                                    that.userId = userId;
                                    that.ryName = localStorage["ryName"];

                                    //重连成功
                                },
                                onError: function(error) {
                                    //重连失败
                                    console.log(error);
                                }
                            });
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },

            reconnect() {
                /*
                        1: reconnect 是重新连接，并没有重连机制，调用此方法前应该进行网络嗅探，网络正常再调用 reconnect。
                        2: 提示其他设备登录请勿调用重连方法。
                        3: docs   http://www.rongcloud.cn/docs/api/js/RongIMClient.html
                                    */

                var that = this;
                var start = new Date().getTime();
                begin = new Date().getTime();
                RongIMClient.reconnect({
                    onSuccess: function(userId) {},
                    onTokenIncorrect: function() {
                        that.reset(that);
                    },
                    onError: function(errorCode) {
                        var info = "";
                        switch (errorCode) {
                            case RongIMLib.ErrorCode.TIMEOUT:
                                info = "超时";

                                break;
                            case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                                info = "未知错误";
                                break;
                            case RongIMLib.ErrorCode.UNACCEPTABLE_PROTOCOL_VERSION:
                                info = "不可接受的协议版本";
                                break;
                            case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                                info = "appkey不正确";
                                break;
                            case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                                info = "服务器不可用";
                                break;
                        }
                    }
                });
            },
            /**
             * 获取新消息数量
             * param(token)  变量token=>即token
             */
            getMessageNum(token) {
                RongIMClient.getInstance().hasRemoteUnreadMessages(token, {
                    onSuccess: function(hasMessage) {
                        if (hasMessage) {
                            /**
                             * 获取未读消息方法
                             */
                            RongIMClient.getInstance().getTotalUnreadCount({
                                onSuccess: function(count) {
                                    // count => 所有会话总未读数。
                                },
                                onError: function(error) {
                                    // error => 获取总未读数错误码。
                                }
                            });
                        } else {
                            // 没有未读的消息
                        }
                    },
                    onError: function(err) {
                        // 错误处理...
                    }
                });
            },

            getToken() {
                this.$http.post(INTERFACE.CHATROOM.TOKEN, {
                    userId: sessionStorage.getItem("userId")
                });
            },

            sendHello(that) {
                var msg = new RongIMLib.TextMessage({
                    content: "",
                    extra: "附加信息"
                });
                var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
                var targetId = that.targetId; // 目标 Id
                RongIMClient.getInstance().sendMessage(
                    conversationtype,
                    targetId,
                    msg,
                    {
                        onSuccess: function(message) {},
                        onError: function(errorCode, message) {
                            var info = "";
                            switch (errorCode) {
                                case RongIMLib.ErrorCode.TIMEOUT:
                                    info = "超时";
                                    break;
                                case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                                    info = "未知错误";
                                    break;
                                case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                                    info = "在黑名单中，无法向对方发送消息";
                                    break;
                                case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                                    info = "不在讨论组中";
                                    break;
                                case RongIMLib.ErrorCode.NOT_IN_GROUP:
                                    info = "不在群组中";
                                    break;
                                case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                                    info = "不在聊天室中";
                                    break;
                                default:
                                    info = x;
                                    break;
                            }
                        }
                    }
                );
            },
            sendTextMessage(textContent) {
                var that = this;
                var msg = new RongIMLib.TextMessage({
                    content: textContent,
                    extra: "附加信息"
                });
                var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
                var targetId = that.targetId; // 目标 Id
                RongIMClient.getInstance().sendMessage(
                    conversationtype,
                    targetId,
                    msg,
                    {
                        onSuccess: function(message) {
                            //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                        },
                        onError: function(errorCode, message) {
                            var info = "";
                            switch (errorCode) {
                                case RongIMLib.ErrorCode.TIMEOUT:
                                    info = "超时";
                                    break;
                                case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                                    info = "未知错误";
                                    break;
                                case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                                    info = "在黑名单中，无法向对方发送消息";
                                    break;
                                case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                                    info = "不在讨论组中";
                                    break;
                                case RongIMLib.ErrorCode.NOT_IN_GROUP:
                                    info = "不在群组中";
                                    break;
                                case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                                    info = "不在聊天室中";
                                    break;
                                default:
                                    info = x;
                                    break;
                            }
                        }
                    }
                );
            },

            //清除当前未读数
            clearUnreadCount(targetId) {
                /*
                        此方法清除当前端的未读数，并不会多端同步，
                        多端同步需要发送 SyncReadStatusMessage：http://support.rongcloud.cn/kb/NjE0
                */

                var start = Date.now();
                var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
                RongIMClient.getInstance().clearUnreadCount(
                    conversationtype,
                    targetId,
                    {
                        onSuccess: function() {
                            console.log("清除未读数成功", "success", start);
                        },
                        onError: function(error) {
                            console.log("清除未读数失败", error, start);
                        }
                    }
                );
            },
            //获取单一用户消息条数
            getUnreadCount() {
                var that = this;
                /*
                        阅读时间戳缓存在 localStorage 中，消息状态根据发送时间和阅读时间戳对比判断
                        每次接受新消息后通过重新调用此方法计算
                    */
                var start = new Date().getTime();

                RongIMClient.getInstance().getUnreadCount("PRIVATE", that.userId, {
                    onSuccess: function(count) {
                        // console.log("获取会话未读数成功", count, start);
                    },
                    onError: function(error) {
                        // console.log("获取会话未读数失败", error, start);
                    }
                });
            },

            //获取未读消息总条数
            getTotalUnreadCount() {
                var that = this;
                /*
                            阅读时间戳缓存在 localStorage 中，消息状态根据发送时间和阅读时间戳对比判断
                            每次接受新消息后通过重新调用此方法计算
                    */
                var start = new Date().getTime();
                RongIMClient.getInstance().getTotalUnreadCount({
                    onSuccess: function(count) {
                        // console.log("获取总未读数成功", count, start);
                    },
                    onError: function(error) {
                        // console.log("获取总未读数失败", error, start);
                    }
                });
            },

            //图片上传成功函数
            upSuccess(response, file, fileList) {
                var that = this;
                if (response.code == 1 && response.msg == "success") {
                    var base64Str = response.data.imgUrl;
                    var imageUri = response.data.imgUrl; // 上传到自己服务器的 URL。
                    var msg = new RongIMLib.ImageMessage({
                        content: base64Str,
                        imageUri: imageUri
                    });
                    var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
                    var targetId = that.targetId; // 目标 Id
                    RongIMClient.getInstance().sendMessage(
                        conversationtype,
                        targetId,
                        msg,
                        {
                            onSuccess: function(message) {
                                //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                                console.log("Send successfully");
                            },
                            onError: function(errorCode, message) {
                                var info = "";
                                switch (errorCode) {
                                    case RongIMLib.ErrorCode.TIMEOUT:
                                        info = "超时";
                                        break;
                                    case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                                        info = "未知错误";
                                        break;
                                    case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                                        info = "在黑名单中，无法向对方发送消息";
                                        break;
                                    case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                                        info = "不在讨论组中";
                                        break;
                                    case RongIMLib.ErrorCode.NOT_IN_GROUP:
                                        info = "不在群组中";
                                        break;
                                    case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                                        info = "不在聊天室中";
                                        break;
                                    default:
                                        info = x;
                                        break;
                                }
                                console.log("发送失败:" + info);
                            }
                        }
                    );
                }
            }
        }
    };
</script>

