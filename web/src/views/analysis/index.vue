<template>
<el-row :gutter="15">
  <el-col :span="14">
    <el-card class="box-card">
        <div id="main"></div>
    </el-card>

</el-col>
  <el-col :span="10">
    <el-card class="box-card" >
        <div id="evaluation"></div>
    </el-card>
</el-col>
</el-row>
</template>

<script>
import requests from '@/utils/request'
import * as echarts from 'echarts'
export default {
  name: 'workAnalysis',
  data () {
    return {
      employeeData: []
    }
  },
  async created () {
    this.employeeData = await requests.get(`/employee?department_id=${this.userList.department_id}`)
  },
  mounted () {
    const chartDom = document.getElementById('main')
    const myChart = echarts.init(chartDom, null, {
      width: 600,
      height: 400
    })
    // 绘制图表
    myChart.setOption({
      title: {
        text: '员工工作量'
      },
      tooltip: {},
      xAxis: {
        data: ['员工一', '员工二', '员工三', '员工四', '员工五', '员工六']
      },
      yAxis: {},
      series: [
        {
          name: '项目量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    })
    const chartDom2 = document.getElementById('evaluation')
    const myChart2 = echarts.init(chartDom2, null, {
      width: 400,
      height: 400
    })
    myChart2.setOption(
      {
        title: {
          text: '员工绩效'
        },
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 335,
                name: '直接访问'
              },
              {
                value: 234,
                name: '联盟广告'
              },
              {
                value: 1548,
                name: '搜索引擎'
              }
            ]
          }
        ]
      }
    )
  }

}
</script>

<style>
#main{
    border:  1px solid #E6E6E6;
}
#evaluation{
    border:  1px solid #E6E6E6;
}
.el-card__body{
    padding: 10px;
}
</style>
