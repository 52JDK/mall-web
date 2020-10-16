<template>
  <div>
    <div class="login-class">
      <van-form @submit="onSubmit">
        <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;" class="login-button">
          <van-button round block type="info" native-type="submit">
            立即登录
          </van-button>

        </div>
        <div class="login-text">
          <span>还没有账号？点击 </span><a style="color: #5590d6" href="">立即注册</a>
        </div>
      </van-form>
    </div>
    <div class="login-other">
      <div class="tableTitle"><span class="midText">第三方快速登录</span></div>
      <div class="login-logo">
        <img src="../../assets/images/wx.jpg" height="41" width="51" style="margin-left: 10%"/>
        <img src="../../assets/images/qq.jpg" height="41" width="41" style="margin-left: 20%"/>
        <img src="../../assets/images/weibo.jpg" height="41" width="51" style="margin-left: 20%"/>
      </div>

    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import {Form} from 'vant';
import {pwdLogin} from "@/api/user";
import { Toast } from 'vant';
import { mapMutations } from 'vuex';
Vue.use(Toast);
Vue.use(Form);
export default {
  data() {
    return {
      username: '123456',
      password: '123456',
    }
  },
  methods: {
    ...mapMutations(['changeLogin']),
    onSubmit(values) {

      let rasPw = this.$getRsaCode(this.password); // ras 加密 密码
      let data = {
        uid: this.username,
        passWord: rasPw,
      }
      pwdLogin(data).then(res => {
        if (res.code == "0000") {
          this.userToken = 'Bearer ' + res.data;
          // 将用户token保存到vuex中
          this.changeLogin({ Authorization: this.userToken });
          this.$router.push('/home');
        } else {
          Toast.fail(res.message);
        }
      })
    },
  },
}
</script>
<style>
.login-class {
  margin-top: 20px;
  width: 94%;
  margin-left: 3%;
}

.login-button {
  padding-top: 20px;
}

.login-text {
  font-size: 16px;
  text-align: center;
}

.tableTitle {
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 1px;
  background-color: #d4d4d4;
  text-align: center;
  font-size: 16px;
  color: rgba(101, 101, 101, 1);
}

.midText {
  position: absolute;
  left: 50%;
  background-color: #f5f5f5;
  padding: 0 15px;
  transform: translateX(-50%) translateY(-50%);
}

.login-other {
  margin-top: 50%;
}

.login-logo {
  margin-top: 80px;
}
</style>