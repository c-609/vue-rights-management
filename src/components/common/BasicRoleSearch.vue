<template>
  <div class="search-div">
    <el-row>
      <el-col :span="14">
    <el-input
      class="input"
      size="mini"
      placeholder="请输入内容"
      v-model="inputInfo">
    </el-input>
    </el-col>
    <el-col :span="6">
    <el-button 
      type="info"
      plain 
      size="mini"
    >
      搜索
    </el-button>
    </el-col>
    <el-col :span="2">
    <basic-role-add :roles="this.roles"></basic-role-add>
    </el-col>
    </el-row>
  </div>
</template>

<script>
import BasicRoleAdd from './BasicRoleAdd'
export default {
  name: 'BasicSearchBar',
  props:{
    roles:{
      type:Array
    }
  },
  data(){
    return{
       inputInfo:'',
    }
  },

  components:{
    BasicRoleAdd
  }
}
</script>

<style>
.search-div {
  float: left;
  margin-bottom: 5px
}
.input {
  width: 250px;
 }
</style>