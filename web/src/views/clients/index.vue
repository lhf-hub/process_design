<template>
<div class="clientsInfo">
    <div  style="padding: 10px 0">
      <el-select v-model="value" clearable placeholder="请输入单位名" :size="'small'">
    <el-option
      v-for="item in optionsUnit"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
  <el-select v-model="value" clearable placeholder="请输入客户名"  style="margin: 0 10px;" :size="'small'">
    <el-option
      v-for="item in optionsUnit"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
  <el-button type="primary" icon="el-icon-search" :size="'small'" >搜索</el-button>
    <!-- <el-input  style="width: 200px; margin: 5px" placeholder="请输入姓名" suffix-icon="el-icon-search" v-model="name" ></el-input>
    <el-input  style="width: 200px" placeholder="请输入职称" suffix-icon="el-icon-search" v-model="nickname"></el-input>
    <el-button  style="margin-left: 5px" type="primary">搜索</el-button>
    <el-button  style="margin-left: 5px" type="warning">重置</el-button> -->
  </div>
  <div style="margin: 10px 0" >
    <!-- <el-button type="primary" >新增<i class="el-icon-circle-plus-outline"></i></el-button> -->
    <!-- <el-popconfirm style="margin: 7px"
                   confirm-button-text='确定'
                   cancel-button-text='我再想想'
                   icon="el-icon-info"
                   icon-color="red"
                   title="确定批量删除这些数据吗？"
                   @confirm="delBatch">
       <el-button type="danger" slot="reference">批量删除<i class="el-icon-remove-outline"></i></el-button>
    </el-popconfirm> -->
    <!-- <el-upload action="http://localhost:9090/user/import" style="display: inline-block" :show-file-list="false" accept="xlsx" :on-success="handleImportSuccess">
      <el-button type="primary" style="margin: 7px" >导入<i class="el-icon-bottom"></i></el-button>
    </el-upload>
    <el-button type="primary"  @click="exp">导出<i class="el-icon-top"></i></el-button> -->
  </div>
  <el-table :data="clientsList" border stripe   @selection-change="handleSelectionChange" :size="'mini'">
    <el-table-column prop="project" label="项目" >
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="100px">
      <template slot-scope="scope">
<el-tag  type="success">{{ scope.row.name }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="单位">
    <el-table-column prop="firstCompany_name" label="一级单位">
    </el-table-column>
    <el-table-column prop="secondCompany_name" label="二级单位">
    </el-table-column>
    <el-table-column prop="thirdCompany_name" label="三级单位">
    </el-table-column>
    </el-table-column>
    <el-table-column prop="phone" label="电话" >
    </el-table-column>
    <el-table-column prop="qq" label="qq" >
    </el-table-column>
    <el-table-column prop="e_mail" label="e_mail" >
    </el-table-column>

    <el-table-column  label="操作" width="150px">
      <template v-slot:default="scope" >
        <!-- <el-button type="success" >编辑 <i class="el-icon-edit"></i></el-button> -->
        <el-button type="primary" style="margin-right:10px" :size="'mini'" @click="handleEdit(scope.row)">编辑</el-button>
        <el-popconfirm
            confirm-button-text='确定'
            cancel-button-text='我再想想'
            icon="el-icon-info"
            icon-color="red"
            title="确定删除吗？"
            @confirm="del(scope.row.id)"
        >

          <!-- <el-button type="danger" slot="reference" style="margin: 7px">删除 <i class="el-icon-remove-outline"></i></el-button> -->
        </el-popconfirm>
        <el-button type="danger" slot="reference"  :size="'mini'"> 删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div  style="padding: 10px">
    <el-pagination
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
  <el-dialog title="客户信息"  width="30%" :visible.sync="dialogFormVisible">
    <el-form label-width="60px" size="small">
      <el-form-item label="姓名">
        <el-input  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址">
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
  </el-dialog>

</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'clientsInfo',
  data () {
    return {
      optionsUnit: [],
      form: {},
      dialogFormVisible: false
    }
  },
  created () {
    this.$store.dispatch('clients/getList')
  },
  computed: {
    ...mapState('clients', ['clientsList'])
  },
  methods: {
    handleEdit (row) {
      this.form = row
      this.dialogFormVisible = true
    }
  }

}
</script>

<style>

</style>
