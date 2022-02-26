<template>

    <el-container class="home_container">
        <!-- 头部 -->
        <el-header>
            <div>
                <!-- <img src="../src/assets/logo.png" alt="图片"> -->
                <span>实验室管理系统</span>
            </div>

            <div>
                <el-button type="primary" @click="logOut">退出</el-button>
            </div>
        </el-header>
    <el-container>
        <!-- 左边菜单部分 -->
        <el-aside width="200px">
            <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                background-color="rgb(51, 55, 68)"
                text-color="#fff"
                :router="true"
            >
            <!-- 一级导航 -->
            <!-- 教师信息 -->
            <el-menu-item index="teachers" >
                 <i class="el-icon-location"></i>
                 <span>教师信息</span>
            </el-menu-item>
            <!-- 学生信息 -->
            <el-menu-item index="students">
                <i class="el-icon-menu"></i>
                <span slot="title">学生信息</span>
            </el-menu-item>
            <!-- 实验室信息 -->
            <el-menu-item index="lab">
                <i class="el-icon-document"></i>
                <span slot="title">实验室信息</span>
            </el-menu-item>
            <!-- 课程信息 -->
            <el-menu-item index="courses">
                <i class="el-icon-setting"></i>
                <span slot="title">课程信息</span>
            </el-menu-item>
            <!-- 修改密码 -->
            <el-menu-item index="passWord">
                <i class="el-icon-setting"></i>
                <span slot="title">修改密码</span>
            </el-menu-item>
        </el-menu>

</el-aside>
        <el-main>

            <router-view></router-view>
        </el-main>
</el-container>
    </el-container>

</template>

<script>
export default {
    data(){
        return{
            menuList:[]
        }
    },
    methods:{
        logOut(){
            // 清除token
            window.sessionStorage.removeItem('token');
            // 回到登录页面
            this.$router.push('/');
        }
    }
}
</script>

<style scoped="scoped">
@import 'D:/Code/Program/lab-v0.0/src/styles/home.css';

</style>