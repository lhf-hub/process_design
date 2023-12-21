<template>
  <div>
    <div class="workersInfo">
    <div  style="padding: 3px 0">
    <el-input  style="width: 200px; margin: 5px" placeholder="请输入姓名" suffix-icon="el-icon-search" v-model="name" :size="'small'"></el-input>
    <el-button  style="margin-left: 5px" type="primary" :size="'small'" @click="search">搜索</el-button>
    <el-button  style="margin-left: 5px" type="warning" :size="'small'">重置</el-button>
  </div>
  <div style="margin: 7px 0" >
    <el-button type="primary" :size="'small'" >新增<i class="el-icon-circle-plus-outline"></i></el-button>
    <el-popconfirm style="margin: 7px"
                   confirm-button-text='确定'
                   cancel-button-text='我再想想'
                   icon="el-icon-info"
                   icon-color="red"
                   title="确定批量删除这些数据吗？"
                   @confirm="delBatch">
      <el-button type="danger" slot="reference"  :size="'small'">批量删除<i class="el-icon-remove-outline"></i></el-button>
    </el-popconfirm>
  </div>
  <el-table :data="workersList" border stripe :size="'mini'">
    <el-table-column  label="工号" width="80" prop="id" >
    </el-table-column>
  <el-table-column prop="name" label="姓名" width="100px">
      <template slot-scope="scope">
        <el-tag>{{ scope.row.name }}</el-tag>
      </template>
  </el-table-column>
    <el-table-column  label="性别"  prop="sex">
    </el-table-column>
    <el-table-column  label="年龄"  prop="age">
    </el-table-column>
    <el-table-column  label="电话" prop="phone">
    </el-table-column>
    <el-table-column  label="邮箱" prop="e-mail" >
    </el-table-column>
    <el-table-column  label="地址" prop="address" >
    </el-table-column>
    <el-table-column  label="入职时间" prop="entry_time" >
    </el-table-column>
    <el-table-column  label="离职时间" prop="leave_time" >
    </el-table-column>
    <el-table-column  label="地址" prop="address" >
    </el-table-column>
    <el-table-column  label="用户名" prop="username" >
    </el-table-column>
    <el-table-column  label="密码" prop="password" >
    </el-table-column>
    <el-table-column  label="操作" width="150px"  fixed="right">
      <template v-slot:default="scope" >
        <el-button type="primary" style="margin: 4px" :size="'mini'"> 编辑</el-button>
        <el-popconfirm
            confirm-button-text='确定'
            cancel-button-text='我再想想'
            icon="el-icon-info"
            icon-color="red"
            title="确定删除吗？"
            @confirm="del(scope.row.id)"
        >
        <el-button type="danger" slot="reference" style="margin: 4px"  :size="'mini'"> 删除</el-button>

        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!-- <div  style="padding: 10px"> -->
    <!-- <el-pagination
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination> -->
  <!-- </div> -->
  <!-- <el-dialog title="用户信息"  width="30%">
    <el-form label-width="60px" size="small">
      <el-form-item label="姓名">
        <el-input  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-input  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="职称">
        <el-input  autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button >取 消</el-button>
      <el-button type="primary"   >确 定</el-button>
    </div>
  </el-dialog> -->

</div>
  </div>
</template>

<script>
import requests from '@/utils/request'
import { mapState } from 'vuex'
export default {
  name: 'workersInfo',
  data () {
    return {
      name: '',
      workersData: []
    }
  },
  created () {
    this.$store.dispatch('workers/getList')
    // this.workersData
  },
  computed: {
    ...mapState('workers', ['workersList'])
  },
  methods: {
    async search () {
      alert(this.name)
      console.log(this.name)
      const res = await requests.get(`/employee?name=${this.name}`)
      console.log(res[0])
    }
  }
}
</script>

<style>

</style>
