<template>
<div class="login">


    <div class="login_content">


        <!-- form表单 -->
        <p>登录</p>
        <el-form :model="loginForm" :rules="loginFormRul" ref="loginFormRel" label-width="60px" class="login_box">
            <el-form-item label="账号" prop="username">
                <el-input  prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-button class="btn" type="primary" @click="login">登录</el-button>

        </el-form>


    </div>

</div>


</template>

<script>
// var qs = require('qs')
  export default {
    data() {
        //表单请求数据
        return{
        loginForm:{
            username:'root',
            password:'1234561'
        },
        //表单验证规则
        loginFormRul:{
            username:[
                { required: true, message: '请输入账号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            password:[
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ]

        }
     }
    },
    methods:{
        login(){
            // 登录前需要校验， 校验成功才能登录
            this.$refs.loginFormRel.validate(valid=>{
                if(!valid) return;
                this.$http.post(`admin/admin/login`,this.loginForm).then(res=>{
                    console.log('进入登陆界面');
                    // console.log(res);
                    // 判断成功与否
                    if(res.data.code!==200){
                        this.$message.error('登录失败,请检查你的账号或者密码是否正确');
                    }else{
                        this.$message.success('登录成功');
                        // 保存当前的token
                        // window.sessionStorage.setItem(token, res.data.data.token);
                        // 跳转到Home.vue页面，也就是主菜单页面
                        this.$router.push('/home');
                    }
                })
                // this.$http.post(`/admin/login`, {
                //     username:'root',
                //     password:'1234561'
                // }).then(res=>{
                //     console.log(res);
                // }
                // )
            })
        }
    }
  }
</script>

<style scoped="scoped">
/* 引入外部css，这里相对路径还没找到，暂时使用绝对路径 */
/* @import 'D:/Code/Program/lab-v0.0/src/styles/login.css'; */
.login {
    height: 100%;
    background: rgb(43,75,107);
}

.login_content {
    width: 450px;
    height: 300px;
    background: white;
    border: 2px solid black;
    /* margin: 0 auto; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* transform: translate(-50%,-50%); */
    border-radius: 10px;
    text-align: center;
}

.login_box {
    /* margin-left: 10%; */
    margin-right: 5%;
}

.login_content p {
    font-size: 30px;
    font-weight: 700;
    color: red;
}

.btn {
    width: 80%;
    margin-left: 40px;
    margin-bottom: 25px;
}
</style>
