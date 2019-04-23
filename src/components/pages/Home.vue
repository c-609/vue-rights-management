<template>
  <div>
    <el-container class="home-container">
      <el-header class="header">
        <home-header></home-header>
      </el-header>
      <el-container>
        <el-aside class="aside" width="12%">
          <div>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo menu"
              @open="handleOpen"
              @close="handleClose"
              router>
              <template v-for="(item,index) in menus">
                <el-submenu :key="index" :index="index+''" >
                  <template slot="title">
                    <i :class="item.iconCls" style="color: #20a0ff;width: 14px;"></i> 
                     <span slot="title">{{item.name}}</span>
                  </template>
                  <template>
                    <el-menu-item v-for="(child,index) of item.children" :key="index" :index=child.path>{{child.name}}</el-menu-item>
                  </template>
                </el-submenu>
              </template>
            </el-menu>
          </div>
        </el-aside>
        <hr height="100%" width="0" color="#ebeef5">
        <el-main class="main">
          <router-view v-if="isRouterAlive"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HomeHeader from "./home/HomeHearder"

export default {
  name: "Home",
  components: {
    HomeHeader
  },

 provide(){
    return {
      reload:this.reload
    }
  },
 
  methods:{
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  },

  data() {
    return {
      menus:[] ,
      isRouterAlive:true
    };
  },
  mounted:function(){
      this.getRequest("/config/sysmenu").then((data)=>{
        this.menus=data.data.data;
        console.log(this.menus);
      });
    }
};
</script>

<style scoped>
.home-container {
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
}
.header {
  background-color: #ececcb;
  width: 100%;
}
.aside {
  background-color: #ffffff;
}
.main {
  background-color: #ffffff;
  border-left: 2px;
  margin: 10px 0px 0px 20px;
  padding: 0px;
}
</style>
