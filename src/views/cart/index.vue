<template>
    <div class="cart-container">
        <ul class="cart-list">
            <van-checkbox-group v-model="result" ref="checkboxGroup" @change="changeGroup">
                <li class="item" v-for="(item,index) in list" :key="index">
                    <van-swipe-cell class="van-swipe-cell">
                        <van-card
                                :price="item.price.toFixed(2)"
                                :title="item.productName"
                                :thumb="item.image"
                                :origin-price="item.originPrice"
                                :sku="item.sku"
                                :desc="item.title"
                        >

                            <div slot="num">
                                <van-stepper :value="item.quantity" disable-input
                                             @plus="plusAdd(item.sku,item.quantity,index,item.price)"
                                             @minus="minus(item.sku,item.quantity,index,item.price)" max="99"
                                             min="1" async-change/>
                            </div>
                            <div slot="tags">
                                <van-checkbox :name="item.sku" ref="checkboxes" @click="change(item)"/>
                            </div>
                        </van-card>
                        <div slot="right">
                            <van-button square text="收藏" type="warning" class="warning-button"/>
                            <van-button square text="删除" type="danger" class="delete-button"
                                        @click="onClose(item.sku)"/>
                        </div>
                    </van-swipe-cell>
                </li>
            </van-checkbox-group>
        </ul>
        <div>
            <van-submit-bar :price="total" :button-text="btn_text"  :loading="loading" @submit="onSubmit " to="/order/createOrder">
                <van-checkbox v-model="check" @click="checkAll">全选</van-checkbox>
            </van-submit-bar>

        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {Toast} from 'vant';
    import {Tag} from 'vant';

    Vue.use(Tag);
    Vue.use(Toast);
    import {addCart, addCartNum, deleteCart, findCart, selectAll, selectCart} from "../../api/cart";

    export default {
        inject: ['reload'],
        data() {
            return {
                check: false,
                loading: false,
                result: [],
                btn_text: "提交订单",
                stepper: 1,
                cartEntries: [],
                total: 0,
                list: []
            }
        },
        components: {},
        created() {
            findCart().then(res => {
                let array = [];
                this.list = res.data.cartEntries;
                for (let i in this.list) {
                    if (this.list[i].checked) {
                        array.push(this.list[i].sku);
                    }
                }
                this.result = array;
                this.total = res.data.total * 100;
                this.check = res.data.selectAll;
                if (res.data.totalNum != 0) {
                    this.btn_text = "提交订单" + "(" + res.data.totalNum + ")";
                } else {
                    this.btn_text = "提交订单";
                }

            });
        },
        methods: {
            onSubmit() {
                this.loading = true;
                this.$router.push({path:'/order/createOrder'})
            },
            change(item) {
                let check = false;
                if (item.checked == true) {
                    check = false;
                } else {
                    check = true;
                }
                selectCart(item.sku, check).then(res => {
                    let array = [];
                    this.total = res.data.total * 100;
                    this.list = res.data.cartEntries;
                    for (let i in this.list) {
                        if (this.list[i].checked) {
                            array.push(this.list[i].sku);
                        }
                    }
                    this.check = res.data.selectAll;
                    if (res.data.totalNum != 0) {
                        this.btn_text = "提交订单" + "(" + res.data.totalNum + ")";
                    } else {
                        this.btn_text = "提交订单";
                    }
                });

            },
            checkAll() {
                let select = !this.checked;
                selectAll(select).then(res => {
                    this.total = res.data.total * 100;
                    if (res.data.totalNum != 0) {
                        this.btn_text = "提交订单" + "(" + res.data.totalNum + ")";
                    } else {
                        this.btn_text = "提交订单";
                    }
                    this.$refs.checkboxGroup.toggleAll();
                });

            },
            onClose(sku) {
                deleteCart(sku).then(res => {
                    let that = this;
                    let price_init = 0;
                    let num_init = 0;
                    for (const i in that.list) {
                        that.list.splice(i, 1)
                        for (let i in that.list) {
                            price_init += parseFloat(that.list[i].price)
                            num_init = that.list.length
                        }
                    }
                    this.check = res.data.selectAll;
                    this.total = res.data.total * 100;
                    if (res.data.totalNum != 0 && res.data.totalNum != null) {
                        this.btn_text = "提交订单" + "(" + res.data.totalNum + ")";
                    } else {
                        this.btn_text = "提交订单";
                    }
                });
            },
            changeGroup(e) {
                let {list} = this;
                if (list.length == e.length) {
                    this.checked = true;
                } else {
                    this.checked = false;
                }
            },
            plusAdd(sku, quantity, index, price) {
                addCartNum(sku, 1).then(res => {
                    if (res.code = "0000") {
                        quantity = quantity + 1;
                        this.list[index].quantity = quantity;
                        this.check = res.data.selectAll;
                        this.total = res.data.total * 100;
                        if (res.data.totalNum != 0) {
                            this.btn_text = "提交订单" + "(" + res.data.totalNum + ")";
                        } else {
                            this.btn_text = "提交订单";
                        }
                    } else {
                        Toast.fail('添加失败');
                    }

                });
            },
            minus(sku, quantity, index, price) {
                if(this.quantity==1){
                    Toast.fail('添加失败');
                }
                addCartNum(sku, -1).then(res => {
                    if (res.code = "0000") {
                        quantity = quantity - 1;
                        if (quantity == 0) {
                            let that = this;
                            let price_init = 0;
                            let num_init = 0;
                            for (const i in that.list) {
                                that.list.splice(i, 1)
                                for (let i in that.list) {
                                    price_init += parseFloat(that.list[i].price)
                                    num_init = that.list.length
                                }
                            }
                            this.check = res.data.selectAll;
                            this.btn_text = "提交订单";
                            this.total = res.data.total * 100;
                        } else {
                            this.list[index].quantity = quantity;
                            this.check = res.data.selectAll;
                            this.total = res.data.total * 100;
                            this.btn_text = "提交订单" + "(" + res.data.totalNum + ")";

                        }
                    } else {
                        Toast.fail('减少失败');
                    }
                });
            }
        }
    }
</script>
<style lang="less">
    .cart-container {
        background-color: #f5f5f5;
        padding-bottom: 50px;
    }

    .cart-list {
        margin: 0 12px;

        border-radius: 10px;

        .item {
            margin: 10px 0;
            background-color: #fff;
            height: 105px;
        }
    }

    .van-card {
        .van-checkbox {
            position: absolute;
            left: -115px;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    .van-loading__spinner {
        width: 20px !important;
        height: 20px !important;
    }

    .goods-card {
        margin: 0;
        background-color: #fff;
    }

    .van-swipe-cell__right {
        height: 105px;
    }

    .van-swipe-cell__right > div {
        height: 100%;
    }

    .delete-button, .warning-button {
        height: 100%;
    }

    /*.van-submit-bar {*/
    /*    margin-bottom: 48px !important;*/
    /*}*/

    .van-card__tag {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        overflow: hidden;
    }

    .van-card {
        padding-left: 30px;
    }

    .van-card__thumb {
        width: 80px !important;
        height: 80px !important;
    }

    .van-card__price {
        color: #E55050;
        font-weight: bold;
    }
    /*.coupon-text{*/
    /*    font-size: 6px;*/
    /*    width: 60px;*/
    /*    margin-bottom: -1px;*/
    /*    margin-right: 50px;*/
    /*}*/

</style>
