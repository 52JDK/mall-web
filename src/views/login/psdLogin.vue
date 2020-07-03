<template>
  <div>
    <div class="login-logo">
      <div class="padding-box">
        <van-cell-group>
          <van-field placeholder="请输入手机号" v-model="phone" />
          <van-field
            placeholder="请输入邮箱   (用于接收验证码)"
            v-model="email"
          />
          <van-field
            center
            clearable
            placeholder="请输入短信验证码"
            v-model="code"
          >
            <van-button
              slot="button"
              size="small"
              type="primary"
              @click="sendVerifycode()"
              :disabled="!disabledCodeBtn"
              >{{ codeText }}
            </van-button>
          </van-field>
        </van-cell-group>
        <div class="van-button-box">
          <van-button
            size="large"
            type="primary"
            class="login-btn"
            @click="goLogin()"
            :loading="loading"
          >
            登录
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import {isEmail} from 'vant/es/utils/validate/email'
    import {isMobile} from 'vant/es/utils/validate/mobile'
    import { login } from "../../api/user.js"
    function verifyPhone(phone, email, toast) {
        let result = false;
        if (phone == '') {
            toast('手机号不能为空')
        } else if (!isMobile(phone)) {
            window.console.log(phone);
            toast('请输入有效的手机号码')
        } else if (!isEmail(email)) {
            toast('请输入有效的邮箱')
        } else {
            result = true;
        }
        return result;
    }
export default {
    data() {
        return {
                content: '发送验证码',
                totalTime: 10,
                canClick: true, //添加canClick
                disabledCodeBtn: true,
                password: '',
                phone: "",
                codeText: '获取验证码',
                code: '',
                email: '',
                loading:false
            }
    },
    methods: {
        //去登录
        goLogin(){
            this.loading = true
            let { phone,email,code } = this;
            let params = {
                phone,
                email,
                code
            }
            let toast = this.$toast;
            if (!verifyPhone(phone, email, toast)) {
                console.log('简单的表单校验')
                this.loading = false
                return;
            }
            this.$store.dispatch('user/login', params)
            .then(()=>{
                toast.success('登录成功');
                this.$router.push('/')
                this.loading = false
            }).catch(() => {
              this.loading = false
            })
    },
}
}
</script>
<style>
.login-logo {
  background: url(https://haitao.nos.netease.com/f866dd18-12f0-4bb2-be6d-5cac85cf2627.png)
    center 18px no-repeat;
  background-size: 161px;
}
.padding-box {
  padding-top: 70px;
}
.van-button-box {
  margin: 10px;
}
.login-btn {
  width: 100%;
  height: 45px;
  line-height: 45px;
}
</style>
