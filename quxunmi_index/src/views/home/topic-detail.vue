
<template>
    <div class="home">
        <div class="head">
            <div class="left" @click="back">
                <i class="fa fa-angle-left"></i>
            </div>
            <div class="middle">
                <!-- <img src="" alt="" v-if="!type"> -->
                <!-- <span v-if="!type"> logo</span>
                <span v-else>{{type}}</span> -->
            </div>
        </div>
        <ul class="list">
            <li>
                <div class="user-head">
                    <dl>
                        <dt>
                            <!-- <img :src="data.user.headImg"> -->
                            <img src="../../assets/images/userimg.png">
                        </dt>
                        <dd>
                            <p class="name" @click="enterUser(data)">{{data.user.nickName}}</p>
                            <p class="address">
                                <i class="fa fa-map-marker"></i>
                                {{data.user.cityCode}}
                            </p>
                        </dd>
                    </dl>

                    <div v-if="data.followFlag==0" @click="follow(data)" class="follow">
                        {{$t('home.attention')}}
                    </div>
                    <div v-else @click="follow(data)" class="followed">
                        {{$t('home.alreadyConcerned')}}
                    </div>
                </div>
                <!-- <mt-swipe :auto="0" v-if="data.photoList">
                    <mt-swipe-item v-for="(items,index) in item.images" :key="items">
                        <img src="items">
                        <div>
                            {{index}}/{{item.images.length}}
                        </div>
                    </mt-swipe-item>
                </mt-swipe> -->
                <mt-swipe :auto="0" class="swiper">
                    <mt-swipe-item v-for="(items,index) in images" :key="index">
                        <div>
                            <img src="../../assets/images/imgurl.png">
                            <div class="index">
                                {{index}}/{{images.length}}
                            </div>
                        </div>
                    </mt-swipe-item>
                </mt-swipe>
                <div class="like">
                    <div @click="like(data)" v-if="data.loveFlag==1">
                        <i class="fa fa-heart"></i>
                    </div>
                    <div v-else @click="like(data)">
                        <i class="fa fa-heart-o"></i>
                    </div>
                    <div class="contact" @click="contact(data)">
                        <i class="fa fa-weixin"></i>
                        {{$t('home.contact')}}
                    </div>
                </div>
                <div class="awesome-time">
                    <div class="awesome"> {{data.loveCount}}{{$t("home.awesome")}}</div>
                    <div class="time">

                        {{data.publishTime}}
                    </div>
                </div>
                <div class="message">
                    <div v-for="(items,index) in data.commentList" :key="index">
                        {{items.content}}
                    </div>
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
    import { InfiniteScroll } from "mint-ui";
    import Vue from "vue";
    Vue.use(InfiniteScroll);
    import { Swipe, SwipeItem } from "mint-ui";
    import INTERFACE from "@/api/index.js";
    export default {
        data() {
            return {
                data: {},
                page: 1,
                id: "",
                images: [
                    "../../assets/images/imgurl.png",
                    "../../assets/images/imgurl.png",
                    "../../assets/images/imgurl.png"
                ]
            };
        },
        components: {
            Swipe,
            SwipeItem
        },
        computed: {
            userId() {
                return sessionStorage.getItem("userId");
            }
        },
        created() {
            this.id = this.$route.query.id;
            this.$http
                .post(INTERFACE.HOME.TOPIC_DETAIL, {
                    topicId: 1
                })
                .then(res => {
                    if ((res.data.resultCode = "1000")) {
                        this.data = res.data.resultData.topic;
                    }
                });
        },
        methods: {
            like(data) {
                if (data.loveFlag) {
                    this.$http
                        .post(INTERFACE.PUBLIC.UNLIKE, {
                            targetUserId: data.userId
                        })
                        .then(res => {
                            if (res.data.resultCode == "1000") {
                                data.loveFlag = 0;
                            }
                        });
                } else {
                    this.$http
                        .post(INTERFACE.PUBLIC.LIKE, {
                            targetUserId: data.userId
                        })
                        .then(res => {
                            if (res.data.resultCode == "1000") {
                                data.loveFlag = 1;
                            }
                        });
                }
            },
            follow(data, index) {
                this.$http
                    .post(INTERFACE.PUBLIC.FOLLOW, {
                        targetUserId: data.userId
                    })
                    .then(res => {
                        if (res.data.resultCode == "1000") {
                            if (res.data.resultData.hasFollow) {
                                data.followFlag = 1;
                            } else {
                                data.followFlag = 0;
                            }
                        }
                    });
            },
            greet(data) {
                this.$http
                    .post(INTERFACE.PUBLIC.GREET, {
                        userId: data.userId
                    })
                    .then(res => {
                        if (res.data.resultCode == "1000") {
                            if (res.data.resultData) {
                                Toast({
                                    message: res.data.resultMessage,
                                    iconClass: "icon icon-success"
                                });
                            } else {
                                Toast({
                                    message: res.data.resultMessage,
                                    iconClass: "icon icon-error"
                                });
                            }
                        }
                    });
            },
            enterUser(item) {
                this.$router.push({
                    path: "/user",
                    query: {
                        id: item.userId
                    }
                });
            },
            back() {
                this.$router.go(-1);
            }
        }
    };
</script>

<style lang="less">
.head {
    display: flex;
    justify-content: space-between;
    padding: 0 0.24rem;
    height: 0.88rem;
    align-items: center;
    .left {
        font-size: 0.48rem;
    }
    .right {
        font-size: 0.48rem;
    }
    .middle {
        font-size: 0.36rem;
        img {
        }
    }
}
.list {
    .user-head {
        display: flex;
        justify-content: space-between;
        padding: 0 0.24rem;
        height: 1.12rem;
        align-items: center;
        dl {
            display: flex;

            dt {
                width: 0.64rem;
                height: 0.64rem;
                border-radius: 50%;
                margin-right: 0.26rem;
                img {
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
            dd {
                .name {
                    height: 0.28rem;
                    font-size: 0.28rem;
                    font-weight: 500;
                    color: rgba(48, 48, 58, 1);
                    margin-bottom: 0.08rem;
                }
                .address {
                    font-size: 0.24em;
                    font-weight: 400;
                    color: rgba(148, 147, 152, 1);
                }
            }
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
    .swiper {
        width: 7.5rem;
        height: 6.5rem;
        .mint-swipe-item {
            div {
                position: relative;
                img {
                    max-width: 7.5rem;
                    max-height: 6.54rem;
                    display: block;
                    margin: auto;
                }
                .index {
                    background: rgba(0, 0, 0, 1);
                    opacity: 0.6;
                    border-radius: 0.2rem;
                    font-size: 0.24rem;
                    color: rgba(255, 255, 255, 1);
                    right: 0.24rem;
                    top: 0.24rem;
                    position: absolute;
                    padding-left: 0.08rem;
                    padding-right: 0.08rem;
                }
            }
        }
    }
    .like {
        display: flex;
        padding: 0 0.24rem;
        justify-content: space-between;
        align-items: center;
        height: 0.96rem;
        font-size: 0.28rem;
        .fa {
            font-size: 0.48rem;
        }
    }
    .awesome-time {
        display: flex;
        padding: 0 0.24rem;
        font-size: 0.28rem;

        .awesome {
            color: rgba(48, 48, 58, 1);
            margin-right: 0.26rem;
        }
        .time {
            color: rgba(148, 147, 152, 1);
        }
    }
    .message {
        padding: 0.21rem 0.24rem 0.6rem;
        font-size: 0.28rem;
        font-weight: 500;
        color: rgba(48, 48, 58, 1);
        line-height: 36px;
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
</style>
