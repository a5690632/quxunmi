<template>
    <div class="private">
        <div class="close">
            <i class="fa fa-close"></i>
        </div>
        <div class="message">
            <h3> {{$t("user.privateInformation")}}</h3>
            <div class="" :class="[status?  '' : 'blur', content]">
                <p>
                    <span>{{$t("user.height")}}:{{data.prvateInfo.height}}</span>
                    <span>{{$t("user.weight")}}:{{data.prvateInfo.weight}}</span>
                    <span>{{$t("user.shoeSize")}}:{{data.prvateInfo.shoeSize}}</span>
                </p>
                <p>
                    <span> {{$t("user.bustSize")}}:{{data.prvateInfo.bustSize}}</span>
                    <span>{{$t("user.waistSize")}}:{{data.prvateInfo.waistSize}}</span>
                    <span>{{$t("user.hipSize")}}:{{data.prvateInfo.hipSize}}</span>
                </p>
                <p>
                    <span> {{$t("user.eyeColor")}}:{{data.prvateInfo.eyeColor}}</span>
                    <span>{{$t("user.hairColor")}}:{{data.prvateInfo.hairColor}}</span>
                </p>
            </div>
            <h3> {{$t("user.userTag")}}</h3>
            <div :class="[status?  '' : 'blur', tag]">
                <p>{{$t("user.styleTagList")}}: <span v-for="item in data.privateTags.styleTagList" :key="item">{{item}}</span> </p>
                <p>{{$t("user.appearTagList")}}:<span v-for="item in data.privateTags.appearTagList" :key="item">{{item}}</span></p>
                <p>{{$t("user.bodilyFormTagList")}}:<span v-for="item in data.privateTags.bodilyFormTagList" :key="item">{{item}}</span></p>
                <p>{{$t("user.charmTagList")}}:<span v-for="item in data.privateTags.charmTagList" :key="item">{{item}}</span></p>
            </div>
            <!-- <h3> {{$t("user.work")}}</h3> -->
        </div>
        <div class="unlock" @click="unlock">
            <p class="title">{{$t("user.unlockText")}}</p>
            <p class="tip">{{$t("user.unlockTexts")}}</p>
        </div>
    </div>
</template>

<script>
    import INTERFACE from "@/api/index.js";
    export default {
        data() {
            return {
                id: "",
                data: {
                    privateTags: {
                        styleTagList: [],
                        appearTagList: [],
                        bodilyFormTagList: [],
                        charmTagList: []
                    },
                    prvateInfo: {
                        height: "",
                        weight: "",
                        shoeSize: "",
                        bustSize: "",
                        waistSize: "",
                        hipSize: "",
                        eyeColor: "",
                        hairColor: ""
                    }
                },
                status: 0
            };
        },
        created() {
            this.id = this.$route.query.id;
        },
        methods: {
            close() {
                this.$router.go(-1);
            },
            unlock() {},
            getData() {
                this.$http(INTERFACE.USER.PRIVATE).then(res => {
                    if (res.data.resultCode == "1000") {
                        this.data = res.data.resultData;
                        this.status = 1;
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>
.private {
    .close {
        height: 0.88rem;
        display: flex;
        align-items: center;
        i {
            font-size: 0.33rem;
            margin-left: 0.33rem;
        }
    }
    .message {
        padding-left: 0.24rem;
        font-size: 0.28rem;
        h3 {
            margin-top: 0.56rem;
            font-size: 0.36rem;
            font-weight: 500;
            color: rgba(48, 48, 58, 1);
            margin-bottom: 0.3rem;
        }
        .content {
            font-weight: 400;
            color: rgba(104, 104, 104, 1);
            p {
                span {
                    display: inline-block;
                    width: 2rem;
                    margin-bottom: 0.26rem;
                }
            }
        }
        .tag {
            p {
                span {
                    display: inline-block;
                    padding-left: 0.08rem;
                    padding-right: 0.08rem;
                    margin-bottom: 0.26rem;
                }
            }
        }
        .blur {
            filter: blur(3px);
        }
    }
    .unlock {
        width: 7.02rem;
        height: 0.94rem;
        background: linear-gradient(
            -30deg,
            rgba(255, 56, 106, 1),
            rgba(255, 79, 123, 1)
        );
        border-radius: 0.48rem;
        position: fixed;
        left: 0.24rem;
        bottom: 0.12rem;
        padding-top: 0.12rem;
        text-align: center;
        .title {
            font-size: 0.36rem;
            color: rgba(255, 255, 255, 1);
        }
        .tip {
            font-size: 0.24rem;
            color: rgba(255, 255, 255, 1);
        }
    }
}
</style>
