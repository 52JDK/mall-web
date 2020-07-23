<template>
    <div class="cart-container">
          <ul class="cart-list">
              <van-checkbox-group v-model="result" ref="checkboxGroup" @change="changeGroup">
              <li class="item" v-for="(item,index) in list" :key="index">
                 <van-swipe-cell>
                       <van-card
                        :price="item.price"
                        :desc="item.desc"
                        :title="item.title"
                        :thumb="item.thumb"
                        :origin-price="item.originPrice"
                        >
                            <div slot="num">
                                <van-stepper :value="item.num"  disable-input  @plus="plusAdd(index)" @minus="minus(index)"  async-change />
                            </div>
                            <div slot="tags">
                                <van-checkbox :name="index"></van-checkbox>
                            </div>
                       </van-card>
                       <div slot="right">
                                <van-button square text="收藏" type="warning" class="warning-button" />
                                <van-button square text="删除" type="danger" class="delete-button" />
                            </div>
                  </van-swipe-cell>
              </li>
              </van-checkbox-group>
          </ul>
          <van-submit-bar :price="3050" button-text="提交订单" :loading="loading" @submit="onSubmit">
                <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
          </van-submit-bar>
    </div>
</template>
<script>
export default {
    data() {
        return {
            checked:false,
             loading:false,
             result:[],
             stepper:1,
            list:[
                {
                    num:'2',
                    price:'2.00',
                    desc:"红色大号",
                    title:'耐克耐克耐克啊',
                    thumb:'https://img.yzcdn.cn/vant/ipad.jpeg',
                    originPrice:"10.00"
                },
                 {
                    num:'2',
                    price:'2.00',
                    desc:"红色大号",
                    title:'耐克耐克耐克啊',
                    thumb:'https://img.yzcdn.cn/vant/ipad.jpeg',
                    originPrice:"10.00"
                },
                 {
                    num:'2',
                    price:'2.00',
                    desc:"红色大号",
                    title:'耐克耐克耐克啊',
                    thumb:'https://img.yzcdn.cn/vant/ipad.jpeg',
                    originPrice:"10.00"
                },
                 {
                    num:'2',
                    price:'2.00',
                    desc:"红色大号",
                    title:'耐克耐克耐克啊',
                    thumb:'https://img.yzcdn.cn/vant/ipad.jpeg',
                    originPrice:"10.00"
                },
                 {
                    num:'2',
                    price:'2.00',
                    desc:"红色大号",
                    title:'耐克耐克耐克啊',
                    thumb:'https://img.yzcdn.cn/vant/ipad.jpeg',
                    originPrice:"10.00"
                }
            ]
        }
    },
    methods:{
        onSubmit(){
            this.loading = true;
        },
        checkAll() {
          this.checked = true;    
          this.$refs.checkboxGroup.toggleAll(true);
        },
        changeGroup(e){
           let { list } = this;
           if(list.length==e.length){
                this.checked = true;    
           }else{
               this.checked = false;  
           }
           console.log(this.result,"result")
        },
        plusAdd(e){
            console.log(e,"zengjia ")
            
        },
        minus(e){
            console.log(e,"jianshao ")
        }
    }
}
</script>
<style lang="less">
.cart-container{
    background-color: #f5f5f5;
    padding-bottom: 50px;
}
.cart-list{
    margin: 0 12px;
  
    border-radius:10px;
    .item{
        margin: 10px 0;
        background-color: #fff;
        height: 105px;
    }
}
.van-card{
    .van-checkbox{
        position: absolute;
        left: -105px;
        top: 50%;
        transform: translateY(-50%);
    }
}
.van-loading__spinner{
    width: 20px !important;
    height: 20px !important;
}
  .goods-card {
    margin: 0;
    background-color: #fff;
  }
.van-swipe-cell__right{
    height: 105px;
}
.van-swipe-cell__right>div{
    height: 100%;
}
  .delete-button,.warning-button {
    height: 100%;
  }
  .van-submit-bar{
      bottom:58px !important;
  }
  .van-card__tag{
      width: 18px;
      height: 18px;
      border-radius: 50%;
      overflow: hidden;
  }
</style>