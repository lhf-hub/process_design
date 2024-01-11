<template>
  <!-- 头部 -->
  <div class="index-head">
    <div class="index-head-title">
      工作台
    </div>
    <el-row>
      <el-col :xs="24" :sm="24" :md="14" :lg="12" :xl="12">
        <div class="index-head-centent-left">
          <el-avatar style="margin-right: 15px;" :size="56" :src="circleUrl"></el-avatar>
          <div class="index-head-centent-left-text">
            <p>早上好,祝你新的一天工作愉快</p>
          </div>
        </div>
      </el-col>

    </el-row>
    <div class="index-centent">

      <!-- 项目 -->
      <div class="grid-content">
        <div class="index-centent-title">
          <div class="index-centent-title-left">
            <sort class="index-centent-title-left-icon" />
            我的项目
          </div>
          <div>
            <el-input style="width: 200px;" placeholder="请输入项目名" suffix-icon="el-icon-search" v-model="name"
              :size="'small'"></el-input>
            <el-button style="margin-left: 5px ;" type="primary" :size="'small'" @click="search">搜索</el-button>
            <el-button type="warning" :size="'small'" @click="getProjects">重置</el-button>
            <el-button type="danger" :size="'small'" @click="add" :disabled="userList.department_id !== '1'">新增项目<i
                class="el-icon-circle-plus-outline"></i></el-button>
          </div>
        </div>
        <div class="index-centent-box">

          <div class="project">
            <el-table :data="projectsData" border stripe height="350" :header-cell-class-name="headerBg"
              @selection-change="handleSelectionChange" :size="'mini'">
              <el-table-column prop="project_name" label="项目名" width="150px">
                <template scope="scope">
                  <el-tooltip class="item" effect="dark" placement="top-start">
                    <div slot="content">{{ '创建时间:' + formatDate(scope.row.project_create_date) }}<br />{{
                      '完成时间:' + formatDate(scope.row.project_complete_date) }}</div>
                    <label>{{ scope.row.project_name }}</label>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="client_name" label="客户" width="120px">
                <template slot-scope="scope">
                  <el-tag type="success">{{ scope.row.client_name }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="project_quotation" label="项目报价" width="80px">
              </el-table-column>
              <el-table-column prop="project_status" label="状态" width="80px">
                <template scope="scope">
                  <span v-if="scope.row.project_status === '0'" style="color:#808080">已创建</span>
                  <span v-else-if="scope.row.project_status === '1'" style="color:#FFA500">建模中</span>
                  <span v-else-if="scope.row.project_status === '2'" style="color:#1E90FF">渲染中</span>
                  <span v-else-if="scope.row.project_status === '3'" style="color:#32CD32">后期中</span>
                  <span v-else-if="scope.row.project_status === '4'" style="color:#800080">完成</span>
                  <span v-else-if="scope.row.project_status === '5'" style="color:#FF0000">已归档</span>
                </template>
              </el-table-column>

              <el-table-column prop="project_status" label="项目进度">
                <template slot-scope="scope">
                  <div @click="process(scope.row.project_id)">
                    <el-progress :percentage="scope.row.project_status == '5' ? 100 : scope.row.project_status * 17"
                      :stroke-width="10" :color="customColors"></el-progress>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="150px">
                <template v-slot:default="scope">
                  <el-button type="danger" slot="reference" style="margin: 4px" :size="'mini'"
                    @click="roll(scope.row.project_id, scope.row.project_status)"
                    v-if="scope.row.project_status !== 0 && (userList.department_id === '1' && scope.row.project_status === '2' || userList.department_id === '2' && scope.row.project_status === '3' || userList.department_id === '3' && scope.row.project_status === '4')">回滚</el-button>
                  <el-button type="primary" style="margin: 4px" :size="'mini'"
                    v-if="userList.department_id === '1' && scope.row.project_status === '0'"
                    @click="init(scope.row.project_id)">初始化</el-button>
                  <el-button type="success" style="margin: 4px" :size="'mini'"
                    v-if="userList.department_id === '1' && scope.row.project_status === '1' || userList.department_id === '2' && scope.row.project_status === '2' || userList.department_id === '3' && scope.row.project_status === '3'"
                    @click="complete(scope.row.project_id, scope.row.project_status)">完成</el-button>
                  <el-button type="info" style="margin: 4px" :size="'mini'"
                    v-if="userList.department_id === '3' && scope.row.project_status === '4'"
                    @click="archive(scope.row.project_id)">归档</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-dialog title="项目进度" width="30%" :visible.sync="DialogVisible2" center :before-close="handleClose">
              <el-timeline :reverse="reverse">
                <el-timeline-item v-for="(activity, index) in activities" :key="index"
                  :timestamp="formatDate(activity.process_log_date)">
                  {{ activity.process_log_content + '&nbsp;&nbsp;&nbsp;&nbsp;操作人：' + activity.employee_supervisor_name }}
                </el-timeline-item>
              </el-timeline>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="close">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </div>

      <el-dialog title="新建" width="30%" :visible.sync="DialogVisible" center :before-close="handleClose">
        <el-form label-width="70px" :size="'small'">

          <el-form-item label="项目名">
            <el-input autocomplete="off" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="项目报价">
            <el-input autocomplete="off" v-model="form.quotation"></el-input>
          </el-form-item>
          <el-form-item label="客户">
            <el-select v-model="option" :size="'small'">
              <el-option v-for="item in clientsList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="渲染主管">
            <el-select v-model="form.supervisorRender" :size="'small'">
              <el-option v-for="item in supervisorRenderList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="后期主管">
            <el-select v-model="form.supervisorBack" :size="'small'">
              <el-option v-for="item in supervisorBackList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="DialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addProject">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import requests from '@/utils/request'
export default {
  name: 'myTask',
  components: {

  },
  data() {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      DialogVisible: false,
      form: {},
      option: '',
      clientsList: [],
      data: [],
      dataP: [],
      projectsData: [
      ],
      customColors: [
        { color: '#FFA500', percentage: 20 },
        { color: '#1E90FF', percentage: 40 },
        { color: '#32CD32', percentage: 60 },
        { color: '#800080', percentage: 70 },
        { color: '#FF0000', percentage: 100 }
      ],
      DialogVisible2: false,
      reverse: true,
      activities: [],
      name: '',
      projectIdList: [],
      supervisorId: '',
      supervisor: [],
      supervisorBackList: [],
      supervisorRenderList: []

    }
  },
  async created() {
    this.getOwn()
    this.getProjects()
    this.getCompanyClient()
    this.getSupervisorList()
    this.getClientList()

  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    },
    async roll(id, status) {
      status--
      const token = localStorage.getItem('token')
      await requests.post('/project/updatestatus', { id: id, status: status }, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(res => {
        if (res.code === 200) {
          this.getProjects()
        }
      })
    },

    async init(id) {
      const token = localStorage.getItem('token')
      await requests.post('/project/init', { id: id }, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(res => {
        if (res.code === 200) {
          this.getProjects()
        }
      })
    },
    async complete(id, status) {
      const token = localStorage.getItem('token')
      if (status === '1') {
        await requests.post('/project/completemodel', { id: id }, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then(res => {
          if (res.code === 200) {
            this.getProjects()
          }
        })
      } else if (status === '2') {
        await requests.post('/project/completerender', { id: id }, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then(res => {
          if (res.code === 200) {
            this.getProjects()
          }
        })
      } else if (status === '3') {
        await requests.post('/project/completepostproduction', { id: id }, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then(res => {
          if (res.code === 200) {
            this.getProjects()
          }
        })
      }
    },
    async archive(id) {
      const token = localStorage.getItem('token')
      await requests.post('/project/archive', { id: id }, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(res => {
        if (res.code === 200) {
          this.getProjects()
        }
      })
    },
    getOwn() {
      // 获取所有项目
      const token = localStorage.getItem('token')
      requests.post('/project/getProjectByEmployeeId', { employee_id: this.userList.employee_id }, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(res => {
        if (res.code === 200) {
          this.projectIdList = res.data
        }
      })
    },
    async getProjects() {
      const token = localStorage.getItem('token')
      await requests.post('/project/getall', {}, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(res => {
        if (res.code === 200) {
          this.dataP = []
          for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < this.projectIdList.length; j++) {
              if (this.projectIdList[j].project_id === res.data[i].project_id) {
                this.dataP.push(res.data[i])
              }
            }
          }
        }
      })
      this.projectsData = this.dataP
    },
    add() {
      this.getClientList()
      this.DialogVisible = true
    },
    async getCompanyClient() {
      const token = localStorage.getItem('token')
      await requests.post('/client/getCompanyClient', {}, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then((res) => {
        this.data = res.data
        console.log(this.data)
      })
    },
    async getSupervisorList() {
      const token = localStorage.getItem('token')
      await requests.post('/employee/getDepartmentEmployee', {}, {
        headers: {
          authorization: `Bearer ${token}`
        }
      }).then((res) => {
        const list = []
        for (let i = 0; i < res.data[1].supervisor.length; i++) {
          list[i] = res.data[1].supervisor[i]
        }
        this.supervisorRenderList = list
        const list2 = []
        for (let i = 0; i < res.data[2].supervisor.length; i++) {
          list2[i] = res.data[2].supervisor[i]
        }
        this.supervisorBackList = list2
      })
    },
    getClientList() {
      if (this.clientsList.length === 0) {
        for (let i = 0; i < this.data.length; i++) {
          if (typeof this.data[i].secondCompany !== 'undefined') {
            for (let j = 0; j < (this.data[i].secondCompany).length; j++) {
              if (typeof this.data[i].secondCompany[j].thirdCompany !== 'undefined') {
                for (let k = 0; k < (this.data[i].secondCompany[j].thirdCompany).length; k++) {
                  if (typeof this.data[i].secondCompany[j].thirdCompany[k].client !== 'undefined') {
                    this.clientsList = this.clientsList.concat(this.data[i].secondCompany[j].thirdCompany[k].client)
                  }
                }
              }
            }
          }
        }
      }
    },
    async addProject() {
      const token = localStorage.getItem('token')
      await requests.post('/project/create',
        {
          name: this.form.name,
          quotation: this.form.quotation,
          client_id: this.option
        }, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(async (res) => {
        if (res.code === 200) {
          await requests.post('/project/pullSupervisor', {
            project_id: res.data.project_id,
            supervisorModel: this.userList.employee_id,
            supervisorRender: this.form.supervisorRender,
            supervisorBack: this.form.supervisorBack
          }, {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }).then((res) => {
            if (res.code === 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.getOwn()

              this.getProjects()
            } else {
              this.$message({
                message: '添加失败！',
                type: 'error'
              })
            }
          })
        } else {
          this.$message({
            message: '添加失败！',
            type: 'error'
          })
        }
      })

      this.DialogVisible = false
      this.form = {}
    },
    // 根据项目id查询项目日志
    async process(id) {
      const token = localStorage.getItem('token')
      await requests.post('/processlog/getbyprojectid', { project_id: id }, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(async res => {
        if (res.code === 200) {
          console.log(res)
          this.activities = res.data
        }
      })
      this.DialogVisible2 = true
    },
    close() {
      this.DialogVisible2 = false
    },
    async search() {
      // 根据项目名查询
      const token = localStorage.getItem('token')
      await requests.post('/project/getbyname', { name: this.name }, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(async res => {
        if (res.code === 200) {
          this.data = []
          for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < this.projectIdList.length; j++) {
              if (this.projectIdList[j].project_id === res.data[i].project_id) {
                this.data.push(res.data[i])
              }
            }
          }
          this.projectsData = this.data
          this.name = ''
        }
      })
    }
  },

  computed: {
    ...mapState('user', ['userList'])
  }
}
</script>

<style scoped>
.index {
  width: 100%;
  min-height: 100%;
}

.index-head {
  width: 100%;
  padding: 0px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, .7);
  border-bottom: 1px solid #dcdfe6;
}

.index-head-title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  color: #292929;
  margin-bottom: 16px;
}

.index-head-centent-left {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.index-head-centent-left-text {
  height: 56px;
}

.index-head-centent-left-text p:nth-child(1) {
  margin-bottom: 7px;
  font-size: 20px;
  color: #292929;
  letter-spacing: 0.1em;

}

.index-head-centent-left-text p:nth-child(2) {
  font-size: 12px;
  color: #999999;
  letter-spacing: 0.1em;
}

.index-head-centent-right {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.index-head-centent-right-list {
  height: 56px;
  cursor: pointer;
  margin-left: 20px;
}

.index-head-centent-right-list-icon {
  font-size: 14px;
  display: flex;
  margin-bottom: 5px;
  color: #808695;
}

.index-head-centent-right-list-icon-is {
  width: 14px;
  height: 14px;
  fill: currentColor;
  margin-right: 5px;
  padding: 5px;
  border-radius: 12px;
}

.index-head-centent-right-list-text {
  height: 28px;
  line-height: 28px;
  font-weight: bold;
  text-align: right;
  font-size: 20px;
}

.index-centent {
  width: 100%;
  min-height: 100%;
  padding: 10px;
  box-sizing: border-box;

}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  background: #ffffff;
  width: 100%;
  margin-bottom: 18px;
}

.index-centent-title {
  width: 100%;
  height: 52px;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 15px;
  box-sizing: border-box;
  justify-content: space-between;
  font-size: 14px;
}

.index-centent-title-left {
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
  /* border-radius: 11px;
overflow: hidden; */
}

.index-centent-title-left-icon {
  width: 12px;
  height: 12px;
  font-size: 12px;
  color: #1890FF;
  padding: 5px;
  background: #E6F3FE;
  /* border-radius: 11px; */
  fill: currentColor;
  margin-right: 10px;
}

.index-centent-title-left-icontwo {
  width: 12px;
  height: 12px;
  font-size: 12px;
  color: #F371FA;
  padding: 5px;
  background: #FDF4FD;
  /* border-radius: 11px; */
  fill: currentColor;
  margin-right: 10px;
}

.index-centent-title-left-iconthree {
  width: 12px;
  height: 12px;
  font-size: 12px;
  color: #FC1D1D;
  padding: 5px;
  background: #FDF4FD;
  /* border-radius: 11px; */
  fill: currentColor;
  margin-right: 10px;
}

.index-centent-title-left-iconfour {
  width: 12px;
  height: 12px;
  font-size: 12px;
  color: #18B2FA;
  padding: 5px;
  background: #FDF4FD;
  /* border-radius: 11px; */
  fill: currentColor;
  margin-right: 10px;
}

.index-centent-title-right {
  color: #3CA0FD;
  cursor: pointer;
}

.index-centent-box {
  width: 100%;
  padding: 10px 10px 0;
  box-sizing: border-box;
}
</style>
