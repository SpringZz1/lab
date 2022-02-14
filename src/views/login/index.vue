<template>
<div class="login">


    <div class="login_content">


        <!-- form表单 -->
        <p>登录</p>
        <el-form :model="loginForm" :rules="loginFormRul" ref="loginFormRel" label-width="60px" class="login_box">
            <el-form-item label="账号" prop="userName">
                <el-input  prefix-icon="el-icon-user" v-model="loginForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passWord">
                <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm.passWord"></el-input>
            </el-form-item>
            <el-button class="btn" type="primary" @click="login">登录</el-button>

        </el-form>


    </div>

</div>


</template>

<script>
  export default {
    data() {
        //表单请求数据
        return{
        loginForm:{
            userName:'admin',
            passWord:'123'
        },
        //表单验证规则
        loginFormRul:{
            userName:[
                { required: true, message: '请输入账号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            passWord:[
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]

        }
     }
    },
    methods:{
        login(){
            // 登录验证，留着，目前先做简单的页面跳转

            // 跳转到Home.vue页面，也就是主菜单页面
            this.$router.replace('/home')
        }
    }
  }
</script>

<style scoped="scoped">
/* 引入外部css，这里相对路径还没找到，暂时使用绝对路径 */
@import 'D:/Code/Program/lab-v0.0/src/styles/login.css';

</style>
