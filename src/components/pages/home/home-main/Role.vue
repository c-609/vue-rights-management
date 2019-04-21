<template>
  <div>
    <basic-role-search :addButtonType="addButtonType" :roles="roles"></basic-role-search>
    <role-table
      :tableData="roles"
      :header="header"
      :operater="operater">
    </role-table>

  </div>
</template>

<script>

import RoleTable from './RoleTable'
import BasicRoleSearch from './../../../common/BasicRoleSearch'


export default {
  name: 'Role',
  components: {
    RoleTable,
    BasicRoleSearch,
  
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