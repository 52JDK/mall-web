<template>
  <div>
    <van-swipe
      :autoplay="3000"
      :style="'height:' + height + 'px'"
    >
      <van-swipe-item
        v-for="(image, index) in whellList"
        :key="index"
      >
        <a :href="image.url" v-if="image.type == '1'">
          <img  style="width: 100%;" :src="image.url" />
        </a>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
     import { swiperList } from '../../api'
export default {
  data() {
    return {
        whellList: [],
        height: 0
    };
  },
  props: {
    data: Object,
  },
  methods: {
      getSwiperList(){
          const type = 1;
          swiperList(type).then(res=>{
            this.whellList = res.data;
                let that = this;
                let image = res.data[0];
                window.console.log(image);
                let img = new Image();
                img.src = image.url;
                let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                img.onload = function () {
                    that.height = Math.ceil(img.height / img.width * width);
                }
          })
      }
  },
  created(){
    this.getSwiperList();
  }
};
</script>
<style></style>
