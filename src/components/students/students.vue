<template>
<div>
<!-- 面包屑导航 -->
    <el-breadcrumb separator="/" style="margin-bottom:15px">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生信息</el-breadcrumb-item>
    </el-breadcrumb>

<!-- 搜索头部 -->
    <el-card>
        <el-row :gutter="20">
            <el-col :span="4">
                <div>
                    <el-input placeholder="学生姓名" v-model="searchInput.name" class="input-with-select" clearable @clear="getStudentList">
                    </el-input>
                </div>
            </el-col>
            <el-col :span="4">
                <div>
                    <el-input placeholder="学生学号" v-model="searchInput.stuId" class="input-with-select" clearable @clear="getStudentList">
                    </el-input>
                </div>
            </el-col>
            <el-col :span="4">
                <div>
                    <el-input placeholder="学生班级" v-model="searchInput.className" class="input-with-select" clearable @clear="getStudentList">
                    </el-input>
                </div>
            </el-col>
            <el-col :span="2">
                <div>
                    <el-button type="primary" @click="searchStudent">查找</el-button>
                </div>
            </el-col>
        </el-row>
    </el-card>

    <!-- 渲染数据表格 -->
    <el-card align="center">
     <el-table
    :data="studentList.slice((pageNum-1)*pageSize,pageNum*pageSize)"
    border
    style="width: 100%">
        <el-table-column
        prop="name"
        label="姓名"
        width="180"
        align="center">
        </el-table-column>
        <el-table-column
        prop="phone"
        label="电话号码"
        width="180"
        align="center">
        </el-table-column>
        <el-table-column
        prop="stuId"
        label="学号"
        align="center">
        </el-table-column>
        <el-table-column
        prop="className"
        label="班级"
        align="center">
        </el-table-column>
         <el-table-column
        prop="nickname"
        label="昵称"
        align="center">
        </el-table-column>
         <el-table-column
        prop="openId"
        label="openId"
        align="center">
        </el-table-column>
        <el-table-column
        prop=""
        label="操作"
        align="center">
        <template slot-scope="scope">
            <el-row>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top">
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteStudent(scope.row)"></el-button>
                    </el-tooltip>
            </el-row>
        </template>
        </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <el-pagination
      @size-change="SizeChange"
      @current-change="CurrentChange"
      :current-page="pageNum"
      :page-sizes="[5,10,15,20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
</div>
</template>

<script>
export default {
    data(){
        return{
             // 分页相关参数
            // 当前页码，默认为第一页
            pageNum:1,
            // 一页默认5条信息
            pageSize:5,
            // 显示数据总数
            total:0,
            // 搜索学生内容
            searchInput:{
                // 学生姓名
                name: '',
                // 学生班级
                className:'',
                // 学生学号
                stuId:''
            },
            // 学生数据列表
            studentList:[
                // 学生id
                // id:'',
                // 学生姓名
                // name: '',
                // 学生学号
                // stuId: '',
                // 学生微信号码
                // openId: '',
                // 学生班级
                // className:'',
                // 学生头像
                // avatarUrl:'',
                // 学生昵称
                // nickname:'',
                // 学生电话
                // phone:''
            ],
        }
    },
    methods:{
        // 查询学生信息
        getStudentList(){
            this.$http.get(`/student/list`)
            .then(res=>{
                if(res.data.code!==200){
                    this.$message.error('请求学生信息失败');
                }else{
                    console.log(res);
                    this.$message.success('请求学生信息成功');
                    // 获得后台数据
                    this.studentList = res.data.data;
                    // 获得数据总数
                    this.total = parseInt(res.data.data.length);
                }
            })
        },
       // 当每页数据条数发生改变的时候触发
        SizeChange(newSize){
            // console.log(`每页 ${newSize} 条`);
            this.pageSize =newSize;
            this.getStudentList();
        },
        // 当前页码发生变化的时候触发
        CurrentChange(newNum){
            // console.log(`当前页码 {$newNum} 页`);
            this.pageNum = newNum;
            this.getStudentList();
        },
        // 删除学生
        deleteStudent(row){
            this.$confirm('此操作将永久删除该学生信息，是否继续?','提示',{
                confirmButtonText: '确认',
                cnacelButtaonText: '取消',
                type: 'warning'
            }).then(res=>{
                // 点击确认后， 向后台发送请求，删除学生
                this.$http.get(`student/delete/${row.id}`)
                .then(res=>{
                    if(res.data.code!==200){
                        this.$message.error('删除学生失败');
                    }else{
                        this.$message.success('删除学生成功');
                        // 刷新列表
                        this.getStudentList();
                    }
                })
            })
        },
        searchStudent(){
            this.$http.post(`student/selectByparam`, this.searchInput)
            .then(res=>{
                if(res.data.data.length==0){
                    this.$message.error('不存在该学生');
                }else{
                    this.$message.success('查询学生成功');
                    this.studentList = res.data.data;
                }
            })
        }
    },
    // 点击学生信息就发送请求获取后台数据
    created(){
        this.getStudentList();
    }
}
</script>

<style>

</style>