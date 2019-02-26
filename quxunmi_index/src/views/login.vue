<template>
    <div class="login">
        <div class="back">
            <i class="fa fa-remove"></i>
            <!-- <img src="" alt=""> -->
        </div>
        <h3>
            {{$t('login.title')}}
        </h3>
        <div class="input">
            <input type="text" name="text" v-model="userName" :placeholder="$t('login.userPlaceholder')">
            <div class="code">
                <input type="text" name="code" v-model="code" :placeholder="$t('login.codePlaceholder')">
                <span v-show="!timeShow" class="send" @click="sendcode">
                    {{$t("login.send")}}
                </span>
                <span v-show="timeShow" class="time">
                    {{time}} {{$t("login.timeShow")}}
                </span>
            </div>
        </div>
        <div class="btn" @click="login">
            {{$t("login.login")}}
        </div>
        <p class="description">{{$t("login.description")}} <span>{{$t("login.agreement")}}</span> </p>
    </div>
</template>

<script>
    import INTERFACE from "@/api/index.js";
    import { Toast } from "mint-ui";
    export default {
        data() {
            return {
                userName: "",
                code: "",
                time: 60,
                timeShow: false
            };
        },
        methods: {
            back() {
                this.router.go(-1);
            },
            sendcode() {
                var re = /^1[3456789]\d{9}$/;
                if (re.test(this.userName)) {
                    var timer = setInterval(() => {
                        if (this.time > 0) {
                            this.time -= 1;
                        } else {
                            clearInterval(timer);
                            this.timeShow = false;
                        }
                    }, 1000);
                    this.$http
                        .post(INTERFACE.LOGIN.SEND_CODE, {
                            serviceData: { phone: this.userName }
                        })
                        .then(res => {
                            if (res.data.resultCode == "1000") {
                                this.timeShow = false;
                            } else {
                                // Toast({
                                //     message: res.data.resultMessage,
                                //     iconClass: "icon icon-error"
                                // });
                            }
                        });
                } else {
                    Toast({
                        message: "请输入正确的手机号",
                        iconClass: "icon icon-error"
                    });
                }
            },
            login() {
                var re = /^1[3456789]\d{9}$/;
                if (!re.test(this.userName)) {
                    Toast({
                        message: "请输入正确的手机号",
                        iconClass: "icon icon-error"
                    });
                    return;
                }
                if (!this.code) {
                    Toast({
                        message: "请输入验证码",
                        iconClass: "icon icon-error"
                    });
                    return;
                }
                this.$http
                    .post(INTERFACE.LOGIN.LOGIN, {
                        serviceData: {
                            phone: this.userName,
                            smsCode: this.code
                        }
                    })
                    .then(res => {
                        if (res.data.resultCode == "1000") {
                            sessionStorage.setItem(
                                "token",
                                res.data.resultData.accessToken
                            );
                            sessionStorage.setItem(
                                "userId",
                                res.data.resultData.userId
                            );
                            sessionStorage.setItem(
                                "imToken",
                                res.data.resultData.imToken
                            );

                            Toast({
                                message: "登陆成功",
                                iconClass: "icon icon-success"
                            });
                            if (res.data.resultData.type == 1) {
                                this.$router.push({
                                    path: "/home"
                                });
                            } else {
                                this.$router.push({
                                    path: "/user/user-info"
                                });
                            }
                        } else {
                            Toast({
                                message: res.data.resultMessage,
                                iconClass: "icon icon-error"
                            });
                        }
                    });
            }
        }
    };
</script>

<style lang="less">
.login {
    padding: 0 0.48rem;
    .back {
        font-size: 0.48rem;
        position: absolute;
        left: 0.24rem;
        top: 0.2rem;
    }
    h3 {
        font-size: 0.6rem;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(48, 48, 58, 1);
        margin-top: 1.52rem;
    }
    .input {
        input {
            height: 0.9rem;
            width: 100%;
            border: none;
            border-bottom: 0.01rem solid #e5e5e5;
        }
        input::placeholder {
            font-size: 0.32rem;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(148, 147, 152, 1);
        }
        .code {
            position: relative;
            span {
                position: absolute;
                display: block;
                right: 0;
                bottom: 0;
                height: 0.9rem;
                line-height: 0.9rem;
                font-size: 0.28rem;
            }
            .send {
                color: #ff386a;
            }
            .time {
                color: #949398;
            }
        }
    }
    .btn {
        margin-top: 0.56rem;
        width: 6.54rem;
        height: 0.94rem;
        background: linear-gradient(
            -30deg,
            rgba(255, 56, 106, 1),
            rgba(255, 79, 123, 1)
        );
        border-radius: 0.47rem;
        text-align: center;
        line-height: 0.94rem;
        font-size: 0.36rem;
        color: rgba(255, 255, 255, 1);
    }
    .description {
        text-align: center;
        font-size: 0.24rem;
        font-weight: 400;
        color: rgba(189, 188, 193, 1);
        margin-top: 0.24rem;
        span {
            color: #55a4fb;
        }
    }
}
</style>
