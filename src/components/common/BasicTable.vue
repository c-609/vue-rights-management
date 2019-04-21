<template>
  <div>
    <div class="searchWord">
      <div style="display: inline-block"> 搜索：</div>
      <el-input v-model="search" style="display: inline-block;width: 1300px" 
        placeholder="请输入搜索内容">
      </el-input>
    </div>
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
          <div v-if="item.type==1">
            <div v-for="(i,index) in scope.row[item.prop]" :key="index">
                {{scope.row[item.prop][index].nameZh}}
            </div>
            </div> 
          <div v-else>{{scope.row[item.prop]}}</div> 

          <el-button @click="handleEdit( scope.row)" type="text" size="small" v-if="item.prop=='operate'">编辑</el-button>
          <el-button @click="handleDelete(scope.row.id)" type="text" size="small" v-if="item.prop==='operate'">删除</el-button>
       </template>
        
      </el-table-column>  
    </el-table>
    <el-dialog
      title="编辑"
      :visible.sync="dialogFormVisible"
      @close='closeDialog'
      >
      <el-form :model="form" label-position="right">
        <el-form-item label="账号" :label-width="formLabelWidth" >
          <el-input v-model="form.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色标识"  :label-width="formLabelWidth">
          <el-checkbox v-model="form.admin">ROLE_admin</el-checkbox>
          <el-checkbox v-model="form.superuser">ROLE_superuser</el-checkbox>
          <el-checkbox v-model="form.user">ROLE_user</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDialogSure">确 定</el-button>
      </div>
    </el-dialog>
    <div>
    	<el-pagination background
			layout="prev, pager, next, sizes, total, jumper"
			:page-sizes="[5, 10, 15, 20]"
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
    inject:['reload'],
    data() {
      return {
         search: '',  
        pagesize: 5,
				currpage: 1,
        dialogFormVisible: false,
        formLabelWidth: '120px',
        form:{
          id:'',
          username:'',
          password:'',
          admin:'',
          superuser:'',
          user:'',
        }
      }
    },
    props: ['tableData', 'header', 'operater'],
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
          alert(id)
          this.$confirm('是否删除此用户?', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            _this.postRequest('/upms/user/delete',
              {uid:id}
            ).then((res)=>{
              console.log(res);
              this.reload();
            });
          }).catch(() => {
            _this.$message({
              type: 'info',
              message: '取消'
            });
          });
          
      },
       handleEdit(row) {
          this.dialogFormVisible=true;
          this.form.username=row.username;
          this.form.id=row.id;
   
      },
      handleDialogSure(){
                //  let _index=this.listIndex
                //  //根据索引，赋值到list制定的数
                //  this.list[_index]=editObj;
                 //关闭弹窗
                 console.log(this.form.id+"------------------------------");
                this.postRequest("/upms/user/update",
                {"id":this.form.id,"password":this.form.password}).then(res=>{
                console.log(res);
                this.reload();
                 });
                 this.dialogFormVisible=false;
      },
      closeDialog(){
        this.form.password='';
        this.form.admin='';
        this.form.superuser='';
        this.form.user='';
      },
    },
  }
</script>

<style type="text/css" >
.el-pagination{
		text-align: right;
    margin-top:20px;
    margin-right: 50px
	}
</style>

