<template>
  <body id="poster">
    <el-form class="login-container" label-position="left" label-width="0px">
      <h3 class="login_title">系统登录 </h3>
      <el-form-item label="">
        <div style="display: flex; align-items: center;">
          <el-input type="text" v-model="RoleDefine[role]" autocomplete="off" placeholder="请选择你的身份" readonly></el-input>
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
import axios from 'axios'
export default {
  name: 'loginVue',
  data() {
    return {
      id: '',
      password: '',
      role: '',
      RoleDefine: {
        Boss: '老板',
        Supervisor: '主管',
        Front: '前台',
        Employee: '员工'
      }
    }
  },
  methods: {
    async Login() {
      await requests.post('/user/login', { id: this.id, password: this.password, role: this.role }).then(async (res) => {
        if (res.code === 200) {
          if (res.data.success) {
            this.$message({
              message: '成功登录,欢迎光临后台管理系统!!!',
              type: 'success'
            })

            // console.log(res)
            // this.$router.push({ path: '/clientsInfo' })
            switch (this.role) {
              case 'Boss':
                this.$router.push({ path: '/monitor' })
                break
              case 'Supervisor':
                this.$router.push({ path: '/employeeInfo' })
                break
              case 'Front':
                this.$router.push({ path: '/clientsInfo' })
                break
              case 'Employee':
                this.$router.push({ path: '/employeeTask' })
                break
              default:
                break
            }
            // res.data.user.role = this.role
            // res.data.user.isLogin = true
            const user = {
              isLogin: true,
              account_id: res.data.user.account_id,
              account_passWord: res.data.user.account_passWord,
              supervisor_id: res.data.user.supervisor_id,
              role: this.role,
              employee_id: res.data.user.employee_id ?? null,
              employee_name: res.data.user.employee_name,
              department_id: res.data.user.department_id,
            }

            await this.$store.dispatch('user/updateList', user)
            localStorage.setItem('token', res.data.token)
            // let token = localStorage.getItem('token') // 获取token
            // this.$store.dispatch('updateList', res.data.user)
            if (this.role === 'Employee' || this.role === 'Supervisor') {
              await axios.get('http://localhost:7214/Monitor/bind?employee_id=' + this.$store.state.user.userList.employee_id,).then((res) => {
                console.log(res)
              }).catch((err) => {
                console.log(err)
              })
            }
          } else {
            this.$message({
              message: '登陆失败，请检查信息重新输入！',
              type: 'error'
            })
          }
        }
      })
      // switch (this.role) {
      //   case 'Boss':
      //     this.$router.push({ path: '/Boss' })
      //     break
      //   case 'Supervisor':
      //     this.$router.push({ path: '/Supervisor' })
      //     break
      //   case 'Front':
      //     this.$router.push({ path: '/Front' })
      //     break
      //   case 'Employee':
      //     this.$router.push({ path: '/Employee' })
      //     break
      //   default:
      //     break
      // }
    },
    toRegister() {
      this.$router.push({ path: '/Register' })
    },
    handleCommand(identity) {
      this.role = identity
    }
  }

}
</script>
<style>
#poster {
  background-image: url('@/assets/9.jpg');
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

body {
  margin: 0;
  padding: 0;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaee;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
