<template>
  <div style="line-height: 60px ;display: flex">
  <div  style="flex: 1">
    <span style="cursor: pointer;font-size: 18px" ></span>
  <el-breadcrumb separator="/"  style="display: inline-block;margin-left:10px ">
  <el-breadcrumb-item :to="{ path: '/myTask' }" replace>首页</el-breadcrumb-item>
  <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
</el-breadcrumb>
  </div>

  <el-dropdown style=" cursor: pointer" >
    <div style="display: inline-block">
      <img src="" alt=""
        style="width: 30px;border-radius: 70%;position: relative;top:10px;margin-right: 5px">
      <span>{{ userList.account_id}}</span>
      <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
    </div>
    <el-dropdown-menu slot="dropdown" style="text-align: center">
      <el-dropdown-item>
        <router-link to="/person">个人信息</router-link>
      </el-dropdown-item>
      <el-dropdown-item>
        <span  style="text-decoration: none">退出</span>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>

</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HeaderBar',
  data () {
    return {

    }
  },
  computed: {
    currentPathName () {
      console.log(this.$store.state.currentPathName)
      return this.$store.state.currentPathName
    },
    ...mapState('user', ['userList'])

  }

}
</script>

<style>

</style>
