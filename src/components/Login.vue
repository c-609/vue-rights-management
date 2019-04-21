<template>
    <el-form label-width="60px" class="login-container">
        <h3 class="login_title">系统登录</h3>
        <el-form-item label="账号" class="account-input" >
            <el-input type="text"  v-model="loginForm.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" class="password-input">
            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleLogin" class="login-button">登录</el-button>
        </el-form-item>
    </el-form>
    
</template>

<script>
export default {
    data(){
        return {
            loginForm: {
                username: 'admin1',
                password: '123'
            },
        }
    },
    methods: {
        handleLogin: function(){
           var _this = this;
            this.postRequest('login', {
                username: this.loginForm.username,
                password: this.loginForm.password
            }).then(res=>{
                if(res && res.status == 200){
                    var data = res.data;
                    var path = this.$route.query.redirect;
                    _this.$router.replace({
                        path: path == '/' || path == undefined ? '/home' : path
                    });
                }
            });
        }
    }
    
}
</script>

<style>
    .login-container {
        height: 280px;
        width: 400px;
        background: rgba(228, 219, 219, 0.533);
        padding: 45px 50px 15px 35px;
        margin: 180px auto;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        align-items:center;
    }

    .login_title {
        margin: 0px auto 30px auto;
        border-top: 30px
    }

    .account-input,
    .password-input  {
        width: 300px
    }

    .login-button {
        width: 100px;
        
    }
</style>
