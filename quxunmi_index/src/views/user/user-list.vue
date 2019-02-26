<template>
    <div class="user-list">
        <div class="head">
            <div class="left" @click="back">
                <i class="fa fa-angle-left"></i>
            </div>
            <div class="middle" v-show="type==1">
                粉丝
            </div>
            <div class="middle" v-show="type==2">
                已关注
            </div>
        </div>
        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="list">
            <li v-for="(item,index) in list" :key="index">
                <dl>
                    <dt><img :src="item.headImg"></dt>
                    <dd>
                        {{item.nickName}}
                    </dd>
                </dl>
                <div class="button-box">
                    <div @click="follow(item.userId)" v-if="item.hasFollowed==0" class="follow">
                        {{$t("home.attention")}}
                    </div>
                    <div @click="follow(item.userId,index)" v-if="item.hasFollowed==1" class="followed">
                        {{$t("home.alreadyConcerned")}}
                    </div>
                    <!-- <div @click="remove(item.userId,index)" class="remove">
                        {{$t("user.remove")}}
                    </div> -->
                </div>

            </li>
        </ul>
    </div>
</template>

<script>
    import INTERFACE from "@/api/index.js";
    export default {
        data() {
            return {
                list: [],
                isMore: true,
                page: 2,
                type: 1
            };
        },
        methods: {},
        computed: {
            userId() {
                return sessionStorage.getItem("userId");
            }
        },
        created() {
            this.id = this.$route.query.id;
            this.type = this.$route.query.type;
            if (this.type == 1) {
                this.$http
                    .post(INTERFACE.USER.FANS, {
                        pageNum: 1
                    })
                    .then(res => {
                        if (res.data.resultCode == "1000") {
                            this.list = res.data.resultData.fansList;
                        }
                    });
            } else {
                this.$http
                    .post(INTERFACE.USER.FOLLOWLIST, {
                        pageNum: 1
                    })
                    .then(res => {
                        if (res.data.resultCode == "1000") {
                            this.list = res.data.resultData.fansList;
                        }
                    });
            }
        },
        methods: {
            loadMore() {
                if (this.isMore) {
                    this.loading = true;
                    this.isMore = false;
                    if (this.type == 1) {
                        this.$http
                            .post(INTERFACE.USER.FANS, {
                                pageNum: 1
                            })
                            .then(res => {
                                if (res.data.resultCode == "1000") {
                                    this.list = this.list.concat(
                                        res.data.resultData.fansList
                                    );
                                    this.loading = true;
                                    if (res.data.resultData.hasNext) {
                                        this.isMore = true;
                                        this.page += 1;
                                    }
                                }
                            });
                    } else {
                        this.$http
                            .post(INTERFACE.USER.FOLLOWLIST, {
                                pageNum: 1
                            })
                            .then(res => {
                                if (res.data.resultCode == "1000") {
                                    this.list = this.list.concat(
                                        res.data.resultData.fansList
                                    );
                                    this.loading = true;
                                    if (res.data.resultData.hasNext) {
                                        this.isMore = true;
                                        this.page += 1;
                                    }
                                }
                            });
                    }
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
            remove(id, index) {
                this.$http.post(INTERFACE.USER.REMOVE_FAN).then(res => {
                    if (res.data.resultCode == "1000") {
                        this.list.splice(index, 1);
                    }
                });
            },
            back() {
                this.$router.go(-1);
            }
        }
    };
</script>

<style lang="less" scoped>
.user-list {
    .head {
        display: flex;
        justify-content: space-between;
        padding: 0 0.24rem;
        height: 0.88rem;
        align-items: center;
        .left {
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
        li {
            display: flex;
            padding: 0 0.24rem;
            align-items: center;
            height: 1.6rem;
            dl {
                display: flex;
                dt {
                    width: 1.1rem;
                    height: 1.1rem;
                    border-radius: 50%;
                    margin-right: 0.26rem;
                    overflow: hidden;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                dd {
                    width: 2rem;
                    font-size: 0.28rem;
                    font-weight: 500;
                    color: rgba(48, 48, 58, 1);
                }
            }
            .button-box {
                margin-left: 0.94rem;
                display: flex;
                justify-content: center;
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
                .remove {
                    margin-left: 0.08rem;
                    border: 1px solid rgba(255, 56, 106, 1);
                    color: rgba(255, 56, 106, 1);
                    border-radius: 30px;
                    width: 1.12rem;
                    height: 0.6rem;
                    border-radius: 0.3rem;
                    font-size: 0.28rem;
                    text-align: center;
                    line-height: 0.6rem;
                }
            }
        }
    }
}
</style>
