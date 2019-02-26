<template>
    <div class="find">
        <div class="head">
            <div>{{$t("find.find")}}</div>
            <!-- <div class="right">
                <i class="fa fa-filter"></i>
            </div> -->
        </div>
        <div class="title">
            {{$t("find.title")}}
        </div>
        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="list">
            <li v-for="item in list" :key="item.id" @click="enterUser(item)">
                <img :src="item.headImg">
            </li>
        </ul>
    </div>
</template>

<script>
    import { Header } from "mint-ui";
    import INTERFACE from "@/api/index.js";
    export default {
        data() {
            return {
                list: [],
                page: 2,
                isMore: false
            };
        },
        created() {
            this.$http
                .post(INTERFACE.HOME.FIND, {
                    pageNo: 1
                })
                .then(res => {
                    if (res.data.resultCode == "1000") {
                        this.list = res.data.resultData.fresshList;

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
                        .post(INTERFACE.HOME.FIND, {
                            pageNo: this.page
                        })
                        .then(res => {
                            if (res.data.resultCode == "1000") {
                                this.list = this.list.concat(
                                    res.data.data.fresshList
                                );
                                this.page += 1;
                                this.loading = true;
                                if (res.data.resultData.hasNext) {
                                    this.isMore = true;
                                }
                            }
                        });
                }
            },
            enterUser(item) {
                this.$router.push({
                    path: "/user",
                    query: {
                        id: item.id
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>
.find {
    .head {
        display: flex;
        justify-content: center;
        font-size: 0.36rem;
        height: 0.88rem;
        line-height: 0.88rem;
    }
    .title {
        font-size: 0.28rem;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 0.68rem;
        height: 0.68rem;
        background: rgba(85, 164, 251, 1);
        text-align: center;
    }
    .list {
        display: flex;
        padding: 0.1rem;
        flex-wrap: wrap;
        li {
            margin-bottom: 0.08rem;
            margin-right: 0.08rem;
            width: 3.6rem;
            height: 3.6rem;
            border-radius: 0.1rem;
            img {
                width: 100%;
                height: 100%;
            }
        }
        li:nth-child(2n) {
            margin-right: 0;
        }
    }
}
</style>
