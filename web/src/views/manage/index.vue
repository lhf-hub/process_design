<template>
    <el-container style="height: 100vh">
      <el-aside :width="sideWidth+'px'" style="background-color: rgb(238, 241, 246); height:100% ;box-shadow: 2px 0 6px rgb(0 21 41 / 35%)" >
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header style="border-bottom: 1px solid #ccc">
            <Header></Header>
        </el-header>
        <el-main  style="padding: 10px 20px;">
<!--          表示当前页面的子路由会在router&#45;&#45;view中展示-->
         <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

</template>

<script>
import Aside from '@/components/sidebar.vue'
import Header from '@/components/header.vue'

export default {
  name: 'MangeVue',
  components: {
    Aside,
    Header

  },
  created () {

  },
  data () {
    return {
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200

    }
  }

}
</script>

<style>

</style>
