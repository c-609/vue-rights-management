<template>
  <div class="button-div">
     <el-button type="primary" size="small" @click="addButton()">添加</el-button>
     <el-button type="primary" size="small" @click="editButton()">编辑</el-button>
     <el-button type="primary" size="small" @click="deleteButon()">删除</el-button>
  </div>
</template>

<script>
import eventBus from "./../../../../common/eventBus.js"
export default {
  name: 'MenuButton',
  data(){
    return{
      formEdit:false,
      formAdd:false,
      // formStatus: ''
    }
  },
  methods:{
    addButton(){
      eventBus.$emit("add",this.formAdd,'add')
    },
    editButton(){
      eventBus.$emit("edit",this.formEdit,'edit')
    },
  }
}
</script>

<style scope>
.button-div {
  margin-top: 10px;
  margin-bottom: 20px
}
</style>