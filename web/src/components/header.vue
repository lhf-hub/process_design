<template>
  <div style="line-height: 60px ;display: flex">
  <div  style="flex: 1">
    <span style="cursor: pointer;font-size: 18px" ></span>
  <el-breadcrumb separator="/"  style="display: inline-block;margin-left:10px ">
  <el-breadcrumb-item :to="{ path: '/myTask' }" replace>首页</el-breadcrumb-item>
  <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
</el-breadcrumb>
  </div>
  <el-dropdown>
<div>
  <span><i class="el-icon-bell head-news-icon" style=" margin-top: 0px;margin-right: 0px"></i></span>
  <el-badge is-dot class="item"></el-badge>
</div>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>黄金糕</el-dropdown-item>
    <el-dropdown-item>狮子头</el-dropdown-item>
    <el-dropdown-item>螺蛳粉</el-dropdown-item>
    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
    <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>

  <el-dropdown style=" cursor: pointer" >
    <div style="display: inline-block">
      <img src="" alt=""
        style="width: 30px;border-radius: 70%;position: relative;top:10px;margin-right: 5px">
      <span>{{ userName }}</span>
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
export default {
  name: 'HeaderBar',
  data () {
    return {
      userName: 'aa'

    }
  },
  computed: {
    currentPathName () {
      console.log(this.$store.state.currentPathName)
      return this.$store.state.currentPathName
    }
  }

}
</script>

<style>

</style>
