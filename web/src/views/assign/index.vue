<template>
   <div>
    <div class="assignTasks">
    <div  style="padding: 3px 0">
    <el-input  style="width: 200px; margin: 5px" placeholder="请输入姓名" suffix-icon="el-icon-search" v-model="name" :size="'small'"></el-input>
    <el-input  style="width: 200px" placeholder="请输入职称" suffix-icon="el-icon-search" v-model="nickname" :size="'small'"></el-input>
    <el-button  style="margin-left: 5px" type="primary" :size="'small'">搜索</el-button>
    <el-button  style="margin-left: 5px" type="warning" :size="'small'">重置</el-button>
  </div>

  <el-table :data="workersData" border stripe  :header-cell-class-name="headerBg" @selection-change="handleSelectionChange" :size="'mini'">
    <el-table-column  label="工号" width="80" prop="id" >
    </el-table-column>
    <el-table-column  label="姓名" width="100" prop="name">
      <template slot-scope="scope">
<el-tag>{{ scope.row.name }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column  label="职称" width="120" prop="title">
    </el-table-column>
    <el-table-column  label="当前项目" width="120" prop="project">
    </el-table-column>
    <el-table-column  label="电话" prop="phone">
    </el-table-column>
    <el-table-column  label="邮箱" prop="email" >
    </el-table-column>
    <el-table-column  label="操作" width="100px">
      <template v-slot:default="scope" >
        <el-button type="primary"  style="width: 55px;height: 27px; margin: 4px"   :size="'mini'" @click="assign(scope.row)"><i class="el-icon-folder-add"></i></el-button>

      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="项目分配" :visible.sync="dialogFormVisible" width="30%">
    <el-form label-width="60px" size="small">
      <el-form-item label="姓名" >
        <el-input  autocomplete="off" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="职称">
        <el-input autocomplete="off"  v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="项目">
        <el-select v-model="option" placeholder="请选择" style="margin: 10px;"  :size="'small'">
      <el-option
        v-for="item in projects"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button >取 消</el-button>
      <el-button type="primary"   >确 定</el-button>
    </div>
  </el-dialog>

</div>
  </div>
</template>

<script>
export default {
  name: 'assignTasks',
  data () {
    return {
      workersData: [
        { id: 1992, name: 'uuu', title: '熟手', project: 'eywiw', phone: 129077920, email: '829999@qq.com' },
        { id: 1992, name: 'uuu', title: '熟手', project: 'eywiw', phone: 129077920, email: '829999@qq.com' },
        { id: 1992, name: 'uuu', title: '熟手', project: 'eywiw', phone: 129077920, email: '829999@qq.com' },
        { id: 1992, name: 'uuu', title: '熟手', project: 'eywiw', phone: 129077920, email: '829999@qq.com' }
      ],
      dialogFormVisible: false,
      projects: [{ id: 1, name: '项目一' }, { id: 2, name: '项目二' }, { id: 3, name: '项目三' }],
      option: '',
      form: {}
    }
  },
  methods: {
    assign (row) {
      this.form = row

      this.dialogFormVisible = true
    }
  }

}
</script>

<style>

</style>
