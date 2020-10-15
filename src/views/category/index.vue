<template>
  <div>
    <div class="sidebar">
      <van-sidebar v-model="activeKey">
        <div v-for="(item,index) in speciesList" :key="index">
          <van-sidebar-item :title="item.name" @click="click(item.id)"/>
        </div>
      </van-sidebar>
    </div>
    <div class="grid">
      <van-grid :border="false" :column-num="3">

        <div class="grid-text" v-for="(item,index) in speciesOptions" :key="index">

          <van-grid-item :to="{name:'categoryList',params:{optionId:item.id,title:item.name}}">
            <van-image :src="item.cateImg" width="50px" height="50px"/>
          </van-grid-item>
          <div class="grid-text-a">
            <a>{{ item.name }}</a>
          </div>

        </div>
      </van-grid>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import {Sidebar, SidebarItem} from 'vant';
import {Notify} from 'vant';
import {Grid, GridItem} from 'vant';

Vue.use(Grid);
Vue.use(GridItem);
import {categoryList} from "@/api/category";

Vue.use(Sidebar);
Vue.use(SidebarItem);
export default {


  data() {

    return {
      activeKey: 0,
      id:1,
      speciesList: [],
      speciesOptions: [],
    };
  },
  created() {
    this.categoryList();
  },
  methods: {
    onChange(index) {
      Notify({type: 'primary', message: index});
      console.log(index)
    },
    click(index) {
      console.log("1111" + index);
      this.id=index;
      this.categoryList();
    },
    categoryList() {
      console.log("id:"+this.id)
      categoryList(this.id).then(res => {
        this.speciesList = res.data.speciesList;
        this.speciesOptions = res.data.speciesOptions;
        console.log(res.data)
      })
    },
  },
};
</script>
<style>
.sidebar {
  width: 80px;
  float: left;
}

.grid {
  margin-left: 90px;
  height: 100%;
}

.van-grid-item {
  height: 76px;

}

.grid-text {
  margin: 5px;
}

.grid-text-a {
  color: #999999;
  text-align: center;
  width: 70px;
}

</style>