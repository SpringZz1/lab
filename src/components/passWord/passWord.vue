<template>
<el-card>
<div>
    <p style="font-size:20px">修改密码</p>
        <el-form :model="passWordForm" :rules="passWordFormRul" ref="passWordFormRel" label-width="auto" class="password_box">
            <el-form-item label="旧密码" prop="oldPassWord" >
                <el-input  prefix-icon="el-icon-lock" v-model="passWordForm.oldPassWord" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="newPassWord" >
                <el-input prefix-icon="el-icon-lock" type="password" v-model="passWordForm.passWord" ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassWord" >
                <el-input prefix-icon="el-icon-lock" type="password" v-model="passWordForm.checkPassWord" ></el-input>
            </el-form-item>
            <el-button class="btn" type="primary" @click="change">确认</el-button>
        </el-form>
</div>
</el-card>
</template>

<script>
export default {
    data() {
        //表单请求数据
        return{
        passWordForm:{
            userName:'admin',
            passWord:'123'
        },
        //表单验证规则
        passWordFormRul:{
            oldPassWord:[
                { required: true, message: '请输入旧密码', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            newPassWord:[
                { required: true, message: '请输入新密码', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            checkPassWord:[
                { required: true, message: '请确认新密码', trigger: 'blur'},
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ]

        }
     }
    },
    methods:{
        change(){
            // 修改验证
        }
    }
  }
</script>

<style>
.password_box{
    margin-top: 50px;
}
</style>