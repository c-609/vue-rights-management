<template>
  <div>
    <el-tree 
      node-key="id"
      :data="menuData" 
      :props="menuProps" 
      @node-click="getNodeData"
      >
    </el-tree>
  </div>
</template>

<script>
import eventBus from "./../../../../common/eventBus.js"
export default {
  name: 'MenuTree',
  data() {
      return {
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
        allMenu:[],
        menuData:[],
        menuProps:{
          label: 'name',
          children: 'children'
        },
      };
    },
    methods: {
     getNodeData(data) {
        var id = data.id;
        for(var i=0;i<this.allMenu.length;i++){
          if(this.allMenu[i].id==id){
            this.form = this.allMenu[i];
            //console.log(this.allMenu[i])
            break;
          }
        }
        eventBus.$emit("getNodeData",this.form)
        eventBus.$emit("getDeleteId",this.form.id);
      },
    },
    created:function(){
      this.getRequest("/upms/menu/tree").then(res=>{
          this.menuData = res.data.data;
        })
      this.getRequest("/upms/menu/list").then(response => {
          this.allMenu = response.data.data;      
          console.log(this.allMenu)
        })
    }
}
</script>

<style>

</style>