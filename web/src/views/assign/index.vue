<template>
  <div>
    <div class="assignTasks">

      <el-table :data="workersData" border stripe size="100">
        <el-table-column label="" width="50" prop="redDot">
          <template #default="props">
            <div class="RedDot" v-if="props.row.redDot"></div>
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template #default="props">
            <div m="4" class="tasks">
              <el-table :data="props.row.mission" :header-cell-style="{ color: 'black' }">
                <el-table-column label="项目id" prop="mission_id" v-if="false" />
                <el-table-column label="项目" prop="project_name" />
                <el-table-column label="任务" prop="mission_name" />
                <el-table-column label="任务内容" prop="mission_content" />
                <el-table-column label="状态" prop="missionstatus" />
                <el-table-column label="任务津贴" prop="mission_bonus" />
                <el-table-column label="操作">
                  <template #default="scope">
                    <el-button v-if="scope.row.mission_status == -1" size="small" type="danger"
                      @click="updateReassign(scope.row)">重新分配</el-button>
                  </template>
                </el-table-column>
                <el-table-column label="员工回复" prop="receiver_reply">
                </el-table-column>
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="员工id" width="100" prop="id" v-if="false">
        </el-table-column>
        <el-table-column label="姓名" width="150" prop="name">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="职称" width="60" prop="isRegular">
        </el-table-column>
        <el-table-column label="电话" prop="phone">
        </el-table-column>
        <el-table-column label="邮箱" prop="e_mail">
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template v-slot:default="scope">
            <el-button type="primary" style="width: 55px;height: 27px; margin: 4px" size="100"
              @click="updateForm(scope.row)"><i class="el-icon-folder-add"></i></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="任务分配" :visible.sync="dialogFormVisible" width="50%">
        <el-form label-width="100px" size="100%">
          <el-form-item label="项目">
            <el-select v-model="task.project_id" placeholder="请选择" style="margin: 10px;" :size="'small'">
              <el-option v-for=" item  in  projects " :key="item.project_id" :label="item.project_name"
                :value="item.project_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务标题">
            <el-input autocomplete="off" v-model="task.name"></el-input>
          </el-form-item>
          <el-form-item label="任务内容">
            <el-input autocomplete="off" v-model="task.content"></el-input>
          </el-form-item>
          <el-form-item label="任务津贴">
            <el-input-number autocomplete="off" v-model="task.bonus">
            </el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="assign">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="任务重分配" :visible.sync="reassignForm" width="30%">
        <el-form label-width="100px" size="100%">
          <el-form-item label="项目">
            <el-input readonly autocomplete="off" v-model="reassign.project_name" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="分配给:">
            <el-select v-model="reassign.receiver_id" placeholder="请选择" :size="'small'">
              <el-option v-for=" item  in  workersData " :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel1">取 消</el-button>
          <el-button type="primary" @click="reAssign">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import requests from '@/utils/request'
export default {
  name: 'assignTasks',
  data() {
    return {
      workersData: [

      ],
      dialogFormVisible: false,
      reassignForm: false,
      projects: [{ id: 1, name: '项目一' }, { id: 2, name: '项目二' }, { id: 3, name: '项目三' }],
      form: {},
      task: {
        publisher_id: '',
        receiver_id: '',
        bonus: 0,
        project_id: '',
        name: '',
        content: ''
      },
      reassign: {
        id: "",
        project_id: "",
        receiver_id: "",
        project_name: ""
      }
    }
  },
  methods: {

    cancel() {
      this.dialogFormVisible = false
      this.task = {
        publisher_id: '',
        receiver_id: '',
        bonus: 0,
        project_id: '',
        name: '',
        content: ''
      }
    },

    cancel1() {
      this.reassignForm = false
      this.reassign = {
        id: "",
        project_id: "",
        receiver_id: "",
        project_name: ""
      }
    },

    async assign() {
      this.task.publisher_id = this.$store.state.user.userList.employee_id
      const token = localStorage.getItem('token')
      await requests.post('/mission/create', this.task, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            message: '分配成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '分配失败',
            type: 'error'
          })
        }
      })
      this.dialogFormVisible = false
      this.task = {
        publisher_id: '',
        receiver_id: '',
        bonus: 0,
        project_id: '',
        name: '',
        content: ''
      }
      this.update()
    },

    async reAssign() {
      const token = localStorage.getItem('token')
      console.log(this.reassign);
      await requests.post("/mission/updatereceiver", this.reassign, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            message: '分配成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '分配失败',
            type: 'error'
          })
        }
      })

      this.reassignForm = false
      this.reassign = {
        id: "",
        project_id: "",
        receiver_id: "",
        project_name: ""
      }
      this.update()
    },

    updateForm(row) {
      this.task.receiver_id = row.id
      this.dialogFormVisible = true
    },

    updateReassign(row) {
      this.reassign.id = row.mission_id
      this.reassign.project_id = row.project_id
      this.reassign.project_name = row.project_name
      this.reassignForm = true
    },

    async getEmployees() {
      return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token')
        requests.post('/employee/getDepartmentEmployee', {}, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then(async res => {
          let data = []
          const user = this.$store.state.user.userList
          for (let i = 0; i < res.data.length; i++) {
            if (user.department_id == res.data[i].id) {
              for (let j = 0; j < res.data[i].supervisor.length; j++) {
                if (res.data[i].supervisor[j].id == user.employee_id) {
                  data = res.data[i].supervisor[j].employee
                }
              }
            }
          }
          // 删除自己
          data.splice(data.findIndex(item => item.id === user.employee_id), 1)
          for (let item of data) {
            const response = await requests.post("/mission/getbyreceiverid", { receiver_id: item.id }, {
              headers: {
                Authorization: 'Bearer ' + token
              }
            })
            item.mission = response.data
            item.redDot = item.mission.some(missionItem => missionItem.mission_status == -1);
            item.mission.forEach(missionItem => {
              switch (missionItem.mission_status) {
                case 0:
                  missionItem.missionstatus = '已创建'
                  break
                case 1:
                  missionItem.missionstatus = '待接受'
                  break
                case 2:
                  missionItem.missionstatus = '进行中'
                  break
                case 3:
                  missionItem.missionstatus = '已完成'
                  break
                case -1:
                  missionItem.missionstatus = '被退回'
                  break
              }
            })
          }
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },

    async getJoinedProjects() {
      const token = localStorage.getItem('token')
      await requests.post('/project/getjoined', {}, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(res => {
        this.projects = res.data
      })
    },
    async update() {
      this.getJoinedProjects()
      this.workersData = await this.getEmployees()
      console.log(this.workersData);
    }
  },
  created() {
    this.update()
  },
  beforeUpdate() {
    this.workersData.forEach(item => {
      item.isRegular = item.is_regular == 1 ? '熟手' : '新手'
    })
  }

}
</script>

<style>
.tasks {
  margin-left: 200px;
  margin-right: 200px;

  border: 2px solid lightblue;
}

.RedDot {
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  display: inline-block;
  margin: 10px;
}
</style>
