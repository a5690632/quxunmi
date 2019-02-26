<template>
    <div class="photo">
        <ul v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="list" v-if="!showUpload">
            <li v-for="(item,index) in data" :key="index">
                <img src="item">
            </li>
        </ul>
        <!-- <div class="upload" v-if="showUpload">
            <div class="logo">
                <div class="upload-container">
                    <div class="imgBox">
                        <input type="file" class="inputstyle" name="file" @change="previewImage" />
                        <img :src="imageUrl" alt="" class="fileImg">
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
    import INTERFACE from "@/api/index.js";
    export default {
        prop: ["id"],
        data() {
            return {
                data: {},
                isMore: false,
                page: 2,
                // showUpload: false,
                loading: false,
                qiniutoke: "",
                imageUrl: ""
            };
        },
        methods: {
            loadMore() {
                if (this.isMore) {
                    this.loading = true;
                    this.isMore = false;
                    this.$http
                        .post(INTERFACE.HOME.PHOTO, {
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
            }
            // previewImage(event) {
            //     var addr = "http://opf2ucy0n.bkt.clouddn.com/";
            //     var file = event.target.files[0];
            //     var formData = new FormData();
            //     formData.append("file", file);
            //     formData.append("token", this.qiniutoke);
            //     this.$http({
            //         url: "http://up-z1.qiniu.com/",
            //         type: "POST",
            //         dataType: "json",
            //         cache: false,
            //         data: formData,
            //         processData: false,
            //         contentType: false
            //     })
            //         .done(res => {
            //             this.imageUrl = addr + res.key;
            //         })
            //         .fail(function(err) {
            //             console.log("error");
            //         });
            // }
        },
        created() {
            this.$http
                .post(INTERFACE.USER.PHOTO, {
                    userId: this.id,
                    pageNo: 1
                })
                .then(res => {
                    if (res.data.resultCode == "1000") {
                        this.data = res.data.resultData.photoList;
                        if (res.data.resultData.photoList.length < 0) {
                            this.showUpload = true;
                        }

                        if (res.data.resultData.hasNext) {
                            this.isMore = true;
                        }
                    }
                });
            this.$http.post(INTERFACE.PUBLIC.QINIUTOKEN).then(res => {
                this.qiniutoke = res.data.token;
            });
        }
    };
</script>

<style lang="less" scoped>
.photo {
    .list {
        display: flex;
        padding: 0.24rem;
        li {
            margin-bottom: 0.08rem;
            margin-right: 0.08rem;
            width: 2.28rem;
            height: 2.28rem;
            border-radius: 0.1rem;
            flex-wrap: wrap;
            img {
                width: 100%;
                height: 100%;
            }
        }
        li:nth-child(3n) {
            margin-right: 0;
        }
    }
}
</style>
