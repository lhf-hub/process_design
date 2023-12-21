<template>
   <div>
    <div class="assignTasks">
    <div  style="padding: 3px 0">
    <el-input  style="width: 200px; margin: 5px" placeholder="请输入姓名" suffix-icon="el-icon-search" v-model="name" :size="'small'"></el-input>
    <el-input  style="width: 200px" placeholder="请输入职称" suffix-icon="el-icon-search" v-model="nickname" :size="'small'"></el-input>
    <el-button  style="margin-left: 5px" type="primary" :size="'small'">搜索</el-button>
    <el-button  style="margin-left: 5px" type="warning" :size="'small'">重置</el-button>
  </div>
  <div style="margin: 7px 0" >
    <el-button type="primary" :size="'small'" >新增<i class="el-icon-circle-plus-outline"></i></el-button>
    <el-popconfirm style="margin: 7px"
                   confirm-button-text='确定'
                   cancel-button-text='我再想想'
                   icon="el-icon-info"
                   icon-color="red"
                   title="确定批量删除这些数据吗？"
                   @confirm="delBatch">
      <el-button type="danger" slot="reference"  :size="'small'">批量删除<i class="el-icon-remove-outline"></i></el-button>
    </el-popconfirm>
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
    <el-table-column  label="操作" width="180px">
      <template v-slot:default="scope" >
        <!-- <el-button type="primary" style="margin: 4px" :size="'mini'"> 编辑</el-button> -->
        <el-popconfirm
            confirm-button-text='确定'
            cancel-button-text='我再想想'
            icon="el-icon-info"
            icon-color="red"
            title="确定删除吗？"
            @confirm="del(scope.row.id)"
        >
        <!-- <el-button type="danger" slot="reference" style="margin: 4px"  :size="'mini'"> 删除</el-button> -->

        </el-popconfirm>
        <el-button type="primary"  style="width: 55px;height: 27px; margin: 4px"   :size="'mini'" @click="assign(scope.row.id)"><i class="el-icon-folder-add"></i></el-button>
        <el-button type="info" style="width: 55px;height: 27px; margin: 4px"   :size="'mini'"><i class="el-icon-message"></i></el-button>

      </template>
    </el-table-column>
  </el-table>
  <div  style="padding: 10px">
    <el-pagination
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
  <el-dialog title="项目分配" :visible.sync="dialogFormVisible" width="30%">
    <el-form label-width="60px" size="small">
      <el-form-item label="姓名">
        <el-input  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="职称">
        <el-input autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="项目">
        <el-select v-model="projects" placeholder="请选择项目名">
        <el-option label="项目一" value="shanghai"></el-option>
        <el-option label="项目二" value="beijing"></el-option>
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
      projects: []
    }
  },
  methods: {
    assign () {
      this.dialogFormVisible = true
    }
  }

}
</script>

<style>

</style>
