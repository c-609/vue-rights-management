<template>
  <div>
    <el-row >
      <node-add-button></node-add-button>
      <menu-button style="float:left; margin-left:20px"></menu-button>  
    </el-row>
    <el-row >
      <el-col :span="5">
        <menu-tree></menu-tree>
      </el-col>
      <el-col :span="19">
        <menu-form></menu-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import MenuButton from "./menu/MenuButton"
import MenuTree from "./menu/MenuTree"
import NodeAddButton from "./menu/NodeAddButton"
import MenuForm from "./menu/MenuForm"
  export default {
    components:{
      MenuButton,
      MenuTree,
      NodeAddButton,
      MenuForm
    }
  };
</script>
