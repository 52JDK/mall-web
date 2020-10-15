<template>
  <div>
    <div>
      <van-sticky>
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu>
      </van-sticky>
    </div>
    <div>
      <goodsList :option-id="optionId" :title="title"  type="goods"/>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { DropdownMenu, DropdownItem } from 'vant';
import goodsList from '@/components/goods/list'
import { Sticky } from 'vant';

Vue.use(Sticky);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
export default {
  components: {
    goodsList
  },

  created() {
    this.optionId=this.$route.params.optionId
    this.title=this.$route.params.title
  },
  data() {
    return {
      optionId:"",
      title:"",
      value1: 0,
      value2: 'a',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' },
      ],
    };
  }
}
</script>