<template>
  <div class="button-div">
    <!-- 代码优化是将编辑和删除放在form表单下； -->
     <el-button type="primary" size="small" @click="addButton()">添加</el-button>
     <el-button type="primary" size="small" @click="editButton()">编辑</el-button>
     <el-button type="primary" size="small" @click="deleteButton()">删除</el-button>
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
      id:''
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
    eventBus.$on("getDeleteId",(id)=>{
          this.id=id;
          // alert("jianting")
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