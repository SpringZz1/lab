<template>
<el-card>
<div>
    <p style="font-size:20px">修改密码</p>
        <el-form class="user-account-key" ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="原密码" prop="oldPassword">
            <el-input type="password" placeholder="请输入原密码" v-model="form.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" placeholder="请设置新密码" v-model="form.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="newPassword2">
            <el-input type="password" placeholder="请确认新密码" v-model="form.newPassword2"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="updatePassword">保存</el-button>
            <el-button @click="$refs['form'].resetFields()">重置</el-button>
        </el-form-item>
    </el-form>

</div>
</el-card>
</template>

<script>
export default {
    data() {
        //此处即表单发送之前验证
        let validateNewPassword = (rule, value, callback) => {
            if (value === this.form.password) {
                callback(new Error('新密码不能与原密码相同!'))
            } else {
                callback()
            }
        }
        let validateNewPassword2 = (rule, value, callback) => {
            if (value !== this.form.newPassword) {
                callback(new Error('与新密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            form: {},
            rules: {
                oldPassword: [
                    { required: true, message: '请输入原密码', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '请设置新密码', trigger: 'blur' },
                    { validator: validateNewPassword, trigger: 'blur' }
                ],
                newPassword2: [
                    { required: true, message: '请确认新密码', trigger: 'blur' },
                    { validator: validateNewPassword2, trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        updatePassword(){
            // 修改验证
            // console.log(typeof this.form.oldPassword);
            this.$http.post(`admin/admin/update`,{oldPassword: this.form.oldPassword, newPassword: this.form.newPassword2})
            .then(res=>{
                // console.log(res);
                if(res.data.code!==200){
                    this.$message.error('更新密码失败');
                }else{
                    this.$message.success('更新密码成功');
                }
            })
        }
    }
  }
</script>

<style>
.password_box{
    margin-top: 50px;
}
</style>