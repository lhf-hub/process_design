

<template>
  <div class="monitor">
    <el-select v-model="selectedDepartment" placeholder="请选择部门" :disabled="user.role != 'Boss'"
      style="margin-right: 20px;">
      <el-option v-for="item in departments" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
    </el-select>
    <el-select v-model="selectedEmployee" placeholder="请选择员工" style="margin-right: 20px;">
      <el-option v-for="item in employees" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
    </el-select>

    <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期"
      end-placeholder="结束日期" style="width: 40%; margin-right: 20px;">
    </el-date-picker>

    <el-button type="primary" @click="reset" style="margin-right: 20px;">重置</el-button>

    <div class="image-list">
      <div class="image-item" v-for="image in images" :key="image.id" @click="selectedImage = image">
        <img class="image" :src="'data:image/png;base64,' + image.base64">
        <div class="image-time">{{ image.id }}</div>
      </div>
    </div>
    <!-- 模态对话框 -->
    <div v-if="selectedImage" class="modal" @click="selectedImage = null">
      <img class="modal-image" :src="'data:image/png;base64,' + selectedImage.base64"
        :style="{ transform: `scale(${selectedImageScale})` }" @wheel="onWheel" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'monitorVue',
  data() {
    return {
      user: {},
      selectedImage: null,
      selectedImageScale: 1,
      selectedEmployee: "",
      selectedDepartment: "",
      dateRange: [],
      preData: [],
      employees: [
      ],
      images: [
      ],
      departments: [
      ],
    };
  },
  computed: {
    calDateRange() {
      return this.dateRange.flatMap(date => {
        let d = new Date(date);
        let year = d.getFullYear();
        let month = d.getMonth() + 1; // JavaScript 的月份是从 0 开始的，所以我们需要加 1
        let day = d.getDate();
        return [year, month, day];
      });
    },
  },
  watch: {
    async selectedDepartment(newVal) {
      this.employees = [];
      this.selectedEmployee = null;
      this.preData.forEach(i => {
        if (i.department_id == newVal) {
          this.employees.push(i)
        }
      })
    },
    selectedEmployee(newVal) {
      console.log(this.selectedEmployee)
      this.fetchImages();
    },
    calDateRange(newVal) {
      this.fetchImages();
      // console.log(newVal)
    },
  },
  async created() {
    this.user = this.$store.state.user.userList;
    if (this.user.role == 'Supervisor') {
      this.selectedDepartment = this.user.department_id;
    }
    await this.getEmployees();
  },
  methods: {
    reset() {
      if (this.user.role == 'Boss') {
        this.selectedDepartment = null;
      }
      this.selectedEmployee = null;
      this.dateRange = [];
      this.images = [];
    },
    onWheel(event) {
      if (event.deltaY < 0) {
        this.selectedImageScale += 0.1;
      } else {
        this.selectedImageScale -= 0.1;
      }
    },
    async getEmployees() {
      this.departments = [];
      this.employees = [];
      this.preData = [];
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/employee/getDepartmentEmployee', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      for (let i = 0; i < res.data.data.length; i++) {
        this.departments.push(res.data.data[i])
        for (let j = 0; j < res.data.data[i].supervisor.length; j++) {
          for (let k = 0; k < res.data.data[i].supervisor[j].employee.length; k++) {
            this.preData.push(res.data.data[i].supervisor[j].employee[k])
          }
        }
      }

      console.log(this.preData);
      if (this.user.role == 'Boss') {
        this.employees = this.preData;
      } else if (this.user.role == 'Supervisor') {
        this.preData.forEach(i => {
          if (i.supervisor_id == this.user.employee_id && i.id != this.user.employee_id) {
            this.employees.push(i)
          }
        })
      } else {
        this.$router.push('/login');
      }

    },
    fetchImages() {
      if (!this.selectedEmployee || !this.dateRange || this.dateRange.length != 2) {
        return;
      }

      try {
        axios.post('http://localhost:7214/Monitor/query', {
          employee_id: this.selectedEmployee,
          dateRange: this.calDateRange,
        }).then(response => {
          // console.log(response)
          this.images = response.data.data;
          if (response.data.length === 0) {
            this.$message({
              message: '该员工在该时间段内没有图片',
              type: 'warning'
            })
          }
          else {
            this.$message({
              message: '查询成功',
              type: 'success'
            })

          }
        });
      }
      catch (err) {
        console.log(err)
      }
    }
  },
};
</script>                                                                                                             


<style scoped>
.image-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
}

.image-item {
  position: relative;
  width: 300px;
  height: 200px;
  padding: 10px;
  background-color: #e4e7e6;
  box-shadow: 0 2px 4px rgba(154, 31, 31, 0.5);
}

.image {

  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);

  width: 92%;
  height: 80%;
  display: block;
  object-fit: fill;
  margin: 0;
}

.image-time {
  color: #180f9b;
  font-size: 14px;
  font-style: italic;
  font-family: 'Times New Roman', Times, serif;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}
</style>