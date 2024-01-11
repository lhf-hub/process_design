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
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
          <!-- 项目 -->
          <div class="grid-content">
            <div class="index-centent-title">
              <div class="index-centent-title-left">
                <sort class="index-centent-title-left-icon" />
                我的任务
              </div>
              <div>
                <el-input style="width: 200px;" placeholder="请输入任务" suffix-icon="el-icon-search" v-model="name"
                  :size="'small'"></el-input>
                <el-button type="warning" :size="'small'" @click="reset">重置</el-button>
              </div>
            </div>
            <div class="index-centent-box">

              <div class="project">
                <el-table :data="left_filter_missions" border stripe height="350" :size="'mini'">
                  <el-table-column prop="mission_id" label="任务id" v-if="false">
                  </el-table-column>
                  <el-table-column prop="mission_name" label="任务" width="120px">
                    <template scope="scope">
                      <el-tooltip class="item" effect="dark" placement="top-start">
                        <div slot="content">{{ '创建时间:' + formatDate(scope.row.mission_create_date) }}<br />{{
                          '完成时间:' + formatDate(scope.row.mission_complete_date) }}</div>
                        <label>{{ scope.row.mission_name }}</label>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                  <el-table-column prop="mission_content" label="任务内容" width="320px">
                  </el-table-column>
                  <el-table-column prop="mission_bonus" label="任务津贴" width="80px">
                  </el-table-column>
                  <el-table-column prop="mission_status" label="状态" width="80px">
                    <template #default="scope">
                      <!-- 1:待接受 2:进行中 3:完成 -1:被退回 -->
                      <!-- <span v-if="scope.row.mission_status == 1" style="color:gray">待接受</span> -->
                      <span v-if="scope.row.mission_status == 2" style="color:rgb(0, 183, 255)">进行中</span>
                      <span v-else-if="scope.row.mission_status == 3" style="color: rgb(0, 255, 8)">已完成</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="missionCreateDate" label="创建时间" width="100px">
                  </el-table-column>
                  <el-table-column prop="missionCompleteDate" label="完成时间" width="100px">
                  </el-table-column>


                  <!-- <el-table-column prop="project_state" label="任务进度">
                    <template slot-scope="scope">
                      <div @click="process(scope.row.project_id)">
                        <el-progress :percentage="scope.row.project_state == 6 ? 100 : scope.row.project_state * 17"
                          :stroke-width="10" :color="customColors"></el-progress>
                      </div>
                    </template>
                  </el-table-column> -->
                  <el-table-column label="操作" width="80px">
                    <template v-slot:default="scope">
                      <el-popconfirm confirm-button-text='确定' cancel-button-text='我再想想' icon="el-icon-info"
                        icon-color="red" title="确定提交吗？" @confirm="sub(scope.row.mission_id)"
                        v-if="scope.row.mission_status == 2">

                        <el-button slot="reference" type="success" style="width: 55px;height: 27px;"
                          :size="'mini'">提交</el-button>
                      </el-popconfirm>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
          <div class="grid-content">
            <div class="index-centent-title">
              <div class="index-centent-title-left">
                <operating class="index-centent-title-left-iconthree" />
                消息
              </div>
            </div>
            <div class="index-centent-box">
              <reply :msg="missions" @acceptMission="acceptMission" @rejectMission="rejectMission"></reply>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import Reply from '@/components/reply.vue'
import { mapState } from 'vuex'
import requests from '@/utils/request'
export default {
  name: 'myTask',
  components: {
    Reply
  },
  data() {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      DialogVisible: false,
      form: {},
      data: [],
      missions: [

      ],
      left_missions: [],
      left_filter_missions: [],
      customColors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 70 },
        { color: '#6f7ad3', percentage: 100 }
      ],
      DialogVisible2: false,
      reverse: true,
      name: '',
    }
  },
  created() {
    this.getMissions()
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
    async getMissions() {
      const token = localStorage.getItem('token')
      await requests.post('/mission/getown', {}, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(async res => {
        this.left_missions = []
        this.left_filter_missions = []
        this.missions = []
        if (res.code === 200) {
          this.missions = res.data
          this.missions.forEach(element => {
            element.missionCreateDate = new Date(element.mission_create_date).toLocaleDateString().replace('/', '-').replace('/', '-')
            element.missionCompleteDate = element.mission_complete_date ? new Date(element.mission_complete_date).toLocaleDateString().replace('/', '-').replace('/', '-') : '未完成'
            if (Number.parseInt(element.mission_status) > 1) {
              this.left_missions.push(element)
              this.left_filter_missions.push(element)
            }
          });
          console.log(res);
        }
      })
    },

    async acceptMission(item) {
      const token = localStorage.getItem('token')
      await requests.post('/mission/accept', {
        id: item.mission_id
      }, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(async res => {
        if (res.code == 200) {
          this.$message({
            message: '接受成功',
            type: 'success'
          })
          this.getMissions()
        } else {
          this.$message({
            message: '接受失败',
            type: 'error'
          })
        }
      })
    },

    async rejectMission(item) {
      const token = localStorage.getItem('token')
      await requests.post('/mission/refuse', {
        id: item.mission_id,
        receiver_reply: item.receiver_reply
      }, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(async res => {
        if (res.code == 200) {
          this.$message({
            message: '拒绝成功',
            type: 'success'
          })
          this.getMissions()
        } else {
          this.$message({
            message: '拒绝失败',
            type: 'error'
          })
        }
      })
    },

    async reset() {
      this.name = ''
      this.getMissions()
    },

    async sub(mission_id) {
      const token = localStorage.getItem('token')
      await requests.post('/mission/complete', {
        id: mission_id
      }, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(async res => {
        if (res.code == 200) {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.getMissions()
        } else {
          this.$message({
            message: '提交失败',
            type: 'error'
          })
        }
      })
    }
  },

  computed: {
    ...mapState('user', ['userList']),
  },
  watch: {
    name() {
      if (this.name === '') {
        this.left_filter_missions = this.left_missions
        return
      }
      const regex = new RegExp(this.name.split('').join('.*'), 'i')
      const filter = this.left_missions.filter(item => {
        return regex.test(item.mission_name)
      })
      this.left_filter_missions = filter
    }
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
