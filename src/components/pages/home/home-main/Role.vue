<template>
  <div>
    <basic-role-add style="float:left"  :roles="roles "></basic-role-add>
    <role-table
      :tableData="roles"
      :header="header"
      :operater="operater">
    </role-table>

  </div>
</template>

<script>

import RoleTable from './RoleTable'
import BasicRoleAdd from './../../../common/BasicRoleAdd'


export default {
  name: 'Role',
  components: {
    RoleTable,
    BasicRoleAdd,
  
  },
  data() {
    return {
       header:[   
          {label:'角色姓名' ,prop:'name'},
          {label:'角色标识' ,prop:'nameZh'},
          {lable:'操作', prop: 'operate'}
        ],
        roles:[],
        operater:['addRights'],
        addButtonType: 'role'
    }
  },
   created:function(){
      this.getRequest("/upms/role/").then((data)=>{
        this.roles=data.data.data;
         //console.log(data);
      });
    }
}
</script>

<style>

</style>