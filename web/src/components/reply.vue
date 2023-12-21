<template>
<div class="ReplyInfo">
    <div class="colleague-list" v-for="item in replyData" :key="item.id" >
            <div class="colleague-list-left">
                <img src="../assets/a.jpg" />
            </div>
            <span class="colleague-list-centent">
                <p>{{item.name}}</p>
                <p>{{item.project}}</p>
            </span>
            <span class="colleague-list-right">
                <span v-if="item.state=='拒绝'" class="reject" @click="dialogVisible = true">已拒绝</span>
                <span v-else class="accept">已接受</span>
            </span>
<el-dialog
  title="理由"
  :visible.sync="dialogVisible"
  width="30%">
  <span>{{ item.reason }}</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
</div>

</div>
</template>

<script>
export default {
  name: 'ReplyInfo',
  data () {
    return {
      replyData: [
        { id: 1, name: 'uuu', project: '项目一', state: '拒绝', reason: '请假' },
        { id: 1, name: 'ccc', project: '项目一', state: '接受', reason: '请假' },
        { id: 1, name: 'aaa', project: '项目一', state: '接受', reason: '请假' },
        { id: 1, name: 'www', project: '项目一', state: '拒绝', reason: '请假' }
      ],
      dialogVisible: false
    }
  },
  methods: {

  }

}
</script>

<style scoped>
.colleague{
    width: 100%;
    max-height: 355px;
    overflow-x: hidden;
    overflow-y: auto;
    -ms-overflow-style: none;
    overflow: '-moz-scrollbars-none';
    scrollbar-width: none;  /*  火狐   */
}
.colleague::-webkit-scrollbar {
    display: none;  /*  Chrome  */
    width: 0 !important ; /*  Chrome  */
}
.colleague .colleague-list:nth-last-child(1){
    border-color: transparent;
}
.colleague-list{
    width: 100%;
    height: 71px;
    border-bottom: 1px solid #dcdfe6;
    padding: 10px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
}
.colleague-list:hover{
    background: #DBFEFB;
}
.colleague-list-left,.colleague-list-left img{
    width: 50px;
    height: 50px;
    border-radius: 10px;
    overflow: hidden;
    /* border: 0.5px solid #ccc; */
}
.colleague-list-centent{
    flex: 1;
    padding-left: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction:column;
    justify-content: space-around;

}
.colleague-list-centent p:nth-child(1){
    font-size: 14px;
    font-weight: bold;
}
.colleague-list-centent p:nth-child(2){
    font-size: 12px;
    color: #999999;
}
.colleague-list-right{
    width: 100px;
    height: 50px;
    padding-top: 13px;
    display: flex;
    justify-content: flex-end;
}
.colleague-list-right span{
    display: inline-block;
    width: 52px;
    height: 24px;
    text-align: center;
    line-height: 26px;
    border-radius: 2px;
    border: 1px solid;
    font-size: 12px;
}
.accept{
    border-color: #0D9AFF;
    color: #0D9AFF;
    background: #DEEFFB;
}
.reject{
    border-color: #FD41F0;
    color: #FD41F0;
    background: #FEEDFD;
}
</style>
