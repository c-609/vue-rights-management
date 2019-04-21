<template>
<el-popover
  placement="top"
  width="160"
  v-model="visible2">
  <p>确认删除此用户吗？</p>
  <div style="text-align: right; margin: 0">
    <el-button size="mini" type="00text" @click="visible2 = false">取消</el-button>
    <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
  </div>
  <el-button type="text" icon="el-icon-delete" slot="reference">删除</el-button>
</el-popover>
</template>
<script>
  export default {
    name: 'BasicDeleteButton',
    data() {
      return {
        visible2: false,
      };
    }
  }
</script>