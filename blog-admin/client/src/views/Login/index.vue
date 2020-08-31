<template>
  <div class="login-box">
    <el-dialog
      title="登陆后台管理系统"
      :visible="true"
      :before-close="beforeClose"
      :close-on-click-modal="false"
      custom-class='dialog-login'
    >
      <el-form
          ref="form"
          :model="form"
          label-width="80px"
          :rules="rules"
      >
        <el-form-item label="用户名" prop="user">
          <el-input v-model="form.user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd" >
          <el-input v-model="form.pwd" show-password></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClick" :disabled="submitDisabled">登录</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {login} from "../../api";

  export default {
    name: "Login",
    data(){
      return {
        //表单数据
        form :{
          user : "",
          pwd : ""
        },
        //表单验证
        rules:{
          //用户名验证
          user : [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            {
              //数据类型
              type:"string",
              //正则规则
              pattern: /^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,7}$/,
              message: '请输入正确格式用户名',
              trigger: ['blur','change']
            }
          ],

          //密码验证
          pwd : {
            type:"string",
            validator : (rule,value,cb)=>{
              if (value){
                //验证密码是否符合规则
                if (/^[\w<>,.?|;':"{}!@#$%^&*()\/\-\[\]\\]{6,18}$/.test(value)){
                  cb();
                }else{
                  cb(new Error("请输入正确格式密码"));
                }
              }else{
                cb(new Error("请输入密码"));
              }

              //在这里还需要触发确认密码的验证
              this.form.checkPwd && this.$refs.form.validateField("checkPwd");
            },
            required: true,
            trigger: ['blur','change']
          }
        },

        //登录过程禁用
        submitDisabled : false
      }
    },
    methods:{
      beforeClose(){},
      handleClick(){
        this.submitDisabled = true;//禁用点击

        //验证数据
        this.$refs["form"].validate((valid) => {
          if (valid) {
            //验证都通过
            console.log(this.form)
            login(this.form)
              .then(res=>{
                if (res.data.code) {
                  //登陆失败
                  this.submitDisabled = false;
                  this.$message({
                    message : res.data.msg,
                    type : "error",
                    duration : 2000
                  });
                }else{
                  //登陆成功
                  console.log('登录成功')
                  this.submitDisabled = false;
                  this.$router.push("/admin");
                }
              })
              .catch((err)=>{
              this.submitDisabled = false;
              this.$message({
                message : err,
                type : "error",
                duration : 2000
              });
            });
          } else {
            //验证没通过
            this.submitDisabled = false;
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="less">
.login-box {
  .dialog-login {
      width: 36%;
    }
}
@media screen and (max-width: 966px)  {
    .login-box {
      .dialog-login {
        width: 100%;
      }
    }
  }
</style>
