<template>
    <div class="user-message">
        <div class="head">
            <div class="left">
                <i class="fa fa-gear" @click="edit"></i>
            </div>
            <div class="right">
                <i class="fa fa-bell-o"></i>
            </div>
        </div>
        <div class="title">
            <dl>
                <dt>
                    <img :src="data.headImg">
                </dt>
                <dd>
                    <h3> {{data.nickName}}</h3>
                    <p>
                        <i class="fa fa-map-marker"></i>
                        {{data.cityCode}}
                    </p>
                </dd>
            </dl>

            <div class="right">
                <div class="balance" v-if="id==userId">
                    {{$t("user.balance")}}
                </div>

                <div v-else>
                    <div v-if="!data.hasFollow" @click="follow(data)" class="follow">
                        {{$t('home.attention')}}
                    </div>
                    <div v-else @click="follow(data)" class="followed">
                        {{$t('home.alreadyConcerned')}}
                    </div>
                </div>
            </div>

        </div>
        <p class="signature"> {{data.introduction}}</p>
        <div class="user-message">
            <dl>
                <dt>

                    {{data.topicNum}}
                </dt>
                <dd>
                    {{$t("user.post")}}
                </dd>
            </dl>
            <dl>
                <dt> {{data.fansNum}}</dt>
                <dd> {{$t("user.fan")}}</dd>
            </dl>
            <dl>
                <dt> {{data.followNum}}</dt>
                <dd> {{$t("home.attention")}}</dd>
            </dl>
        </div>
        <div class="nav">
            <div @click="photo">
                <img src="../../assets/images/user1.png" alt="" v-if="status!=1">
                <img src="../../assets/images/user2.png" alt="" v-if="status==1">
            </div>
            <div @click="topic">
                <img src="../../assets/images/user3.png" alt="" v-if="status!=2">
                <img src="../../assets/images/user4.png" alt="" v-if="status==2">
            </div>
            <div>
                <img src="../../assets/images/user5.png" alt="" v-if="status!=3">
                <img src="../../assets/images/user6.png" alt="" v-if="status==3">
            </div>
        </div>
        <div class="message">
            <Photo v-if="status==1" :id="id"></Photo>
            <Topic v-if="status==2" :id="id"></Topic>
            <Private v-if="status==3" :id="id"></Private>
        </div>
        <!-- <div class="unlock" v-if="id!=userId">
            <div @click="private">{{$t("user.unlockPrivate")}}</div>
            <div @click="contact">{{$t("user.unlockWeixi")}}</div>
        </div> -->
        <!-- <div class="popup" v-if="popup">
            <div class="mask"></div>
            <div class="popup-box-unlocking" v-if="unlocking">
                <i class="fa fa-close close" @click="close"></i>
                <h4>
                    {{$t("popup.titleUnlocking")}}
                </h4>
                <p>
                    {{$t("popup.textUnlocking")}}
                </p>
                <div class="btn" @click="unlock">
                    {{$t("popup.btnUnlocking")}}
                </div>
            </div>
            <div class="popup-box-unlocking" v-if="!unlocking">
                <i class="fa fa-close close" @click="close"></i>
                <h4>
                    {{$t("popup.titleUnlock")}}{{wechatNumber}}
                </h4>
                <p>
                    {{$t("popup.textUnlock")}}
                </p>
                <div class="btn" @click="copy">
                    {{$t("popup.btnUnlock")}}
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
    import INTERFACE from "@/api/index.js";
    import Photo from "../../components/photo.vue";
    import Topic from "../../components/topic.vue";
    import Private from "../../components/private.vue";
    export default {
        data() {
            return {
                data: {},
                id: "",
                popup: false,
                unlocking: true,
                status: 1
            };
        },
        components: {
            Photo,
            Topic,
            Private
        },
        computed: {
            userId() {
                return sessionStorage.getItem("userId");
            }
        },
        created() {
            if (this.$route.query.id) {
                this.id = this.$route.query.id;
            } else {
                this.id = this.userId;
            }
            this.$http.post(INTERFACE.USER.USER_INFO, { id: this.id }).then(res => {
                if (res.data.resultCode == "1000") {
                    this.data = res.data.resultData;
                }
            });
        },
        methods: {
            photo() {
                this.status = 1;
            },
            topic() {
                this.status = 2;
            },
            follow(data, index) {
                this.$http
                    .post(INTERFACE.PUBLIC.FOLLOW, {
                        targetUserId: data.userId
                    })
                    .then(res => {
                        if (res.data.resultCode == "1000") {
                            if (res.data.resultData.hasFollow) {
                                data.hasFollow = true;
                            } else {
                                data.hasFollow = false;
                            }
                        }
                    });
            },
            private() {
                this.$router.push({
                    path: "/private",
                    query: {
                        id: this.id
                    }
                });
            },
            // close() {
            //     this.popup = false;
            // },
            // contact() {
            //     this.popup = true;
            // },
            // unlock() {
            //     this.$http.post(INTERFACE.PUBLIC.UNLOCK_WECHAT).then(res => {
            //         if (res.data.code == "0000") {
            //             this.unlocking = false;
            //             this.wechatNumber = "";
            //         }
            //     });
            // },
            edit() {
                this.$router.push({
                    path: "/edit-user"
                });
            }
            // copy() {}
        }
    };
