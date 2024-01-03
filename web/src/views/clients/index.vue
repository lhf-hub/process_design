<template>
  <div >
    <el-container style="height: 100vh">
      <el-aside  style="width: 20%; height:100% ;box-shadow: 2px 0 6px rgb(0 21 41 / 35%)" >
          <el-tree :data="data" :props="dataProps" node-key="id" @node-click="handleNodeClick" highlight-current  accordion  ref="menuTree"></el-tree>
        </el-aside>
        <el-main style="width: 80%;">
    <div class="clients" >
      <el-select v-model="option" :placeholder="options" style="margin: 10px;" @change="getClientList(option)" :size="'small'">
      <el-option
        v-for="item in thirdData"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
    <el-button type="primary" icon="el-icon-search" :size="'small'" >搜索</el-button>
    <el-button type="success" :size="'small'" @click="add">新增<i class="el-icon-circle-plus-outline"></i></el-button>
    <el-table :data="clientList" border stripe    :size="'mini'">
      <el-table-column prop="id" label="编号" width="55px">
      </el-table-column>
      <el-table-column  prop="name" label="姓名" width="100px">
        <template slot-scope="scope">
  <el-tag  type="success">{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话" >
      </el-table-column>
      <el-table-column prop="qq" label="qq" >
      </el-table-column>
      <el-table-column prop="e_mail" label="e_mail" >
      </el-table-column>

      <el-table-column  label="操作" width="150px">
        <template v-slot:default="scope" >
          <el-button type="primary" style="margin-right:10px" :size="'mini'" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="确定删除吗？"
              @confirm="del(scope.row.id)"
          >
          <el-button type="danger" slot="reference" style="margin: 4px"  :size="'mini'" > 删除</el-button>
        </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <el-dialog title="客户信息"  width="40%" :visible.sync="DialogVisible">
      <el-form label-width="60px" size="small">
        <el-form-item label="姓名" >
          <el-input  autocomplete="off" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" >
          <el-input  autocomplete="off" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="qq" >
          <el-input  autocomplete="off" v-model="form.qq"></el-input>
        </el-form-item>
        <el-form-item label="e_mail" >
          <el-input  autocomplete="off" v-model="form.e_mail"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button >取 消</el-button>
        <el-button type="primary" @click="addClient">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="客户信息"  width="40%" :visible.sync="DialogVisibleUpdate">
      <el-form label-width="60px" size="small">
        <el-form-item label="姓名" >
          <el-input  autocomplete="off" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" >
          <el-input  autocomplete="off" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="qq" >
          <el-input  autocomplete="off" v-model="form.qq"></el-input>
        </el-form-item>
        <el-form-item label="e_mail" >
          <el-input  autocomplete="off" v-model="form.e_mail"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button >取 消</el-button>
        <el-button type="primary" @click="updateClient">确 定</el-button>
      </div>
    </el-dialog>
    </el-main>
    </el-container>

  </div>
  </template>

<script>
import requests from '@/utils/request'
export default {
  name: 'clientsInfo',
  data () {
    return {
      name: '',
      data: [],
      thirdData: [],
      dataProps: {
        label: 'name',
        children: 'secondCompany'
      },
      dataPropsThird: {
        label: 'name'
      },
      option: '',
      options: '',
      first: '',
      second: '',
      third: '',
      clientList: [],
      DialogVisibleUpdate: false,
      DialogVisible: false,
      form: {}
    }
  },
  created () {
    this.getCompanyClient()
  },
  computed: {

  },
  methods: {
    handleEdit (row) {
      this.form = row
      this.DialogVisibleUpdate = true
    },
    handleNodeClick (data, node) {
      if (typeof data.secondCompany === 'undefined') {
        this.option = ''
        this.thirdData = data.thirdCompany
        this.first = this.getParentNode(node)
        this.second = data.id
        console.log(this.first)
        console.log(this.second)
        if (!(this.thirdData).length) {
          this.options = '暂无'
        } else {
          this.options = '请选择'
        }
      }
    },
    getParentNode (node) {
      // 获取当前节点的父节点
      if (node && node.parent) {
        console.log(node.parent)
        return node.parent.data.id
      }
      return null
    },
    async getCompanyClient () {
      const res = await requests.get('/client/getCompanyClient')
      this.data = res.data
    },
    del (id) {
      requests.post('/client/delete', { id }).then(async res => {
        if (res.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getCompanyClient()
          this.getClientList(this.option)
        } else {
          this.$message.error({
            message: '删除失败'
          })
        }
      })
    },
    add () {
      this.DialogVisible = true
    },
    async addClient () {
      await requests.post('/client/insert', this.form).then(async res => {
        if (res.code === 200) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.getClientList(this.option)
          this.DialogVisible = false
          this.form = {}
        }
      })
    },
    async updateClient () {
      await requests.post('/client/update', this.form.id, this.form).then(async res => {
        if (res.code === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.getCompanyClient()
          this.getClientList(this.option)
          this.DialogVisibleUpdate = false
          this.form = {}
        }
      })
    },
    getClientList (option) {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].id === this.first) {
          for (let j = 0; j < (this.data[i].secondCompany).length; j++) {
            if (this.data[i].secondCompany[j].id === this.second) {
              for (let k = 0; k < (this.data[i].secondCompany[j].thirdCompany).length; k++) {
                if (this.data[i].secondCompany[j].thirdCompany[k].id === option) {
                  this.clientList = this.data[i].secondCompany[j].thirdCompany[k].client
                }
              }
            }
          }
        }
      }
    }

  }

}
</script>

  <style>

  </style>
