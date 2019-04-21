<template>
<div style="margin-right:20px">
  <!-- <el-button type="primary" icon="el-icon-edit">添加角色</el-button> -->
  <el-button type="primary" @click="dialogFormVisible = true" icon="el-icon-edit" size="mini">添加角色</el-button>

<el-dialog title="添加角色" :visible.sync="dialogFormVisible" @close='closeDialog'>
<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
  <el-form-item label="角色名称" prop="pass">
    <el-input type="text" v-model="ruleForm2.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="角色标识" prop="pass2">
    <el-input type="text" v-model="ruleForm2.pass2" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
  </el-form-item>
</el-form>
</el-dialog>
</div>

</template>
  
<script>
  export default {
    props:{
      roles:{
        type:Array
      }
    },

     inject:['reload'],
    data() {
      
      var validatePass = (rule, value, callback) => {
        var i=0;
        var s="ROLE_";
        if (value === '') {
          callback(new Error('角色名称不能为空'));
        } else {
          for(i=0;i<this.roles.length;i++){
           if(s+this.ruleForm2.pass === this.roles[i].name){
              callback(new Error('角色名已存在'));
              break;
           }
          }
          if ( i>=this.roles.length) {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        var i=0;
        if (value === '') {
          callback(new Error('角色标识不能为空'));
        } else {

          for(i=0;i<this.roles.length;i++){
           if(this.ruleForm2.pass2 === this.roles[i].nameZh){
              callback(new Error('角色标识已存在'));
              break;
           }
          }
          // this.ruleForm2.pass2 !== ''
          if (i>=this.roles.lrngth) {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        dialogFormVisible: false,
        formLabelWidth: '120px',
        ruleForm2: {
          pass: '',
          pass2: '',
         
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          pass2: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      closeDialog(){
        this.ruleForm2.pass = '';//清空数据
        this.ruleForm2.pass2 = '';
       },
      submitForm(formName) {
       var  _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.postRequest("/upms/role/add"
            ,{role:this.ruleForm2.pass,
              roleZh:this.ruleForm2.pass2
            }).then((res)=>{
              console.log(res.data.data);
          if(res.data.data===1){
               _this.$message({
               type:'info',
               message:'添加成功' 
               }
            )
          }
                this.reload();
            });
            
            this.dialogFormVisible=false;
          } else {
            return false;
          }
        });
        
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
