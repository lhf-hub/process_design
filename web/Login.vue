<template>
  <body id="poster">
  <el-form class="login-container" label-position="left" label-width="0px">
    <h3 class="login_title">
      系统登陆
      <el-button @click="toRegister()">点我注册</el-button>
    </h3>
    <el-form-item label="">
      <el-input type="text" v-model="longinForm.loginName" autocomplete="off" placeholder="账号"></el-input>
    </el-form-item>
      <el-form-item style="width: 100%">
        <el-input type="password" v-model="longinForm.password" autocomplete="off" placeholder="密码"></el-input>
      </el-form-item>
    <el-form-item>
      <el-button type="primary" style="width:100%;background: #505458;border: none" @click="Login()">登录</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      longinForm: {
        loginName:'',
        password: '',
      }
    }
  },
  methods: {
    Login() {
      // console.log( 'submit!', this.loginForm);
      // this.axios.post( 'http://localhost:3312/sys-user/login',this.LoginForm).then((res)=> {
      //   let data = res.data;
      //   if (data.success) {
          this.LoginForm = {};
          this.$message({
            message: '成功登录,欢迎光临后台管理系统!!!',
            type: 'success'
          });
          this.$router.push({path: '/Home'})
      //   }
      // })
    },

    toRegister(){
      this.$router.push({path:'/Register'})
    }
  }
}
</script>
<style>
  #poster{
    background-image: url('../assets/9.jpg');
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0;
    padding: 0;
  }
  .login-container{
    border-radius: 15px;
    background-clip: padding-box ;
    margin: 90px auto;
    width : 350px;
    padding: 35px 35px 15px 35px ;
    background:#fff;
    border:1px solid #eaeaee ;
    box-shadow:0 0 25px #cac6c6;
  }
  .login_title{
    margin : 0 auto 40px auto;
    text-align:center ;
    color : #505458;
  }


</style>