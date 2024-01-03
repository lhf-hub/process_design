<template>
  <div class="cloudVue">
    <el-table :data="FileList" border stripe  :header-cell-class-name="headerBg" @selection-change="handleSelectionChange" :size="'mini'">
    <el-table-column  label="名称" width="80" prop="name" >
      <template slot-scope="scope">
          <div  @dblclick="go(scope.row.name)" style="cursor: pointer;">{{ scope.row.name }}</div>
      </template>
    </el-table-column>
    <el-table-column  label="类型" width="100" prop="type">
      <template slot-scope="scope">
{{ scope.row.type==0?'文件夹':'文件' }}
      </template>
    </el-table-column>
    <el-table-column  label="操作" width="150px">
        <template v-slot:default="scope" >
          <el-button v-if="scope.row.type==1" type="primary" :size="'mini'" style="width: 55px;height: 27px; margin: 4px"   @click="download(scope.row.url)">下载</el-button>
        <el-button v-if="scope.row.type==1" type="danger" :size="'mini'" style="width: 55px;height: 27px; margin: 4px"   @click="assign(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import requests from '@/utils/request'
export default {
  name: 'cloudVue',
  data () {
    return {
      FileList: [],
      id: '\\projects'
    }
  },
  created () {
    this.load()
  },
  methods: {
    async load () {
      await requests.get('/cloud/getchildren', this.id).then((res) => {
        if (res.code === 200) {
          this.FileList = res.response.data
        }
      })
    },
    go (name) {
      this.id = this.id + '\\' + name
      this.load()
    },
    download (url) {
      window.open(url)
    }

  }

}
</script>

<style>

</style>
