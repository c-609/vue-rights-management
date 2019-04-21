<template>
  <div >
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple title">权限管理系统</div></el-col>
      <el-col :span="12" >
        <el-dropdown class="personnal" @command="handleCommand">
          <span class="el-dropdown-link">
            {{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    name: 'HomeHeader',
    data(){
      return {
        user:[]
      }
    },
    methods: {
      handleCommand(command){
        var _this = this;
        if (command == 'logout') {
          this.$confirm('注销登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.getRequest("/logout");
            // _this.$store.commit('logout');
            _this.$router.replace({path: '/'});
          }).catch(() => {
            _this.$message({
              type: 'info',
              message: '取消'
            });
          });
        }
      }
    },
    created:function(){
       this.getRequest("/config/user").then((data)=>{
        this.user=data.data.data;
        //console.log(data);
      });
    }
}
</script>

<style scoped>
  .title{
    text-align: left;
    height: 60px;
    margin-top: 15px;
    font-size: 22px;
    color:burlywood;
  }
  .personnal {
    position: relative;
    margin-top:15px;
    float: right
  }
</style>
