<template>
<div>
<!-- 面包屑导航 -->
    <el-breadcrumb separator="/"style="margin-bottom:15px">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生信息</el-breadcrumb-item>
    </el-breadcrumb>

<!-- 搜索头部 -->
    <el-card>
        <el-row :gutter="15">
            <el-col :span="8">
                <div>
                    <el-input placeholder="请输入想要查询的学生学号" v-model="queryInfo.query" class="input-with-select" clearable @clear="getStudentList">
                    <el-button slot="append" icon="el-icon-search" @click="getStudentList"></el-button>
                    </el-input>
                </div>
            </el-col>
        </el-row>
    </el-card>

    <!-- 渲染数据表格 -->
    <el-card align="center">
     <el-table
    :data="studentList"
    border
    style="width: 100%">
        <el-table-column
        prop="student_name"
        label="姓名"
        width="180"
        align="center">
        </el-table-column>
        <el-table-column
        prop="student_phone"
        label="电话号码"
        width="180"
        align="center">
        </el-table-column>
        <el-table-column
        prop="student_open_id"
        label="微信号"
        width="180"
        align="center">
        </el-table-column>
        <el-table-column
        prop="student_stu_id"
        label="学号"
        align="center">
        </el-table-column>
        <el-table-column
        prop="student_nick_name"
        label="昵称"
        align="center">
        </el-table-column>
        <el-table-column
        prop=""
        label="操作"
        align="center">
        <template>
            <el-row>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top">
                        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                    </el-tooltip>
            </el-row>
        </template>
        </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <el-pagination
      @size-change="SizeChange"
      @current-change="CurrentChange"
      :current-page="1"
      :page-sizes="[1,2,3,4]"
      :page-size="2"
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

            // query绑定搜索框
            // 请求学生信息参数
            queryInfo:{
                query:'',
                pageNum:'1',
                pageSize:'2'
            },
            // 学生数据列表, 这里暂时使用假数据，后续从数据库获取渲染
            studentList:[
                {
                student_id:'001',
                student_name: '大明',
                student_phone:'130xxxx',
                student_stu_id: 'QSX3122',
                student_open_id: 'dfw221',
                student_nick_name: '薯条',
            },
            {
                student_id:'002',
                student_name: '大红',
                 student_phone:'159yyyy',
                student_stu_id: 'QSX4123',
                student_open_id: 'kof421',
                student_nick_name: '汉堡',
            }
            ],
            // 当前数据总数
            total :2,

        }
    },
    methods:{
        // 查询学生信息
        getStudentList(){
            // this.$http.get('teachers',{params:this.queryInfo})
            // .then(res=>{
            //     console.log(res);
            //     if(res.data.meta.status!==200)return this.$message.error('请求教师列表失败');
            //     this.$message.success('请求教师列表成功');
            //     this.teacherList =res.data.data.teachers;
            //     this.total  =res.data.data.total;
            // }
            // )
        },
        // 当每页数据条数发生改变的时候触发
        SizeChange(newSize){
            // this.queryInfo.pageSize =newSize;
            // this.getStudentList();
        },
        // 当前页码发生变化的时候触发
        CurrentChange(newNum){
            // this.queryInfo.pageNum = newNum;
            // this.getStudentList();
        },
        create(){
            this.getStudentList();
        },
        changeStatus(status){
            // 当前switch状态 boolean
            // this.getStudentList();
        }

    }
}
</script>

<style>

</style>