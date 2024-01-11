<template>
  <div>
    <div style="margin: 10px;">
      <el-date-picker v-model="monthStart" type="month" placeholder="选择月" :size="'small'" value-format="yyyy-M-dd"
        @change="getList" style="margin: 10px;">
      </el-date-picker>
      <el-date-picker v-model="monthEnd" type="month" placeholder="选择月" :size="'small'" value-format="yyyy-M-dd"
        @change="getList">
      </el-date-picker>
    </div>
    <el-card class="box-card">
      <div id="main"></div>
      <label style="margin: 20px;">总计项目量:{{ totalproject }}</label>
      <label style="margin: 20px;">总计营业额:{{ totalPrice }}</label>
    </el-card>

  </div>
</template>

<script>
import * as echarts from 'echarts'
import requests from '@/utils/request'
export default {
  name: 'RevenueVue',
  data() {
    return {
      workData: [],
      monthEnd: '',
      monthStart: '',
      workNum: [0, 0, 0, 0, 0, 0],
      totalproject: 0,
      totalPrice: 0

    }
  },
  computed: {

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
        text: '项目量'
      },
      tooltip: {},
      xAxis: {
        data: ['创建', '建模中', '渲染中', '后期中', '已完成', '已归档']
      },
      yAxis: {},
      series: [
        {
          name: '项目量',
          type: 'bar',
          data: this.workNum
        }
      ]
    })
  },
  async created() {

  },
  methods: {
    update() {
      this.totalproject = this.workData.length
      this.totalPrice = this.workData.reduce((sum, item) => sum + item.project_quotation, 0)
    },
    async getList() {
      if (this.monthStart !== '' && this.monthEnd !== '') {
        const token = localStorage.getItem('token')
        await requests.post('/project/getall', {}, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then((res) => {
          if (res.code === 200) {
            this.workData = []
            for (let i = 0; i < res.data.length; i++) {
              let projectCreateDate = new Date(res.data[i].project_create_date);
              let projectCompleteDate = new Date(res.data[i].project_complete_date);
              let monthStart = new Date(this.monthStart);
              let monthEnd = new Date(this.monthEnd);
              if (projectCreateDate >= monthStart && projectCompleteDate <= monthEnd) {
                this.workData.push(res.data[i]);
              }
              // if (((parseInt(res.data[i].project_create_date.substring(0, 4))) >= (parseInt(this.monthStart.substring(0, 4)))) && ((parseInt(res.data[i].project_create_date.substring(5, 7))) >= (parseInt(this.monthStart[5]))) &&
              //   ((parseInt(res.data[i].project_complete_date?.substring(0, 4))) <= (parseInt(this.monthEnd.substring(0, 4)))) && ((parseInt(res.data[i].project_complete_date?.substring(5, 7))) <= (parseInt(this.monthEnd[5])))
              // ) {
              //   this.workData.push(res.data[i])
              // }
            }
            console.log(this.workData)
          }
          this.workNum = [0, 0, 0, 0, 0, 0]
          for (let i = 0; i < this.workData.length; i++) {
            if (this.workData[i].project_status === '0') {
              this.workNum[0]++
            } else if (this.workData[i].project_status === '1') {
              this.workNum[1]++
            } else if (this.workData[i].project_status === '2') {
              this.workNum[2]++
            } else if (this.workData[i].project_status === '3') {
              this.workNum[3]++
            } else if (this.workData[i].project_status === '4') {
              this.workNum[4]++
            } else if (this.workData[i].project_status === '5') {
              this.workNum[5]++
            }
          }
          console.log(this.workNum)
          this.update()
        })
        this.myChart.setOption({
          series: [
            {
              data: this.workNum
            }
          ]
        })
      }
    }

  },
  // watch: {
  //   monthEnd(newval, oldval) {
  //     console.log("aaaaaaaaaaaaaaaaaaaaaaa" + oldval);
  //     let year = parseInt(newval.substring(0, 4))
  //     let month = parseInt(newval.substring(5, 7))
  //     this.monthEnd = year + '-' + (month + 1) + '-01'
  //     console.log("asdasdsadsdadas" + this.monthEnd)
  //   }
  // }
}
</script>

<style></style>
