<template>
<div class="login">


    <div class="login_content">


        <!-- form表单 -->
        <p>登录</p>
        <el-form :model="loginForm" :rules="loginFormRul" ref="loginFormRel" label-width="50px" class="login_box">
            <el-form-item label="账号" prop="userName">
                <el-input v-model="loginForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passWord">
                <el-input type="password" v-model="loginForm.passWord"></el-input>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" class="btn">登录</el-button>
            </el-form-item>
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
            userName:'',
            passWord:''
        },
        //表单验证规则
        loginFormRul:{

        }
     }
    }
  }
</script>

<style scoped="scoped">
.login{
    height: 100%;
    /* background: rgb(43,75,107); */
}

.login_content{
    width: 450px;
    height: 300px;
    background: white;
    border: 2px solid black;
    /* margin: 0 auto; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    /* transform: translate(-50%,-50%); */
    border-radius: 10px;
    text-align: center;

}

.login_box{
    margin-left: 10%;
    margin-right: 20%;
}


.login_content p{
    font-size: 20px;
    font-weight: 700;
    color: red;
}


</style>
