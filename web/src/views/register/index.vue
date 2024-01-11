<template>
  <div id="poster">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="0px"
             label-position="left"
             class="register-container">
    <h3 class="register_title">
      系统注册
      <el-button @click="toLogin()">去登录</el-button>
    </h3>
      <el-form-item label="">
        <div style="display: flex; align-items: center;">
          <el-input type="text" v-model="selectedIdentity" autocomplete="off" placeholder="请选择你的身份" readonly></el-input>
          <el-dropdown @command="handleCommand" style="margin-left: 10px;">
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="Boss">Boss</el-dropdown-item>
              <el-dropdown-item command="主管">主管</el-dropdown-item>
              <el-dropdown-item command="前台">前台</el-dropdown-item>
              <el-dropdown-item command="员工">员工</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-form-item>
    <el-form-item  prop="userName">
      <el-input
          type="text"
          autocomplete="off"
          v-model.number="ruleForm.userName"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user-solid"></el-input>
    </el-form-item>
    <el-form-item  prop="password">
      <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
      ></el-input>
    </el-form-item>
      <el-form-item  prop="checkPass">
        <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            placeholder="请确认密码"
            prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'registerVue',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        userName: '',
        checkPass: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入你的用户名', trigger: 'blur' },
          { min: 2, max: 9, message: '长度为2到9个字符', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      selectedIdentity: ''
    }
  },
  methods: {
    submitForm (ruleForm) {
      this.ruleForm = {}

      this.$message({
        message: '恭喜你注册成功，请点击登录按钮去登录吧！！',
        type: 'success'
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    toLogin () {
      this.$router.push('/')
    },
    handleCommand (identity) {
      this.selectedIdentity = identity
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
  margin: 0;
  padding: 0;
}
.register-container{
  border-radius: 15px;
  background-clip: padding-box ;
  margin: 90px auto;
  width : 350px;
  padding: 35px 35px 15px 35px ;
  background:#fff;
  border:1px solid #eaeaee ;
  box-shadow:0 0 25px #cac6c6;
}
.register_title{
  margin : 0 auto 40px auto;
  text-align:center ;
  color : #505458;
}

</style>
