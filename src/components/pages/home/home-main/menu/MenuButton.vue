<template>
  <div class="button-div">
    <!-- 代码优化是将编辑和删除放在form表单下； -->
     <!-- <el-button type="primary" size="small" @click="addBrotherButton()" icon="el-icon-plus">同级节点</el-button> -->
     <el-button type="primary" size="mini" @click="addChildButton()" icon="el-icon-plus" :disabled="disabled">子节点</el-button>
     <!-- <el-button type="primary" size="small" @click="editButton()">编辑</el-button>
     <el-button type="primary" size="small" @click="deleteButton()">删除</el-button> -->
  </div>
</template>

<script>
import eventBus from "./../../../../common/eventBus.js"
export default {
  name: 'MenuButton',
  inject:['reload'],
  data(){
    return{
      formEdit:false,
      formAdd:false,
      id:'',
      disabled: true
      // formStatus: ''
    }
  },
  methods:{
    addChildButton(){
      eventBus.$emit("add",this.formAdd,'add')
    },
    // editButton(){
    //   eventBus.$emit("edit",this.formEdit,'edit')
    // },
    deleteButton() {
          var _this = this;
          
          this.$confirm('确定删除?', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            _this.postRequest('/upms/menu/delete',
              {"mid":_this.id}
            ).then((res)=>{
              console.log(res);
              this.reload();
            });
          }).catch(() => {
            _this.$message({
              type: 'info',
              message: '取消'
            });
          });
          
      },
  },
  created:function(){
    eventBus.$on("nodeClick",(i)=>{
          this.disabled = false;
    })
  }
}
</script>

<style scope>
.button-div {
  margin-top: 10px;
  margin-bottom: 20px
}
</style>