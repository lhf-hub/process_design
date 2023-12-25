<template>
  <el-menu :default-openeds="['1', '3']" style="height:100% ; overflow-x:hidden "
           background-color="rgb(48, 65, 86)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition=false
           router
  >
    <div style="height: 60px;line-height: 60px;text-align: center">
      <b style="color: white">房地产项目设计流程管理</b>
    </div>
    <el-menu-item index="/myTask" v-if="userList.position=='主管'||userList.position=='熟手'||userList.position=='新手'" >
      <template slot="title">
        <i class="el-icon-house"></i>
        <span slot="title">工作台</span>
      </template>
    </el-menu-item>
    <el-submenu index="2" v-if="userList.position=='前台'||userList.position=='老板'">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">系统管理</span>
      </template>
      <el-menu-item index="/clientsInfo">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span slot="title">客户管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/employeeInfo">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">员工管理</span>
        </template>
      </el-menu-item >
    </el-submenu>

    <el-menu-item index="#" v-if="userList.position=='主管'||userList.position=='老板'">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">项目信息</span>
        </template>
      </el-menu-item>

    <el-submenu index="2" v-if="userList.position=='主管'">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">我的员工</span>
      </template>
      <el-menu-item index="/employeeInfo">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span slot="title">员工信息</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/analysis">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">员工绩效</span>
        </template>
      </el-menu-item>
    </el-submenu>
      <el-menu-item index="/assignTasks" v-if="userList.position=='主管'">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">任务分配</span>
        </template>
      </el-menu-item>
      <el-menu-item index="#" v-if="userList.position=='老板'">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">公司业绩</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/analysis" v-if="userList.position=='老板'||userList.position=='前台'" >
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">员工绩效</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/clientsInfo" v-if="userList.position=='主管'">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span slot="title">客户管理</span>
        </template>
      </el-menu-item>
      <el-menu-item v-if="userList.position=='主管'||userList.position=='老板'||userList.position=='前台'">
        <template slot="title" >
          <i class="el-icon-document"></i>
          <span slot="title">监控室</span>
        </template>
      </el-menu-item>
      <el-menu-item v-if="userList.position=='熟手'||userList.position=='新手'">
        <template slot="title" >
          <i class="el-icon-document"></i>
          <span slot="title">我的项目</span>
        </template>
      </el-menu-item>
      <el-menu-item v-if="userList.position=='老板'">
        <template slot="title" >
          <i class="el-icon-document"></i>
          <span slot="title">项目管理</span>
        </template>
      </el-menu-item>

  </el-menu>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'SideAside',
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState('user', ['userList'])
  }

}
</script>

<style>

</style>
