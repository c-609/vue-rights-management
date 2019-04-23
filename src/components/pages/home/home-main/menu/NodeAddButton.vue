<template>
  <div><el-button size="mini" type="text" style="float:left; margin-left:8px" @click="addMenu()">+添加</el-button></div>
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