<template>
  <div>
    <div style="display: block; align-items: center; width:100%">
      <el-button v-if="currentFolder != 'root'" style="float:left" @click="goBack">返回上一级 {{ currentFolder
      }}</el-button>

      <el-upload :before-upload="beforeUpload" action="" :data="{ folder: currentFolder }"
        :on-success="handleUploadSuccess" style="float:right">
        <el-button type="primary" icon="el-icon-upload">上传</el-button>
      </el-upload>
    </div>


    <el-table :data="formattedData" style="width: 100%" @row-dblclick="handleDblClick">
      <el-table-column prop="Type" label="" width="60">
        <template slot-scope="scope">
          <img style="width: 40px; height:40px; " src="../../../public/file1.png" v-if="scope.row.type == 1">
          <img style="width: 40px; height:40px; " src="../../../public/folder1.png" v-else>
        </template>
      </el-table-column>

      <el-table-column prop="Id" v-if="false" label="id"></el-table-column>
      <el-table-column prop="Name" label="文件名"></el-table-column>
      <el-table-column prop="ModifyDate" label="修改日期"></el-table-column>
      <el-table-column prop="Type" label="类型"></el-table-column>
      <el-table-column prop="type" label="数字类型" v-if="false"></el-table-column>
      <el-table-column prop="Size" label="大小"></el-table-column>
      <el-table-column prop="Option" label="操作">

        <template slot-scope="scope">
          <el-button v-if="scope.row.type == 1" type="primary" size="small"
            @click="handleDownload(scope.row)">下载</el-button>
          <el-button v-if="role != 'Employee'" type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import requests from '@/utils/request'

export default {
  data() {
    return {
      role: this.$store.state.user.userList.role,
      currentFolder: 'root',
      rawData: [],
      formattedData: [
      ],
      folderStack: [],
      selectedRow: null
    }
  },
  methods: {
    async handleDownload(row) {
      if (!window.confirm('确定下载此文件？')) {
        return;
      }
      console.log('Download', row);
      try {
        const response = await requests.post(`/cloud/download`, {
          id: row.Id
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          responseType: 'blob'
        });
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file'); // 'file' 应该是你的文件名
        document.body.appendChild(link);
        link.click();
      } catch (err) {
        console.error(err);
      }
    },
    async handleDelete(row) {
      if (!window.confirm('确定删除此文件？')) {
        return;
      }
      console.log('Delete', row);
      try {
        const token = localStorage.getItem('token')
        const res = await requests.post('/cloud/delete', { id: row.Id }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: "删除成功！"
          })
          this.fetchData();
        }
        else {
          this.$message({
            type: 'error',
            message: "删除失败！"
          })
        }
      } catch (err) {
        console.error(err);
      }
    },
    beforeUpload(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const arrayBuffer = event.target.result;
          const blob = new Blob([arrayBuffer], { type: file.type });
          console.log(blob);
          const formData = new FormData();
          formData.append('file', blob, file.name);
          formData.append('parent_id', this.currentFolder);
          formData.append('name', file.name);
          formData.append('path', this.currentFolder);
          formData.append('type', 1);

          console.log(formData);
          const token = localStorage.getItem('token')
          try {
            const res = await requests.post('/cloud/create', formData, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            if (this.handleUploadSuccess(res)) {
              this.$message({
                type: 'success',
                message: "上传成功！"
              })
              this.fetchData();
              resolve();
            }
            else {
              this.$message({
                type: 'error',
                message: "重复文件名！请重新上传"
              })
            }
          } catch (err) {
            this.$message({
              type: 'error',
              message: "上传失败！"
            })
          }
        }
        reader.onerror = (error) => {
          console.log(error);
        };
        reader.readAsArrayBuffer(file);
      });
    },
    bytesToSize(bytes) {
      if (bytes === 0) return '0 B';
      var k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      let i = Math.floor(Math.log(bytes) / Math.log(k));
      return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    },
    async handleDblClick(row) {
      // alert('双击' + row.type)
      if (row.type == 1) {
        await this.handleDownload(row);
        return;
      }
      this.folderStack.push(this.currentFolder);
      this.currentFolder = row.Id;
      // console.log(this.currentFolder);
      if (!(await this.fetchData())) {

        this.currentFolder = this.folderStack[this.folderStack.length - 1];
        this.folderStack.pop();
        return;
      }
    },
    handleUploadSuccess(res) {
      if (res.code === 200) {
        return true;
      } return false;
    },

    async fetchData() {
      try {
        const token = localStorage.getItem('token')
        const res = await requests.post('/cloud/getchildren', { id: this.currentFolder }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.code === 200) {
          this.rawData = res.data;
          this.formattedData = [];
          for (let i = 0; i < this.rawData.length; i++) {
            this.formattedData.push({
              Id: this.rawData[i].id,
              Name: this.rawData[i].name,
              ModifyDate: new Date(this.rawData[i].modify_date).toLocaleString(),
              Type: this.rawData[i].type == 0 ? '文件夹' : '文件',
              type: this.rawData[i].type,
              Size: this.bytesToSize(this.rawData[i].size)
            })
          }
        }
        return true;
      } catch (err) {
        console.error(err);
        this.$message({
          type: 'error',
          message: "无权访问"
        })

        return false;
      }
    },
    async goBack() {
      if (this.folderStack.length > 0) {
        this.currentFolder = this.folderStack.pop();
        await this.fetchData();
      }
    },
  },

  created() {
    this.fetchData();
  }
}
</script>