<template>
    <div>
        <van-address-list
                v-model="chosenAddressId"
                :list="list"
                default-tag-text="默认"
                @add="onAdd"
                @edit="onEdit"
                @select="clickItem"
        />
    </div>
</template>

<script>
    import Vue from 'vue';
    import {AddressList} from 'vant';

    Vue.use(AddressList);

    import {Toast} from 'vant';
    import {findAddress} from "../../api/address";


    export default {
        data() {
            return {
                chosenAddressId: 0,
                list: [],
                // list: [
                //     {
                //         id: '1',
                //         name: '张三',
                //         tel: '13000000000',
                //         address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                //         isDefault: "true",
                //     },
                //     {
                //         id: '2',
                //         name: '李四',
                //         tel: '1310000000',
                //         address: '浙江省杭州市拱墅区莫干山路 50 号',y
                //         isDefault: "",
                //     },
                // ],
            };
        },
        created() {
            this.find();
            this.getParams();
        },
        methods: {
            onAdd() {
                this.$router.push({
                    path: '/order/editAddress'
                }),
                    Toast('新增地址');
            },
            onEdit(item, index) {
                this.$router.push({
                    path: '/order/editAddress',
                    query: {
                        name: item.name,
                        phone: item.tel,
                        address: item.address,
                        id: item.id,
                        areaCode: item.areaCode
                    }
                });
                Toast('编辑地址:' + index);
            },
            find() {
                findAddress().then(res => {
                    console.log(res.data)
                    if (res.code == "0000") {
                        this.list = res.data;
                    }
                });
            },
            clickItem(item, index) {
                this.$router.push({
                    path: '/order/createOrder',
                    query: {
                        name: item.name,
                        phone: item.tel,
                        address: item.address,
                        id: item.id,
                    }
                })
            },
            getParams() {
                // 取到路由带过来的参数
                let routerParams = this.$route.query;
                this.chosenAddressId = routerParams.id;
            }
        },
        watch: {
            '$route': 'getParams'
        }
    };
</script>
