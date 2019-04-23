<template>
  <div>
    <el-row >
      <menu-button style="float:left"></menu-button>  
    </el-row>
    <el-row >
      <el-col :span="4">
        <menu-tree></menu-tree>
        <node-add-button></node-add-button>
      </el-col>
      <el-col :span="20">
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
