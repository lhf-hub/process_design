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
                                <span>我参与的项目</span>
                            </div>

                        </div>
                        <div class="index-centent-box">

                            <div class="project">
                                <el-table :data="projects" border stripe height="350" :size="'mini'">
                                    <el-table-column prop="project_id" label="项目id" v-if="false">
                                    </el-table-column>
                                    <el-table-column prop="project_name" label="项目" width="120px">
                                        <template scope="scope">
                                            <el-tooltip class="item" effect="dark" placement="top-start">
                                                <div slot="content">{{ '创建时间:' + formatDate(scope.row.project_create_date)
                                                }}<br />{{
    '完成时间:' + formatDate(scope.row.project_complete_date) }}</div>
                                                <label>{{ scope.row.project_name }}</label>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="project_status" label="状态" width="80px">
                                        <template #default="scope">
                                            <span v-if="scope.row.project_status === '0'" style="color:#808080">已创建</span>
                                            <span v-else-if="scope.row.project_status === '1'"
                                                style="color:#FFA500">建模中</span>
                                            <span v-else-if="scope.row.project_status === '2'"
                                                style="color:#1E90FF">渲染中</span>
                                            <span v-else-if="scope.row.project_status === '3'"
                                                style="color:#32CD32">后期中</span>
                                            <span v-else-if="scope.row.project_status === '4'"
                                                style="color:#800080">完成</span>
                                            <span v-else-if="scope.row.project_status === '5'"
                                                style="color:#FF0000">已归档</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="project_status" label="项目进度">
                                        <template slot-scope="scope">
                                            <div @click="process(scope.row.project_id)">
                                                <el-progress
                                                    :percentage="scope.row.project_status == '5' ? 100 : scope.row.project_status * 17"
                                                    :stroke-width="10" :color="customColors"></el-progress>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="projectCreateDate" label="创建时间" width="120px">
                                    </el-table-column>
                                    <el-table-column prop="projectCompleteDate" label="完成时间" width="120px">
                                    </el-table-column>
                                    <el-table-column prop="cloud_id" label="云盘路径" width="120px">
                                    </el-table-column>
                                </el-table>
                            </div>
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
    name: 'employeeProject',
    components: {
        Reply
    },
    data() {
        return {
            circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            option: '',
            clientsList: [],
            data: [],
            projects: [
            ],
            reverse: true,
            activities: [],
            name: '',
            customColors: [
                { color: '#FFA500', percentage: 20 },
                { color: '#1E90FF', percentage: 40 },
                { color: '#32CD32', percentage: 60 },
                { color: '#800080', percentage: 70 },
                { color: '#FF0000', percentage: 100 }
            ],

        }
    },
    created() {
        this.getProjects()
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
        async getProjects() {
            const token = localStorage.getItem('token')
            await requests.post('/project/getjoined', {}, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(async res => {
                this.projects = []
                if (res.code === 200) {
                    this.projects = res.data
                    this.projects.forEach(item => {
                        item.projectCreateDate = this.formatDate(item.project_create_date)
                        item.projectCompleteDate = !item.project_complete_date ? '未完成' : this.formatDate(item.project_complete_date)
                    })
                    console.log(res);
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
        ...mapState('user', ['userList'])
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
