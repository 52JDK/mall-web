<template>
    <div>
        <div class="m-logo"></div>
        <div class="m-item">
            <router-link to="/login/psd">
                <van-button size="large" class="login-btn">
                    手机号登录
                </van-button>
                <van-button size="large" class="login-btn">
                    密码登录
                </van-button>
            </router-link>
            <router-link to="/login/register">
                <van-button size="large" type="primary" class="login-btn">
                    手机号一键注册
                </van-button>
            </router-link>
        </div>
        <div class="m-thirdpart">
            <p class="tit"><span class="txt">或用以下方式登录</span></p>
            <div class="lnk">
                <van-icon name="wechat" color="#1AAD16"/>
                <van-icon name="alipay" color="#7dcbeb"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="less">
    .m-thirdpart {
        padding: 40px 20px 50px;
        font-size: 12px;

        .tit {
            position: relative;
            width: 215px;
            margin: 0 auto;
            border-bottom: 1px solid #eee;
        }

        .txt {
            position: absolute;
            left: 50%;
            top: -12px;
            margin: 0 0 0 -57px;
            width: 114px;
            background: #fff;
            text-align: center;
            color: #999;
            font-size: 12px;
            line-height: 26px;
        }

        .lnk {
            position: relative;
            padding: 27px 0 0;
            width: 280px;
            margin: 0 auto;
            text-align: center;

            .van-icon {
                font-size: 31px;
                margin: 0 29px;
            }
        }
    }
    .m-logo{
        background: url(//haitao.nos.netease.com/f866dd18-12f0-4bb2-be6d-5cac85cf2627.png) center 73px / 161px no-repeat;
        text-align: center;
        padding: 130px 0px 0px;
        margin: 15px 0px;
    }
    .m-item{
        margin:0 10px;
        font-size: 14px;
    }
    .login-btn{
        font-size: 14px;
        height: 42px;
        line-height: 42px;
        margin-bottom: 15px;
    }
</style>
