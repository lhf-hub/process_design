<template>
  <div>
    <div class="employeeInfo">
      <div style="padding: 3px 0">
        <el-select v-model="option" :disabled="IsVisible" :size="'small'" @change="getEmployeeList(option)">
          <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-input style="width: 200px; margin: 5px" placeholder="请输入姓名" suffix-icon="el-icon-search" v-model="name"
          :size="'small'"></el-input>
        <el-button style="margin-left: 5px" type="primary" :size="'small'" @click="search">搜索</el-button>
        <el-button style="margin-left: 5px" type="warning" :size="'small'" @click="reset">重置</el-button>
      </div>
      <div style="margin: 7px 0">
        <el-button type="primary" :size="'small'" @click="add">新增员工<i class="el-icon-circle-plus-outline"></i></el-button>
        <el-button type="danger" :size="'small'" @click="addSuper" v-if="userList.role !== 'Supervisor'">新增主管<i
            class="el-icon-circle-plus-outline"></i></el-button>
      </div>
      <el-table :data="employeeData" border stripe :size="'mini'">
        <!-- <el-table-column  label="工号" width="80" prop="id" >
    </el-table-column> -->
        <el-table-column prop="name" label="姓名" width="150px">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="性别" prop="sex" width="50px">
        </el-table-column>
        <el-table-column label="年龄" prop="age" width="50px">
        </el-table-column>
        <el-table-column label="电话" prop="phone">
        </el-table-column>
        <el-table-column label="邮箱" prop="e_mail">
        </el-table-column>
        <el-table-column label="地址" prop="address">
        </el-table-column>
        <el-table-column label="是否正式员工" prop="isRegular">
        </el-table-column>
        <el-table-column label="薪水" prop="salary_least">
        </el-table-column>
        <el-table-column label="入职时间" prop="entry_time" width="150px">
        </el-table-column>
        <el-table-column label="用户名" prop="user_id">
        </el-table-column>
        <el-table-column label="密码" prop="password">
        </el-table-column>
        <el-table-column label="操作" width="150px" fixed="right">
          <template v-slot:default="scope">
            <el-button type="primary" style="margin: 4px" :size="'mini'" @click="handleEdit(scope.row)"> 编辑</el-button>
            <el-popconfirm confirm-button-text='确定' cancel-button-text='我再想想' icon="el-icon-info" icon-color="red"
              title="确定删除吗？" @confirm="del(scope.row.id)">
              <el-button type="danger" slot="reference" style="margin: 4px" :size="'mini'"> 删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="新增员工" width="50%" :visible.sync="DialogVisible" center>

        <el-form label-width="70px" :size="'small'">
          <el-form-item label="部门 ">
            <el-select v-model="option" :disabled="IsVisible" :size="'small'" @change="getEmployeeList(option)">
              <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主管" v-if="userList.role !== 'Supervisor'">
            <el-select v-model="supervisorId" :disabled="IsVisible" :size="'small'">
              <el-option v-for="item in supervisor" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="姓名" prop="name">
                <el-input autocomplete="off" v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="年龄">
                <el-input autocomplete="off" v-model="form.age"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="是否正式">
                <el-radio v-model="form.is_regular" :label="1">是</el-radio>
                <el-radio v-model="form.is_regular" :label="0">否</el-radio>
              </el-form-item>
            </el-col>

          </el-row>
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="18">
              <el-form-item label="地址">
                <el-input autocomplete="off" v-model="form.address"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="薪资">
                <el-input autocomplete="off" v-model="form.salary_least"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="电话">
                <el-input autocomplete="off" v-model="form.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱">
                <el-input autocomplete="off" v-model="form.e_mail"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="入职时间">
            <el-row :gutter="15">
              <el-col :span="10">
                <el-date-picker type="date" placeholder="入职日期" v-model="form.entry_time"
                  value-format="yyyy-MM-dd"></el-date-picker>
              </el-col>
              <el-col :span="2"><span> -</span></el-col>

            </el-row>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input autocomplete="off" v-model="form.user_id"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input autocomplete="off" v-model="form.password" type="password"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="addEmployee">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改员工信息" width="50%" :visible.sync="DialogVisibleUpdate" center>

        <el-form label-width="70px" :size="'small'">
          <el-form-item label="部门 ">
            <el-select v-model="option" :disabled="IsVisible" :size="'small'" @change="getEmployeeList(option)">
              <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="姓名" prop="name">
                <el-input autocomplete="off" v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="年龄">
                <el-input autocomplete="off" v-model="form.age"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="是否正式">
                <el-radio v-model="form.is_regular" :label="1">是</el-radio>
                <el-radio v-model="form.is_regular" :label="0">否</el-radio>
              </el-form-item>
            </el-col>

          </el-row>
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="18">
              <el-form-item label="地址">
                <el-input autocomplete="off" v-model="form.address"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="薪资">
                <el-input autocomplete="off" v-model="form.salary_least"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="电话">
                <el-input autocomplete="off" v-model="form.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱">
                <el-input autocomplete="off" v-model="form.e_mail"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="入职时间">
            <el-row :gutter="15">
              <el-col :span="10">
                <el-date-picker type="date" placeholder="入职日期" v-model="form.entry_time"
                  value-format="yyyy-MM-dd"></el-date-picker>
              </el-col>
              <el-col :span="2"><span> -</span></el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input :disabled="true" autocomplete="off" v-model="form.user_id"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input autocomplete="off" v-model="form.password" type="password"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="updateEmployee">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="新增主管" width="50%" :visible.sync="DialogVisibleAddSuper" center>

        <el-form label-width="70px" :size="'small'">
          <el-form-item label="部门 ">
            <el-select v-model="option" :disabled="IsVisible" :size="'small'">
              <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="姓名" prop="name">
                <el-input autocomplete="off" v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="年龄">
                <el-input autocomplete="off" v-model="form.age"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
            </el-col>
          </el-row>
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="18">
              <el-form-item label="地址">
                <el-input autocomplete="off" v-model="form.address"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="薪资">
                <el-input autocomplete="off" v-model="form.salary_least"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="电话">
                <el-input autocomplete="off" v-model="form.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱">
                <el-input autocomplete="off" v-model="form.e_mail"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="入职时间">
            <el-row :gutter="15">
              <el-col :span="10">
                <el-date-picker type="date" placeholder="入职日期" v-model="form.entry_time"
                  value-format="yyyy-MM-dd"></el-date-picker>
              </el-col>
              <el-col :span="2"><span> -</span></el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input autocomplete="off" v-model="form.user_id"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input autocomplete="off" v-model="form.password" type="password"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="addSupervisor">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import requests from '@/utils/request'
