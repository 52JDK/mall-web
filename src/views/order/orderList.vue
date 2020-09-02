<template>
    <div>
        <div>
<!--            <v-touch v-on:swipeleft="swiperleft"  v-on:swiperight="swiperright" class="wrapper">-->

            <van-tabs v-model="active" :before-change="beforeChange(active)">


                <van-tab title="待付款">
                    <orderSimpleList class="orderSimpleList"/>

                </van-tab>


                <van-tab title="待发货">

                </van-tab>
                <van-tab title="待收货">

                </van-tab>
                <van-tab title="待评价">

                </van-tab>
            </van-tabs>
<!--            </v-touch>-->

        </div>
    </div>
</template>
<script>

    import {Tab, Tabs} from 'vant';
    import Vue from 'vue';
    import {Cell, CellGroup} from 'vant';
    import {Divider} from 'vant';
    import orderSimpleList from './orderSimpleList'
    var VueTouch = require('vue-touch')
    Vue.use(VueTouch, {name: 'v-touch'})

    Vue.use(Divider);
    Vue.use(Cell);
    Vue.use(CellGroup);
    Vue.use(Tab);
    Vue.use(Tabs);
    export default {
        components: {
            orderSimpleList
        },
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                refreshing: false,
                pageSize: 4,
                error: false,
                pageNumber: 1,
                active: 0,


            };
        },
        created() {
            this.getListParams();
        },
        methods: {
            getListParams() {
                this.active = this.$route.params.active

            },
            beforeChange(index) {
            },
        }
    }
</script>
<style>
    .orderSimpleList {
        height: 185px;
        min-height: 185px
    }

</style>
