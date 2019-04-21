<template>
<div>
  <!-- <el-button type="primary" icon="el-icon-edit">添加角色</el-button> -->
  <el-button type="text" @click="dialogFormVisible = true" icon="el-icon-edit" >编辑</el-button>

<el-dialog title="编辑" :visible.sync="dialogFormVisible" @close='closeDialog'>
<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
 <el-form-item label="账户" prop="acount">
    <el-input type="text" v-model="ruleForm2.acount" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
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
    data() {
  
      var validateAcount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('账户不能为空'));
        } else {
          if (this.ruleForm2.acount !== '') {
            this.$refs.ruleForm2.validateField('pass');
          }
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        dialogFormVisible: false,
   formLabelWidth: '120px',
        ruleForm2: {
          acount:'',
          pass:'',
          checkPass: '',
         
        },
        rules2: {
          acount: [
            { validator: validateAcount, trigger: 'blur' }
          ],
           checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
       closeDialog(){
      this.ruleForm2.acount= '';//清空数据
      this.ruleForm2.pass = '';
      this.ruleForm2.checkPass = '';
    },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('添加成功');
            this.dialogFormVisible = false;
          } else {
            console.log('添加失败');
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