<template>
  <el-card style="width: 600px">
  <el-form label-width="60px" size="small">
    <el-form-item label="姓名:">
      <el-input v-model="form.userName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="年龄:">
      <el-input v-model="form.age" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="电话:">
      <el-input v-model="form.phone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱:">
      <el-input v-model="form.e_mail" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="地址:">
      <el-input v-model="form.address" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="用户名:">
      <el-input v-model="form.userName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码:">
      <el-input v-model="form.passWord" autocomplete="off"></el-input>
    </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="save" style="margin-top: 10px">确 定</el-button>
  </el-form-item>
  </el-form>
  </el-card>
</template>
<script>
import { mapState } from 'vuex'
import requests from '@/utils/request'
export default {
  name: 'personInfo',
  data () {
    return {
      form: {}
    }
  },
  created () {
    this.form = this.userList
  },
  computed: {
    ...mapState('user', ['userList'])
  },
  methods: {
    async save () {
      await requests.post('/employee/update', this.userList.id, this.form).then(async response => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      })
    }
  }
}

</script>

<style>

</style>
