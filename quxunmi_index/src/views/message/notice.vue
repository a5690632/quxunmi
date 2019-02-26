<template>
    <div>
        <h3>
            {{$t("message.iLike")}}
        </h3>
        <ul>
            <li v-for="item in data.iLike" :key="item.name">
                <dl>
                    <dt></dt>
                    <dd></dd>
                </dl>
            </li>
        </ul>
        <h3>
            {{$t("message.likeMe")}}
        </h3>
        <ul>
            <li v-for="item in data.iLike" :key="item.name">
                <dl>
                    <dt></dt>
                    <dd>
                        <div></div>
                        <p></p>
                    </dd>
                </dl>
            </li>
        </ul>
    </div>
</template>

<script>
    import { InfiniteScroll } from "mint-ui";
    import INTERFACE from "@/api/index.js";
    export default {
        data() {
            return {
                list: [],
                isMore: true,
                page: 2
            };
        },
        computed: {
            userId() {
                return sessionStorage.getItem("userId");
            }
        },
        created() {
            this.$http.post(INTERFACE.MESSAGE.GET_NOTICE, {}).then(res => {
                if ((res.data.code = "0000")) {
                    this.list = res.data.data.pageList;
                }
            });
        },
        methods: {
            loadMore() {
                if (this.isMore) {
                    this.loading = true;
                    this.isMore = false;
                    this.$http
                        .post(INTERFACE.MESSAGE.GET_NOTICE, {
                            page: this.page
                        })
                        .then(res => {
                            if (res.data.code == "0000") {
                                if (res.data.data.pageList.length > 0) {
                                    this.isMore = true;
                                    this.page += 1;
                                    this.list = this.list.concat(
                                        res.data.data.pageList
                                    );
                                    this.loading = true;
                                }
                            }
                        });
                }
            }
        }
    };
</script>

<style scoped>
</style>
