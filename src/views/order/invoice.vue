<template>
    <div>
        <div class="invoice">
            <van-tabs>
                <van-tab title="个人" name="a">
                    <van-form >
                        <van-field
                                name="发票类型"
                                label="发票类型"
                                placeholder="普通电子发票"
                                disabled
                        />
                        <van-field
                                v-model="username"
                                name="发票抬头"
                                label="发票抬头"
                                placeholder="发票抬头"
                                :rules="[{ required: true, message: '请填写发票抬头' }]"
                        />
                        <van-field
                                v-model="password"
                                type="password"
                                name="密码"
                                label="密码"
                                placeholder="密码"
                                :rules="[{ required: true, message: '请填写密码' }]"
                        />
                        <van-field
                                v-model="password"
                                type="password"
                                name="发票金额"
                                label="发票金额"
                                placeholder="发票金额"
                                :rules="[{ required: true, message: '请填写密码' }]"
                        />
                        <van-field
                                v-model="password"
                                type="password"
                                name="发票金额"
                                label="发票金额"
                                placeholder="发票金额"
                                :rules="[{ required: true, message: '请填写密码' }]"
                        />
                        <van-field
                                v-model="password"
                                type="password"
                                name="收票人邮箱"
                                label="收票人邮箱"
                                placeholder="收票人邮箱"
                                :rules="[{ required: true, message: '请填写密码' }]"
                        />

                        <div style="margin-top: 80px;">
                            <van-button round block type="info" native-type="submit">
                                提交
                            </van-button>
                        </div>
                    </van-form>
                </van-tab>
                <van-tab title="公司" name="b">

                </van-tab>
            </van-tabs>
        </div>

    </div>

</template>

<script>
    import Vue from 'vue';
    import {Popup} from 'vant';

    Vue.use(Popup);
    export default {
        name: "invoice",
        data() {
            return {
                show: false,
                username: '',
                password: '',
            };
        },

        methods: {
            showPopup() {
                this.show = true;
            },
        },
    };
</script>
