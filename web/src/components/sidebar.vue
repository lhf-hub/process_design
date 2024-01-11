<template>
  <el-menu :default-openeds="['1', '3']" style="height:100% ; overflow-x:hidden " background-color="rgb(48, 65, 86)"
    text-color="#fff" active-text-color="#ffd04b" :collapse-transition=false router>
    <div style="height: 60px;line-height: 60px;text-align: center">
      <b style="color: white">房地产项目设计流程管理</b>
    </div>
    <el-menu-item index="/myTask" v-if="userList.role == 'Supervisor'">
      <template slot="title">
        <i class="el-icon-house"></i>
        <span slot="title">工作台</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/employeeTask" v-if="userList.role == 'Employee'">
      <template slot="title">
        <i class="el-icon-house"></i>
        <span slot="title">工作台</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/employeeProject" v-if="userList.role == 'Employee'">
      <template slot="title">
        <i class="el-icon-house"></i>
        <span slot="title">参与过的项目</span>
      </template>
    </el-menu-item>
    <el-submenu index="2" v-if="userList.role == 'Front' || userList.role == 'Boss'">
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
      </el-menu-item>
    </el-submenu>

    <el-menu-item index="/cloud"
      v-if="userList.role == 'Supervisor' || userList.role == 'Boss' || userList.role == 'Employee'">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span slot="title">云盘</span>
      </template>
    </el-menu-item>

    <el-submenu index="2" v-if="userList.role == 'Supervisor'">
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
      <el-menu-item index="/employeeAnalysis">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">员工绩效</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/assignTasks" v-if="userList.role == 'Supervisor'">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span slot="title">任务分配</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/analysis" v-if="userList.role == 'Boss'">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span slot="title">营业额统计</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/employeeAnalysis" v-if="userList.role == 'Boss'">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span slot="title">员工绩效</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/monitor" v-if="userList.role == 'Supervisor' || userList.role == 'Boss'">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span slot="title">监控室</span>
      </template>
    </el-menu-item>
    <!-- <el-menu-item v-if="userList.role == 'Employee'">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span slot="title">我的项目</span>
      </template>
    </el-menu-item> -->

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
  data() {
    return {

    }
  },
  computed: {
    ...mapState('user', ['userList'])
  }


}
</script>

<style></style>