</script>

<style lang="less" scoped>
.user-message {
    .head {
        display: flex;
        justify-content: space-between;
        padding: 0 0.24rem;
        align-items: center;
        font-size: 0.48rem;
        height: 0.88rem;
    }
    .title {
        padding: 0.24rem 0.24rem 0 0.24rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        dl {
            display: flex;
            dt {
                width: 1.48rem;
                height: 1.48rem;
                border-radius: 50%;
                margin-right: 0.24rem;
                overflow: hidden;
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            dd {
                padding-top: 0.34rem;
                h3 {
                    height: 0.38rem;
                    font-size: 0.36rem;
                    color: rgba(48, 48, 58, 1);
                }
                p {
                    margin-top: 0.24rem;
                    font-size: 0.24rem;
                    color: rgba(148, 147, 152, 1);
                }
            }
        }
        .right {
            .balance {
                position: absolute;
                right: 0;
                width: 2.04rem;
                height: 0.6rem;
                background: linear-gradient(
                    -30deg,
                    rgba(255, 56, 106, 1),
                    rgba(255, 79, 123, 1)
                );
                border-radius: 0.3rem 0px 0px 0.3rem;
                text-align: center;
                font-size: 0.28rem;
                color: rgba(255, 255, 255, 1);
                line-height: 0.6rem;
            }
            .follow {
                width: 1.36rem;
                height: 0.6rem;
                background: linear-gradient(
                    -30deg,
                    rgba(255, 56, 106, 1),
                    rgba(255, 79, 123, 1)
                );
                border-radius: 0.3rem;
                font-size: 0.28rem;
                color: rgba(255, 255, 255, 1);
                text-align: center;
                line-height: 0.6rem;
            }
            .followed {
                width: 1.36rem;
                height: 0.6rem;
                border-radius: 0.3rem;
                font-size: 0.28rem;
                text-align: center;
                line-height: 0.6rem;
                border: 1px solid rgba(189, 188, 193, 1);
            }
        }
    }

    .signature {
        text-align: center;
        margin-top: 0.24rem;
        font-size: 0.28rem;
        color: rgba(148, 147, 152, 1);
    }
    .user-message {
        margin-top: 0.46rem;
        display: flex;
        justify-content: space-around;
        dl {
            text-align: center;
            dt {
                font-size: 0.36rem;
                font-weight: 500;
                color: rgba(48, 48, 58, 1);
            }
            dd {
                color: rgba(189, 188, 193, 1);
                font-size: 0.24rem;
            }
        }
    }
    .nav {
        margin-top: 0.48rem;
        display: flex;
        justify-content: space-around;
        border-top: 0.02rem solid #e5e5e5;
        padding: 0 0.24rem;
        height: 0.88rem;
        align-items: center;
        img {
            width: 0.36rem;
            height: 0.36rem;
            display: block;
        }
    }
    .message {
        height: 6.34rem;
        overflow: auto;
    }
    .unlock {
        width: 7.5rem;
        height: 0.98rem;
        position: fixed;
        bottom: 0;
        background: rgba(255, 75, 120, 1);
        font-size: 0.32rem;
        text-align: center;
        line-height: 0.6rem;
        align-items: center;
        color: white;
        display: flex;
        div:nth-child(1) {
            border-right: 0.01rem solid white;
        }
        div {
            flex-grow: 1;
            height: 0.6rem;
        }
    }
    .popup {
        top: 0;
        height: 100vh;
        width: 100vw;
        position: fixed;
        .mask {
            height: 100vh;
            width: 100vw;
            background: rgba(0, 0, 0, 0.6);
        }
        .popup-box-unlocking {
            width: 5.6rem;
            height: 3.24rem;
            background: rgba(255, 255, 255, 1);
            border-radius: 0.2rem;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 2;
            text-align: center;
            .close {
                position: absolute;
                top: 0.24rem;
                right: 0.24rem;
                font-size: 0.36rem;
            }
            h4 {
                font-size: 0.32rem;
                margin-top: 0.56rem;
                margin-bottom: 0.22rem;
            }
            p {
                font-size: 0.32rem;
                color: rgba(153, 153, 153, 1);
                margin-bottom: 0.45rem;
            }
            .btn {
                width: 3.32rem;
                height: 0.88rem;
                background: linear-gradient(
                    -30deg,
                    rgba(255, 56, 106, 1),
                    rgba(255, 79, 123, 1)
                );
                border-radius: 0.44rem;
                font-size: 0.36rem;
                line-height: 0.88rem;
                color: rgba(255, 255, 255, 1);
                margin: auto;
            }
        }
    }
}
</style>
