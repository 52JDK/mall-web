<template>
    <div>
        <van-address-edit
                :area-list="areaList"
                show-postal
                show-delete
                show-set-default
                show-search-result
                :search-result="searchResult"
                :area-columns-placeholder="['请选择', '请选择', '请选择']"
                :address-info="addressInfo"
                @save="onSave"
                @delete="onDelete"
                @change-detail="onChangeDetail"
        />

    </div>

</template>
<script>
    import Vue from 'vue';
    import {AddressEdit} from 'vant';
    import areaList from "../../utils/area";

    Vue.use(AddressEdit);
    import { Toast } from 'vant';

    Vue.use(Toast);
    import {addAddress, delAddress, findAddressById, updateAddress} from "../../api/address";

    export default {
        data() {
            return {
                areaList,
                searchResult: [],
                addressInfo: {}
            };
        },
        created() {
            this.getParams()
        },
        methods: {
            onSave(content) {
                let data = content;
                let id = data.id;
                let defaultOrNot=data.isDefault;
                if (typeof id != undefined) {
                    updateAddress(data,defaultOrNot).then(res => {
                        if(res.code=="0000"){
                            this.$router.push({path: '/order/addressList',
                            query:{
                                id: id,
                            }});
                            Toast.success("修改成功");
                        }else{
                            Toast.fail(res.message)
                        }
                    });
                } else {
                    addAddress(data).then(res => {
                        if(res.code=="0000"){
                            this.$router.push({path: '/order/addressList',
                                params:{
                                    id: id,
                                }})
                            Toast.success("添加成功")
                        }else{
                            Toast.fail(res.message)
                        }
                    });
                }
            },
            onDelete() {
                delAddress(this.addressInfo.id).then(res => {
                    this.$router.push({path: '/order/addressList'})
                })
                Toast('delete');
            }
            ,
            onChangeDetail(val) {
                if (val) {
                    this.searchResult = [
                        {
                            name: '黄龙万科中心',
                            address: '杭州市西湖区',
                        },
                    ];
                } else {
                    this.searchResult = [];
                }
            }
            ,
            getParams() {
                // 取到路由带过来的参数
                let routerParams = this.$route.query;
                this.addressInfo.id = routerParams.id;
                findAddressById(routerParams.id).then(res => {
                    if (res.code == "0000") {
                        this.addressInfo = res.data
                        if (res.data.deafult == 1) {
                            this.addressInfo.isDefault = true
                        }
                    }
                })
            }
        },
        watch: {
            '$route': 'getParams'
        }
    };
</script>
