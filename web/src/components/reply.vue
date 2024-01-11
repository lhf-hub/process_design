<template>
    <div class="ReplyInfo">
        <div class="colleague-list" v-for="item in msg" :key="item.mission_id">
            <div class="colleague-list-left">
                <img src="../assets/a.jpg" />
            </div>
            <span class="colleague-list-centent">
                <p>{{ item.mission_name }}</p>
                <p>{{ item.project_name }}</p>
            </span>
            <span class="colleague-list-right">
                <span
                    style="position:relative; top: 12px;display: flex; right:25px; gap: 8px; justify-content:center; align-items:center;"
                    v-if="item.mission_status == -1" class="reject" @click="dialogVisible = true">已拒绝</span>
                <span
                    style="position:relative; top: 12px;display: flex; right:25px; gap: 8px; justify-content:center; align-items:center;"
                    v-else-if="item.mission_status > 1" class="accept">已接受</span>
                <div v-else
                    style="position:relative; top: 12px;display: flex; gap: 8px; justify-content:center; align-items:center;">
                    <span class="accept" @click="accept(item)">接受</span>
                    <span class="reject" @click="reject(item)">拒绝</span>
                </div>
            </span>
            <el-dialog title="留言" :visible.sync="dialogVisible" width="30%">
                <span>{{ item.receiver_reply }}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>

        </div>
        <el-dialog title="回复" :visible.sync="rejectDialog" width="30%">
            <el-input type="textarea" :rows="5" placeholder="请输入回复内容" v-model="currentData.receiver_reply">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sendItem()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'Reply',
    data() {
        return {
            replyData: [
            ],
            dialogVisible: false,
            rejectDialog: false,
            currentData: {}
        }
    },
    props: {
        msg: {
            type: Array,
            default: []
        }
    },
    methods: {
        async accept(item) {
            this.$emit("acceptMission", item)
        },
        async reject(item) {
            this.currentData = item
            this.rejectDialog = true
        },
        async sendItem() {
            // console.log(this.currentData);
            this.$emit("rejectMission", this.currentData)
            this.rejectDialog = false
        }
    }

}
</script>

<style scoped>
.colleague {
    width: 100%;
    max-height: 355px;
    overflow-x: hidden;
    overflow-y: auto;
    -ms-overflow-style: none;
    overflow: '-moz-scrollbars-none';
    scrollbar-width: none;
    /*  火狐   */
}

.colleague-list {
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #dcdfe6;
    padding: 10px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
}

.colleague-list:hover {
    background: #DBFEFB;
}

.colleague-list-left,
.colleague-list-left img {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    overflow: hidden;
    /* border: 0.5px solid #ccc; */
}

.colleague-list-centent {
    flex: 1;
    padding-left: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

}

.colleague-list-centent p:nth-child(1) {
    font-size: 14px;
    font-weight: bold;
}

.colleague-list-centent p:nth-child(2) {
    font-size: 12px;
    color: #999999;
}

.colleague-list-right {
    width: 60px;
    height: 100%;
    display: flex;
    justify-content: flex-end;
}

.colleague-list-right span {
    display: inline-block;
    width: 52px;
    height: 24px;
    text-align: center;
    line-height: 26px;
    border-radius: 2px;
    border: 1px solid;
    font-size: 12px;
}

.accept {
    border-color: green;
    color: green;
    background: rgba(0, 255, 0, 0.2);
}

.reject {
    border-color: red;
    color: red;
    background: rgba(255, 0, 0, 0.2);
}
</style>
