<template>
  <div>
    <basic-user-add style="float:left" :roles="roles" :users="users"></basic-user-add>
    <basic-table 
      :tableData="users"
      :header="header"
      :operater="operater">
    </basic-table>
    
  </div>
</template>

<script>
import BasicTable from './../../../common/BasicTable'
import BasicUserAdd from './../../../common/BasicUserAdd'

export default {
  name: 'User',
  components: {
    BasicTable,
    BasicUserAdd,
    
  },
  
  data() {
    return {
      
       header:[
        //  o:表示单个数值  1：表示多个数值 数组
         {label:'账号' ,prop:'username',width:'200px',type:0},
          {label:'角色' ,prop:'roles',width:'800px',type:1},
          {label: '操作', prop:'operate',width:'200px',fixed:'right'}
        ],
        users:[],
        roles:[],
        operater:['edit']
    }
  },
  methods:{
     
  },
   mounted:function(){
      this.getRequest("/upms/user/").then((data)=>{
        this.users=data.data.data;
       // console.log(data);
      
      });
      this.getRequest("/config/allroles").then((data)=>{
        this.roles=data.data.data;
       // console.log(data);
      
      });

    },
    //   updated:function(){
    //    // alert(11111);
    //     this.getRequest("/upms/user/").then((data)=>{
    //     this.users=data.data.data;
    //   //alert("组件更新，此方法执行后，页面显示");
    //    });
    //  }
}
</script>

<style>

</style>