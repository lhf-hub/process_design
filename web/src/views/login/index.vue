<template>
  <body id="poster">
  <el-form class="login-container" label-position="left" label-width="0px">
    <h3 class="login_title">系统登录 <el-button @click="toRegister()">点我注册</el-button></h3>
    <el-form-item label="">
      <div style="display: flex; align-items: center;">
        <el-input type="text" v-model="selectedIdentity" autocomplete="off" placeholder="请选择你的身份" readonly></el-input>
        <el-dropdown @command="handleCommand" style="margin-left: 10px;">
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="Boss">老板</el-dropdown-item>
            <el-dropdown-item command="Supervisor">主管</el-dropdown-item>
            <el-dropdown-item command="Front">前台</el-dropdown-item>
            <el-dropdown-item command="Employee">员工</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-form-item>
    <el-form-item label="">
      <el-input type="text" v-model="id" autocomplete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-input type="password" v-model="password" autocomplete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="width:100%;background: #505458;border: none" @click="Login()">登录</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
import requests from '@/utils/request'
export default {
  name: 'loginVue',
  data () {
    return {
      id: '',
      password: '',
      role: ''
    }
  },
  methods: {
    async Login () {
      await requests.post('', this.id, this.password, this.role).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: '成功登录,欢迎光临后台管理系统!!!',
            type: 'success'
          })
          res.data.user.role = this.role
          this.$store.dispatch('user/getList', res.data.user)
        }
      })
      this.$router.push({ path: '/' })
    },
    toRegister () {
      this.$router.push({ path: '/Register' })
    },
    handleCommand (identity) {
      this.role = identity
    }
  }
}
</script>
<style>
  #poster{
    background-image: url('@/assets/9.jpg');
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
