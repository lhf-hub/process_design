<template>
  <div class="project">
    <el-table :data="projectsData" border stripe   height="350" :header-cell-class-name="headerBg" @selection-change="handleSelectionChange" :size="'mini'">

<el-table-column prop="name" label="项目名" width="100px">
</el-table-column>
<el-table-column prop="client" label="客户" >
    <template slot-scope="scope">
        <el-tag type="success">{{ scope.row.client }}</el-tag>
    </template>
    <el-tag type="success">标签二</el-tag>
</el-table-column>
<el-table-column  label="联系方式" >
<el-table-column prop="email" label="邮箱" >
</el-table-column>
<el-table-column prop="phone" label="电话" >
</el-table-column>
</el-table-column>
<el-table-column
    prop="state"
    label="状态">
    <template scope="scope">
        <span v-if="scope.row.state==='进行中'" style="color:#d68409" >进行中</span>
        <span v-else-if="scope.row.state==='已完成'"  style="color:gray">已完成</span>
        <span v-else-if="scope.row.state==='未开始'"  style="color: red">未开始</span>
    </template>
</el-table-column>
<el-table-column prop="progress" label="项目进度" >
    <template slot-scope="scope">
                 <el-progress
                   type="circle"
                   :width="40"
                   :percentage="scope.row.progress"
                   :color="blue"
                 ></el-progress>
    </template>
</el-table-column>
<el-table-column  label="操作" width="80x">
  <template v-slot:default="scope" >

    <el-popconfirm
        confirm-button-text='确定'
        cancel-button-text='我再想想'
        icon="el-icon-info"
        icon-color="red"
        title="确定删除吗？"
        @confirm="del(scope.row.id)"
    >

    </el-popconfirm>

    <el-button type="info" style="width: 55px;height: 27px;"  :size="'mini'"><i class="el-icon-message"></i></el-button>
  </template>
</el-table-column>
</el-table>
  </div>
</template>

<script>
export default {
  name: 'projectView',
  data () {
    return {
      projectsData: [
        { name: 'aaa', client: 'iio', email: '7777@qq.com', phone: 11111111, state: '进行中', progress: 40 },
        { name: 'aaa', client: 'iio', email: '7777@qq.com', phone: 11111111, state: '进行中', progress: 30 },
        { name: 'aaa', client: 'iio', email: '7777@qq.com', phone: 11111111, state: '未开始', progress: 0 },
        { name: 'aaa', client: 'iio', email: '7777@qq.com', phone: 11111111, state: '进行中', progress: 80 },
        { name: 'aaa', client: 'iio', email: '7777@qq.com', phone: 11111111, state: '已完成', progress: 100 }

      ]
    }
  }

}
</script>

<style>

</style>