import { mapState } from 'vuex'
export default {
  name: 'workersInfo',
  data() {
    return {
      name: '',
      employeeData: [],
      IsVisible: '',
      option: '',
      DialogVisible: false,
      DialogVisibleUpdate: false,
      form: {},
      supervisor: {},
      supervisorId: '',
      DialogVisibleAddSuper: false

    }
  },
  created() {
    this.getDepartments()
    this.identify()
  },
  computed: {
    ...mapState('department', ['departmentList']),
    ...mapState('user', ['userList'])

  },
  beforeUpdate() {
    this.employeeData.forEach((item) => {
      if (item.is_regular == 1) {
        item.isRegular = '是'
      } else {
        item.isRegular = '否'
      }
    })
  },
  methods: {
    getDepartments() {
      this.$store.dispatch('department/getList')
    },
    async getEmployeeList(option, supervisorId) {
      this.employeeData = []
      this.supervisorId = ''
      this.supervisor = []
      const token = localStorage.getItem("token")
      await requests.post('/employee/getDepartmentEmployee', {}, {
        headers: {
          "authorization": `Bearer ${token}`
        }
      }).then((res) => {
        console.log(res)
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].id === option) {
            if (supervisorId) {
              for (let j = 0; j < res.data[i].supervisor.length; j++) {
                if (res.data[i].supervisor[j].id === supervisorId) {
                  this.employeeData = res.data[i].supervisor[j].employee.filter(function (item) {
                    return item.id !== supervisorId
                  })
                }
              }
            } else {
              for (let j = 0; j < res.data[i].supervisor.length; j++) {
                const { id, name } = res.data[i].supervisor[j]
                this.supervisor[j] = { id, name }
                this.employeeData = this.employeeData.concat(res.data[i].supervisor[j].employee)
              }
              console.log(this.supervisor)
            }
          }
        }
      })
    },
    identify() {
      const { role } = this.userList
      this.IsVisible = (role !== 'Boss' && role !== 'Front')
      if (this.IsVisible) {
        this.option = this.userList.department_id
        this.supervisorId = this.userList.employee_id
        // 部门id 和主管id
        this.getEmployeeList(this.option, this.supervisorId)
      }
    },
    async search() {
      console.log(this.employeeData)
      if (this.name === '') {
        if (this.userList.role === 'Supervisor') {
          this.getEmployeeList(this.option, this.userList.employee_id)
        } else {
          this.getEmployeeList(this.option)
        }
      } else {
        const token = localStorage.getItem("token")
        await requests.post('/employee/query', { name: this.name }, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }).then((res) => {
          console.log(res.data)
          const id = this.userList.employee_id
          const name = this.userList.employee_name
          if (this.userList.role === 'Supervisor') {
            this.employeeData = res.data.filter(function (item) {
              return (item.id !== id) && (item.supervisor_name === name)
            })
            console.log(this.employeeData)
          } else {
            this.employeeData = res.data
            console.log(this.employeeData)
          }
        }).catch((err) => {
          console.log(err)
        })
      }
      this.name = ''
    },
    async reset() {
      if (this.userList.role === 'Supervisor') {
        this.getEmployeeList(this.option, this.userList.employee_id)
      } else {
        this.getEmployeeList(this.option)
      }
    },
    add() {
      this.DialogVisible = true
    },
    async addEmployee() {
      this.form.department_id = this.option
      if (this.userList.role === 'Supervisor') {
        this.form.supervisor_id = this.userList.employee_id
      } else {
        this.form.supervisor_id = this.supervisorId
      }
      const token = localStorage.getItem("token")
      await requests.post('/employee/insert', this.form, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(async res => {
        const { role } = this.userList
        if (res.code === 200) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '添加失败，用户名重复！',
            type: 'error'
          })
        }
        if (role !== 'Boss' && role !== 'Front') {
          this.getEmployeeList(this.option, this.userList.employee_id)
        } else {
          this.getEmployeeList(this.option)
        }
        this.DialogVisible = false
        this.form = {}
      })
    },
    cancel() {
      this.DialogVisible = false
      this.DialogVisibleUpdate = false
      this.form = {}
    },

    del(id) {
      const token = localStorage.getItem("token")
      requests.post('/employee/delete', { id },
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        .then(async res => {
          if (res.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          } else {
            this.$message.error({
              message: '删除失败'
            })
          }
          const { role } = this.userList
          if (role !== 'Boss' && role !== 'Front') {
            this.getEmployeeList(this.option, this.userList.employee_id)
          } else {
            this.getEmployeeList(this.option)
          }
          this.DialogVisibleUpdate = false
          this.form = {}
        })
    },
    handleEdit(row) {
      this.form = row
      this.DialogVisibleUpdate = true
    },
    async updateEmployee() {
      this.form.department_id = this.option
      const token = localStorage.getItem("token")
      await requests.post('/employee/update', this.form, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(async res => {
        const { role } = this.userList
        if (res.code === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
        }
        if (role !== 'Boss' && role !== 'Front') {
          this.getEmployeeList(this.option, this.userList.employee_id)
        } else {
          this.getEmployeeList(this.option)
        }
        this.DialogVisibleUpdate = false
        this.form = {}
      })
    },
    addSuper() {
      this.DialogVisibleAddSuper = true
    },
    async addSupervisor() {
      this.form.department_id = this.option
      const token = localStorage.getItem("token")
      await requests.post('/employee/insert', this.form, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(async res => {
        if (res.code === 200) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.getEmployeeList(this.option)
          this.DialogVisibleAddSuper = false
          this.form = {}
        }
      }).catch(error => {
        this.$message({
          message: '添加失败，用户名重复！',
          type: 'error'
        })
      })
    }
  }

}
</script>

<style>
.el-form-item__label {
  width: 80px;
}
</style>
