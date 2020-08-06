<template>
    <div class="user-container">
          <el-amap
          vid="amap"
          :plugin="plugin"
          class="amap-demo"
          :center="center"
          :zoom="zoom"
          :events="events"
          ref="map"
        ></el-amap>
        <div class="toolbar">
          <span>{{loaded}}</span>
        </div>
    </div>
</template>
<script>
export default {
  components: {},
  data() {
    let that = this;
    return {
      center: [121.59996, 31.197646],
      adress: "",
      loaded: "定位中,请稍候!",
      zoom: 1,
      events: {
        //地图点击事件
        click: e => {
          let { lng, lat } = e.lnglat;
          that.lng = lng;
          that.lat = lat;
          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
          });
          geocoder.getAddress([lng, lat], function(status, result) {
            if (status === "complete" && result.info === "OK") {
              if (result && result.regeocode) {
                that.loaded = result.regeocode.formattedAddress;
                that.center = [that.lng, that.lat];
                that.$nextTick();
              }
            }
          });
        },
        //地图平移事件
        moveend: e => {
          let [lng, lat] = that.$refs.map.$$getCenter();
          that.lng = lng;
          that.lat = lat;
          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
          });
          geocoder.getAddress([lng, lat], function(status, result) {
            if (status === "complete" && result.info === "OK") {
              if (result && result.regeocode) {
                that.loaded = result.regeocode.formattedAddress;
                // that.center = [that.lng, that.lat];
                // that.position = result.regeocode.formattedAddress;
                that.$nextTick();
              }
            }
          });
        }
      },
      plugin: [
        {
          pName: "Geolocation",
          events: {
            init(o) {
              // o 是高德地图定位插件实例
                 o.getCurrentPosition((status, result) => {
                   if (result && result.position) {
                       alert( result.formattedAddress)
                     that.zoom = 18; // 如果key是企业的，还可以直接result.addressComponent获取省市，周边等信息
                     that.adress = result.formattedAddress;
                    that.loaded = '当前定位为:'+ that.adress;
                    that.center = [result.position.lng, result.position.lat];
                     that.componentMarker.position = [
                       result.position.lng,
                       result.position.lat
                     ];
                     that.$nextTick();
                  }else{
                      that.loaded = '获取定位失败,请重试!';
                  }
                 });
            }
          }
        },
        {
            pName: 'Scale',
            events: {
              init(instance) {
              }
            }
        }
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {
  },
  mounted() {
  }
};
</script>
<style>

    .user-container{
        width: 100%;
        height: 100vh;
    }
    .amap-demo{
        height:  80vh !important;
    }
    .amap-geolocation-con{
        /* right: 10px !important; */
        left: 330px !important;
    }
</style>
