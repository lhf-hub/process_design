<template>
  <el-row :gutter="15">
    <div style="margin: 10px;">
      <el-select v-model="option" :disabled="IsVisible" :size="'mini'" style="margin: 7px;"
        @change="getList(option, monthStart)">
        <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-date-picker v-model="monthStart" type="month" placeholder="选择月" :size="'mini'" value-format="yyyy-M"
        @change="getList(option, monthStart)" style="margin: 7px;">
      </el-date-picker>

    </div>
    <el-col :span="14">
      <el-card class="box-card">
        <div id="main"></div>
      </el-card>
    </el-col>
    <el-col :span="10">
      <el-card class="box-card">
        <div id="evaluation"></div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import requests from '@/utils/request'
import * as echarts from 'echarts'
import { mapState } from 'vuex'
export default {
  name: 'workAnalysis',
  data() {
    return {
      analysisData: [],
      option: '',
      IsVisible: false,
      nameData: [], // 员工姓名
      workData: [], // 员工工作量
      salaryData: [], // 员工绩效
      monthStart: '',
      month: '',
      data: []

    }
  },
  computed: {
    ...mapState('user', ['userList']),
    ...mapState('department', ['departmentList'])
  },
  async created() {
    this.getDepartments()
    this.identify()
  },
  mounted() {
    const chartDom = document.getElementById('main')
    this.myChart = echarts.init(chartDom, null, {
      width: 600,
      height: 400
    })
    // 绘制图表
    this.myChart.setOption({
      title: {
        text: '员工工作量'
      },
      tooltip: {},
      xAxis: {
        data: this.nameData
      },
      yAxis: {},
      series: [
        {
          name: '任务量',
          type: 'bar',
          data: this.workData
        }
      ]
    })
    const chartDom2 = document.getElementById('evaluation')
    this.myChart2 = echarts.init(chartDom2, null, {
      width: 400,
      height: 400
    })
    this.myChart2.setOption(
      {
        title: {
          text: '员工绩效'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [{
          name: '员工绩效',
          type: 'pie',
          radius: '50%', // 半径
          data: this.salaryData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
        ]
      }
    )
  },
  methods: {
    getDepartments() {
      this.$store.dispatch('department/getList')
    },
    identify() {
      const { role } = this.userList
      this.IsVisible = (role !== 'Boss')
      if (this.IsVisible) {
        this.option = this.userList.department_id
      }
    },

    // 获取员工工作量 employee_name  work
    async getList(option, monthStart) {
      if (option !== '' && monthStart !== '') {
        if (this.userList.role === 'Supervisor') {
          // 根据主管id获取 员工工作量
          // analysisData含有 员工名(employee_name) 员工工作量(work) 日期(date 2024-9-12) (查看 员工各个月的工作量)
          const token = localStorage.getItem('token')
          await requests.post('/analysis/getAllwork', { employee_id: this.userList.employee_id }, {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }).then((res) => {
            if (res.code === 200) {
              this.analysisData = res.data
            }
          })
        } else {
          // 根据部门id获取 员工工作量
          const token = localStorage.getItem('token')
          await requests.post('/analysis/getDepartmentSalary', { department_id: this.option }, {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }).then((res) => {
            if (res.code === 200) {
              this.analysisData = res.data
            }
          })
        }
        console.log(this.analysisData)
        this.nameData = []
        this.workData = []
        for (let i = 0; i < this.analysisData.length; i++) {
          if (this.analysisData[i].month === (parseInt(this.monthStart[5])) && this.analysisData[i].year === (parseInt(this.monthStart.substring(0, 5)))) {
            this.nameData.push(this.analysisData[i].employee_name)
            this.workData.push(this.analysisData[i].mission_count)
          }
        }
        this.myChart.setOption({
          xAxis: {
            data: this.nameData
          },
          series: [
            {
              data: this.workData
            }
          ]
        })
        this.getSalary(option, monthStart)
      }

    },
    async getSalary(option, month) {
      if (option !== '' && month !== '') {
        if (this.userList.role === 'Supervisor') {

          const token = localStorage.getItem('token')
          // 根据主管id获取 员工绩效
          // 含有 员工名(employee_name) 员工绩效(salary) 年(year) 月(month) (查看 员工各个月的绩效)
          await requests.post('/analysis/getAllsalary', { employee_id: this.userList.employee_id }, {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }).then((res) => {
            if (res.code === 200) {
              this.data = res.data
            }
          })
        } else {
          // 根据部门id 获取某个部门的员工绩效
          //  含有 员工名(employee_name) 员工绩效(salary)  年(year) 月(month) (查看 员工各个月的绩效)
          const token = localStorage.getItem('token')
          await requests.post('/analysis/getDepartmentSalary', { department_id: this.option }, {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }).then((res) => {
            if (res.code === 200) {
              this.data = res.data
            }
          })
        }
        this.salaryData = []
        for (let i = 0; i < this.data.length; i++) {
          if ((this.data[i].month === (parseInt(month[5]))) && (this.data[i].year === (parseInt(month.substring(0, 5))))) {
            const employeeName = this.data[i].employee_name
            const salary = this.data[i].salary
            this.salaryData.push({ value: salary, name: employeeName })
          }
        }
        console.log(this.salaryData)
        console.log(this.salaryData)
        // 更新图表  不用改变的不用再写
        this.myChart2.setOption({
          series: [
            {
              type: 'pie',
              data: this.salaryData
            }
          ]
        })
      }
    }
  }
}

</script>

<style>
#main {
  border: 1px solid #E6E6E6;
}

#evaluation {
  border: 1px solid #E6E6E6;
}

.el-card__body {
  padding: 10px;
}
</style>
