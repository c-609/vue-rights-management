<template>
  <div>
    <div class="searchWord">
      <div style="display: inline-block"> 搜索：</div>
      <el-input v-model="search" style="display: inline-block;width: 1300px" 
        placeholder="请输入搜索内容">
      </el-input>
    </div>
    <BasicRoleAdd></BasicRoleAdd>
    <el-table
    ref="dormitoryTable"
      :data="tables.slice((currpage - 1) * pagesize, currpage * pagesize)"
      border
      style="width: 100%"
      :row-style="{height:'0'}"
      :cell-style="{padding:'0'}" >
      <el-table-column
        type="index"
        width="50"
        fixed="left"
        label="序号">
      </el-table-column>

      <el-table-column
        v-for="(item,key) in header" 
        :key="key" 
        :prop="item.prop" 
        :label="item.label"
        :width="item.width"
        :fixed="item.fixed">
        <template slot-scope="scope">
          <div>{{scope.row[item.prop]}}</div> 
          <el-button @click="handleEditRirhts(scope.row)" type="text" size="small" v-if="item.prop=='operate'">修改权限</el-button>
          <el-button @click="handleDelete(scope.row.id)" type="text" size="small" v-if="item.prop==='operate'">删除</el-button>
       </template>  
      </el-table-column>   
    </el-table>

    <el-dialog
      title="修改权限"
      :visible.sync="dialogTransferVisible"
      @close='closeDialog'
      >
      <el-tree
        :data="menuData"
        ref="menuData"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="defaultChecked"
        :props="menuProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTransferVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDialogSure">确 定</el-button>
      </div>
    </el-dialog>
    <div>
      	<el-pagination background
      :current-page=this.current_page
			layout="prev, pager, next, sizes, total, jumper"
			:page-sizes="[2, 4, 6, 8]"
			:page-size="pagesize"
			:total="tableData.length"
			@current-change="handleCurrentChange"  
			@size-change="handleSizeChange" 
			>
		</el-pagination>
    </div>
  </div>
</template>


<script>

  export default {
    name: 'BasicTable',
    props: ['tableData', 'header', 'operater'],
    
     data() {
      return { 
         search: '',   
        pagesize: 8,
				currpage: 1,
        dialogTransferVisible: false,
        data:{
          rid:'',
          mids:''
        },
        value:[],
        transferData:[],
        menuData:[],
        menuProps:{
          label: 'name',
          children: 'children'
        },
        defaultChecked:[],
        rid:''
      }
    },
     computed: {
   
      
      // 模糊搜索
      tables () {
        const search = this.search
        if (search) {
          // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
          // 注意： filter() 不会对空数组进行检测。
          // 注意： filter() 不会改变原始数组。
          return this.tableData.filter(data => {
            // some() 方法用于检测数组中的元素是否满足指定条件;
            // some() 方法会依次执行数组的每个元素：
            // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
            // 如果没有满足条件的元素，则返回false。
            // 注意： some() 不会对空数组进行检测。
            // 注意： some() 不会改变原始数组。
            return Object.keys(data).some(key => {
              // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
              // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
              return String(data[key]).toLowerCase().indexOf(search) > -1

            })
          })
        }
        return this.tableData
      }
    },

     methods: {
       handleCurrentChange(cpage) {
					this.currpage = cpage;
				},
				handleSizeChange(psize) {
					this.pagesize = psize;
				},

      handleDelete(id) {
          var _this = this;
          alert(id);
          this.$confirm('是否删除此角色?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.postRequest("/upms/role/delete?rid="+id).then(res=>{
              if(status!=200){
                _this.$message({
                   type:'info',
                   message:'删除成功' 
                })
              }
               this.reload();
            })
          }).catch(() => {
            _this.$message({
              type: 'info',
              message: '取消'
            });
          });
      },
      closeDialog(){
        // this.defaultChecked = [];
        // var a = this.defaultChecked.length;
        // alert(a);
        this.$refs.menuData.setCheckedKeys([]);
       
      },
      handleEditRirhts(row){
        this.dialogTransferVisible=true;
        var rid=row.id;
        this.rid = row.id;
        
        this.postRequest("/config/menuIdByRid",{rid:this.rid}).then(res=>{     
          this.defaultChecked = res.data.data ;
         
         alert(res.data.data);
        }) 
        
      },
      handleDialogSure(){
       // var id = this.rid;
        //var mids = this.$refs.menuData.getCheckedKeys();
        var mids = this.$refs.menuData.getCheckedKeys().concat(this.$refs.menuData.getHalfCheckedKeys());

          alert(mids);
        this.postRequest('/upms/role/auth',{
          rid: this.rid,
          mids: mids
          }).then((res)=>{
              console.log(res);
          });

        this.dialogTransferVisible=false;
      }  
    },

    created:function(){
      this.getRequest("/config/allmenu").then(res=>{
          this.menuData = res.data.data;
        })
    }
   
  }
</script>

<style type="text/css" >
.el-pagination{
		text-align: right;
    margin-top:20px;
    margin-right: 50px
	}
</style>
