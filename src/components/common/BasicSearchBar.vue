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
    <el-col :span="4">
    <basic-user-add :users="this.users" :roles="this.roles" ></basic-user-add>
    </el-col>
    </el-row>
  </div>
</template>

<script>
import BasicUserAdd from './BasicUserAdd'
export default {
props:{
  users:{type:Array},
  roles:{type:Array}
 
},

  name: 'BasicSearchBar',
  data(){
    return{
       inputInfo:'',
    }
  },
  methods:{

  },
  components:{
    BasicUserAdd
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