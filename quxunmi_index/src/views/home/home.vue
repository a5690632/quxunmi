
<template>
    <div class="home">
        <div class="head">
            <!-- <router-link to="/find" class="left">
                <i class="fa fa-angle-left"></i>
            </router-link> -->
            <div class="middle">
                <!-- <img src="" alt="" v-if="!type"> -->
                <span v-if="!type"> logo</span>
                <span v-else>{{type}}</span>
            </div>
            <div class=" right">
                <i class="fa fa-bell"></i>
            </div>
        </div>
        <ul v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance="5" class="list">
            <li v-for="item in list" :key="item.id">
                <div class="user-head">
                    <dl>
                        <dt>
                            <!-- <img :src="data.user.headImg"> -->
                            <img src="../../assets/images/userimg.png">
                        </dt>
                        <dd>
                            <p class="name" @click="enterUser(item)">{{item.user.nickName}}</p>
                            <p class="address">
                                <i class="fa fa-map-marker"></i>
                                {{item.user.cityCode}}
                            </p>
                        </dd>
                    </dl>
                    <div v-if="item.followFlag==0" @click="follow(item)" class="follow">
                        {{$t('home.attention')}}
                    </div>
                    <div v-else @click="follow(item)" class="followed">
                        {{$t('home.alreadyConcerned')}}
                    </div>
                </div>
                <!-- <mt-swipe :auto="0" v-if="item.photoList">
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
                            <img src="../../assets/images/imgurl.png" @click="enterTopic(item)">
                            <div class="index">
                                {{index}}/{{images.length}}
                            </div>
                        </div>
                    </mt-swipe-item>
                </mt-swipe>

                <div class="like">
                    <div @click="like(item)" v-if="item.loveFlag==1">
                        <i class="fa fa-heart"></i>
                    </div>
                    <div v-else @click="like(item)">
                        <i class="fa fa-heart-o"></i>
                    </div>
                    <div class="contact" @click="greet(item)">
                        <i class="fa fa-weixin"></i>
                        {{$t('home.contact')}}
                    </div>
                </div>
                <div class="awesome-time">
                    <div class="awesome"> {{item.loveCount}}{{$t("home.awesome")}}</div>
                    <div class="time">
                        {{item.publishTime}}
                    </div>
                </div>
                <div class="message">
                    <div v-for="(items,index) in item.commentList" :key="index">
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
                list: [],
                popup: false,
                page: 2,
                isMore: false,
                type: "",
                loading: false,
                unlockId: "",
                images: [
                    "../../assets/images/imgurl.png",
                    "../../assets/images/imgurl.png",
                    "../../assets/images/imgurl.png"
                ],
                wechatNumber: "", //微信号
                unlocking: true
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
            this.type = this.$route.query.type;
            this.$http
                .post(INTERFACE.HOME.LIST, {
                    accessToken: "",
                    serviceData: { pageNo: 1, pageSize: 6 }
                })
                .then(res => {
                    if (res.data.resultCode == "1000") {
                        this.list = res.data.resultData.topicList;
                        if (res.data.resultData.hasNext) {
                            this.isMore = true;
                        }
                    }
                });
        },
        methods: {
            loadMore() {
                if (this.isMore) {
                    this.loading = true;
                    this.isMore = false;
                    this.$http
                        .post(INTERFACE.HOME.LIST, {
                            pageNo: this.page
                        })
                        .then(res => {
                            if (res.data.resultCode == "1000") {
                                this.page += 1;
                                this.list = this.list.concat(
                                    res.data.resultData.topicList
                                );
                                this.loading = true;
                                if (res.data.resultData.hasNext) {
                                    this.isMore = true;
                                }
                            }
                        });
                }
            },
            like(item) {
                if (item.loveFlag) {
                    this.$http
                        .post(INTERFACE.PUBLIC.UNLIKE, {
                            targetUserId: item.userId
                        })
                        .then(res => {
                            if (res.data.resultCode == "1000") {
                                item.loveFlag = 0;
                            }
                        });
                } else {
                    this.$http
                        .post(INTERFACE.PUBLIC.LIKE, {
                            targetUserId: item.userId
                        })
                        .then(res => {
                            if (res.data.resultCode == "1000") {
                                item.loveFlag = 1;
                                console.log(1);
                            }
                        });
                }
            },
            follow(item, index) {
                this.$http
                    .post(INTERFACE.PUBLIC.FOLLOW, {
                        targetUserId: item.userId
                    })
                    .then(res => {
                        if (res.data.resultCode == "1000") {
                            if (res.data.resultData.hasFollow) {
                                item.followFlag = 1;
                            } else {
                                item.followFlag = 0;
                            }
                        }
                    });
            },
            greet(item) {
                this.$http
                    .post(INTERFACE.PUBLIC.GREET, {
                        userId: item.userId
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
            enterTopic(item) {
                this.$router.push({
                    path: "/topic-detail",
                    query: {
                        id: item.userId
                    }
                });
            }
        }
    };
</script>

<style lang="less">
.head {
    display: flex;
    // justify-content: space-between;
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
        margin: auto;
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
