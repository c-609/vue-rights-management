<template>
  <div>
    <el-button 
      class="el-icon-plus" 
      size="mini" 
      type="primary" 
      style="float:left; margin-top: 10px; margin-bottom: 20px" 
      @click="addMenu()"
      >
        添加顶级节点
      </el-button></div>
</template>

<script>

import eventBus from "./../../../../common/eventBus.js"
export default {
  name: 'NodeAddButton',
 
    methods: {
      addMenu(){
        eventBus.$emit("addMenuNode",false,'add','-1')
    },
    },
}
</script>

<style>

</style>