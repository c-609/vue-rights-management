<template>
<div>
  <div>
    <el-tree 
      node-key="id"
      highlight-current
      v-if="isLoadingTree"
      :data="menuData" 
      :props="menuProps" 
      @node-click="getNodeData"
      :render-content="renderContent"
      >  
    </el-tree>
  </div>
</div>
</template>

<script>
import eventBus from "./../../../../common/eventBus.js"
import NodeOperate from "./NodeOperate"
export default {
  name: 'MenuTree',
  components:'NodeOperate',
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
          path: undefined,
        },
        allMenu:[],
        menuData:[{status:false}],
        menuProps:{
          label: 'name',
          children: 'children'
        },
        isLoadingTree: false,//是否加载节点树
      };
    },
    mounted(){
      this.initExpand()
    },
    methods: {
      initExpand(){
        this.isLoadingTree = true;
      },
     getNodeData(data) {
        data.status = true
        var id = data.id;
        for(var i=0;i<this.allMenu.length;i++){
          this.getRequest("/upms/menu/list").then(response => {
          this.allMenu = response.data.data;      
        })
          if(this.allMenu[i].id==id){
            this.form = this.allMenu[i];
            break;
          }
        }
        eventBus.$emit("getNodeData",this.form);
        eventBus.$emit("nodeClick");
        // eventBus.$emit("isClickNode",'true');0k
      },
      
      renderContent(h,{data}){
        let  _this = this;
        return h(NodeOperate,{
          props:{
            DATA:data,
            // NODE:node,
            // STORE:store,
          },
          // on:{
          //   // nodeAdd: ((s,d,n)=>_this.handleAdd(s,d,n)),
          //   nodeEdit: ((d)=>_this.handleEdit(d)),
          //   nodeDel: ((d)=>_this.handleDelete(d)),
          // }
        })
      }

    },
   
    created:function(){
      this.getRequest("/upms/menu/tree").then(res=>{
          this.menuData = res.data.data;
        })
      this.getRequest("/upms/menu/list").then(response => {
          this.allMenu = response.data.data;      
          // console.log(this.allMenu)
        })
    }
}
</script>

<style>
/* .el-tree-node__content:hover .tree-btn,鼠标悬浮出现tree-btn */
.is-current>.el-tree-node__content .tree-btn{
  display:inline-block;
}
.is-current>.el-tree-node__content .tree-label{
  font-weight:600;
  white-space:normal;
}
</style>