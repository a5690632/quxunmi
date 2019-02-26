<template>
    <div>
        <div class="head">
            <i></i>
            <div>
                {{$t("public.editName")}}
            </div>
            <div>{{$t("public.save")}}</div>
        </div>
        <div class="avatar">
            <img :src="from.headImg" alt="">
        </div>
        <div>
            <div>
                <p>姓名</p>
                <input type="text" v-model="form.nickName">
            </div>
            <div>
                <p>地区</p>
                <!-- <p>{{form.province}}{{form.city}}{{form.county}}</p> -->
                <!-- <mt-popup position="bottom" v-model="addressVisible" class="address_picker">
                    <mt-picker ref="address" :slots="addressSlots" value-key="name" :item-height="30" @change="onValuesChange">
                    </mt-picker>
                    <span class="confirm" @click="addressVisible=false">确定</span>
                </mt-popup> -->
            </div>
            <div>
                <p>职业</p>
                <input type="text" v-model="form.occupation">
            </div>
            <div>
                <p>个人简介</p>
                <input type="text" v-model="form.introduction">
            </div>
            <div>
                <p>电话</p>
                <input type="text" v-model="form.phone">
            </div>
            <div>
                <p>性别</p>
                <mt-popup position="bottom" v-model="sexVisible" class="address_picker">
                    <mt-picker :slots="sexList" :item-height="30" @change="onSexChange"></mt-picker>
                    <span class="confirm" @click="sexVisible=false">确定</span>
                </mt-popup>
            </div>
            <div>
                <p>年龄</p>
                <input type="text" v-model="form.age">
            </div>
        </div>
    </div>
</template>
<script>
    import INTERFACE from "@/api/index.js";
    import { Picker } from "mint-ui";
    export default {
        data() {
            return {
                id: "",
                addressVisible: false,
                sexVisible: false,
                form: {
                    headImg: "", //头像
                    nickName: "", //姓名
                    gender: "", //性别
                    occupation: "", //职业
                    introduction: "", //介绍
                    phone: "", //电话
                    age: "",
                    cityCode: "" //城市
                },
                addressSlots: [
                    {
                        flex: 1,
                        values: "",
                        className: "slot1",
                        textAlign: "center"
                    },
                    {
                        divider: true,
                        content: "",
                        className: "slot2"
                    },
                    {
                        flex: 1,
                        values: "",
                        className: "slot3",
                        textAlign: "center"
                    },
                    {
                        divider: true,
                        content: "",
                        className: "slot4"
                    },
                    {
                        flex: 1,
                        values: "qu",
                        className: "slot5",
                        textAlign: "center"
                    }
                ],
                sexList: [
                    {
                        flex: 1,
                        values: ["男", "女"],
                        className: "slot1",
                        textAlign: "right"
                    }
                ]
            };
        },
        methods: {
            openPickerAddress: function() {
                // var self = this,
                //     province,
                //     city,
                //     county;
                // if (self.form.address) {
                //     province = sheng.filter(function(item, index) {
                //         return item.name == self.form.province;
                //     })[0];
                //     city = shi.filter(function(item, index) {
                //         return item.name == self.form.city;
                //     })[0];
                //     county = qu.filter(function(item, index) {
                //         return item.name == self.form.county;
                //     })[0];
                //     if (!province) {
                //         province = sheng[0];
                //         city = shi[0];
                //         county = qu[0];
                //     }
                // } else {
                //     var province = sheng[0];
                //     var city = shi[0];
                //     var country = qu[0];
                // }
                // this.$refs.address.setSlotValue(0, province);
                // this.$refs.address.setSlotValue(1, city);
                // this.$refs.address.setSlotValue(2, county);
            },

            onValuesChange: function(picker, values) {
                // var proId = "",
                //     cityId = "",
                //     cityOption = "",
                //     countryOption = "";
                // if (typeof values[0] != "undefined") {
                //     proId = values[0].proId;
                //     cityOption = shi.filter(function(item, index) {
                //         return item.proId == proId;
                //     });
                //     picker.setSlotValues(1, cityOption);
                //     this.form.province = values[0].name;
                // }
                // if (typeof values[1] != "undefined") {
                //     cityId = values[1].cityId;
                //     countryOption = qu.filter(function(item, index) {
                //         return item.cityId == cityId;
                //     });
                //     picker.setSlotValues(2, countryOption);
                //     this.form.city = values[1].name;
                // }
                // if (typeof values[2] != "undefined") {
                //     this.form.county = values[2].name;
                // } else {
                //     this.form.county = "";
                // }
            },
            onSexChange(picker, values) {
                this.form.sex = values[0];
            },
            sub() {
                if (this.from.headImg == "") {
                }
                if (this.form.nickName == "") {
                }
                var re = /^1[3456789]\d{9}$/;

                if (res.test(this.form.phone)) {
                }
                if (this.form.introduction == "") {
                }

                if (this.form.gender == "") {
                }
                var reAge = /^[1-9]\d*$/;
                if (!reAge.test(this.form.age)) {
                }
                if (this.form.occupation == "") {
                }
                this.$http(INTERFACE.USER.EDIT_USER, this.form).then(res => {
                    if (res.data.resultCode == "1000") {
                        Toast({
                            message: "",
                            iconClass: "icon icon-success"
                        });
                        this.$router.push({
                            path: "/user"
                        });
                    } else {
                        Toast({
                            message: res.data.resultMessage,
                            iconClass: "icon icon-error"
                        });
                    }
                });
            }
        },
        created() {
            this.$http.post(INTERFACE.USER.SELF_INFO).then(res => {
                if (res.data.resultCode == "1000") {
                    this.form = res.data.resultData;
                }
            });
        }
    };
</script>

<style lang="less" scoped>
.address_picker,
.date_picker {
    width: 100%;
    padding-bottom: 0.8rem;
    .picker {
    }
    .slot2,
    .slot4 {
        width: 5%;
    }
    .slot1,
    .slot3,
    .slot5 {
        width: 30%;
    }
    .picker-item {
        font-size: 0.26rem;
    }
    .picker-toolbar {
        position: absolute;
        bottom: 0;
        width: 100%;
        .mint-datetime-cancel {
            display: none;
        }
    }
    .confirm,
    .mint-datetime-confirm {
        position: absolute;
        width: 100%;
        bottom: 0;
        height: 0.8rem;
        line-height: 0.8rem;
        background: #fff;
        text-align: center;
        color: #000;
        font-size: 0.26rem;
    }
}
</style>
