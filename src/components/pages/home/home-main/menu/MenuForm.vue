<template>
  <div class="menu-form">
    <el-form label-width="100px" :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="父级节点" prop="parentId">
        <el-input v-model="form.parentId" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="节点ID" prop="id">
        <el-input v-model="form.id" placeholder="请输入节点ID" :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label=标题 prop="name">
        <el-input v-model="form.name"  placeholder="请输入标题" :disabled="formEdit"></el-input>
      </el-form-item>
      <!-- <el-form-item label="类型">
        <el-select v-model="form.type" placeholder="请选择资源请求类型" :disabled="formEdit">
        <el-option>
        </el-option>
      </el-select>
      </el-form-item> -->

      <el-form-item label="前端组件" prop="component">
        <el-input v-model="form.component" placeholder="请输入描述" :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="前端地址" prop="path">
        <el-input v-model="form.path"  placeholder="嵌套地址" :disabled="formEdit"></el-input>
      </el-form-item>

      <el-form-item style="float:left" v-if="formStatus=='add'">
        <el-button type="primary" size="small">保存</el-button>
        <el-button size="small" @click="cancelButton">取消</el-button>
      </el-form-item>
      <el-form-item style="float:left" v-if="formStatus=='edit'">
        <el-button type="primary" size="small">更新</el-button>
        <el-button size="small" @click="cancelButton">取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import eventBus from "./../../../../common/eventBus.js"
export default {
  name: 'MenuForm',
  data(){
    return {
      formStatus:'',
      formEdit:true,
      form: {
          permission: undefined,
          name: undefined,
          id: undefined,
          parentId: undefined,
          icon: undefined,
          sort: undefined,
          component: undefined,
          type: undefined,
          path: undefined
        },
    }
  },
  created:function(){
    this.editButton();
    this.getRequest("/upms/menu/").then((data)=>{
      this.form=data.data.data;
      console.log(this.form)
    });
    eventBus.$on("getNodeData",(form)=>{
        this.form = form;
        console.log(this.form)
      })
  },
  methods:{
    editButton(){
      eventBus.$on("add",(formAdd,formStatus)=>{
        this.formStatus = formStatus;
        this.formEdit = formAdd;
      })
      eventBus.$on("edit",(formEdit,formStatus)=>{
        this.formEdit = formEdit;
        this.formStatus = formStatus
      })
    },
    cancelButton(){
     this.formEdit = true;
     this.formStatus = '';
    }
  }
}
</script>

<style scoped>
.menu-form{
 margin-left: 200px
}
.el-input,
.el-select{
  width:500px;
  float: left;
}
</style>